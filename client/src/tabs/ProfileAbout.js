import React, { useContext, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const ProfileAbout = ({ profile, refetchProfileData }) => {
    const { user } = useContext(AuthContext);

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: profile ? profile.user : ''
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

    const { data: quizHitsData } = useQuery(queries.GET_QUIZ_HITS, {
        variables: {
            ids: profile ? profile.quizzes : []
        }
    });

    var quizHitCount = 0;
    if (quizHitsData) { 
		quizHitCount = quizHitsData.getQuizHits;
    }

    const [updatedProfile, setUpdatedProfile] = useState({ 
        profileImg: profile.profileImg,
        bannerImg: profile.bannerImg,
        description: profile.description,
        contact: profile.contact 
    });
    const [editingMode, toggleEditingMode] = useState(false);
    const [editingDescription, toggleEditingDescription] = useState(false);
    const [editingContact, toggleEditingContact] = useState(false);

    const handleDescriptionEdit = (e) => {
        const newDescription = e.target.value ? e.target.value : profile.description;
        setUpdatedProfile({
            description: newDescription,
            contact: updatedProfile.contact
        });
    }

    const handleContactEdit = (e) => {
        const newContact = e.target.value ? e.target.value : profile.contact;
        setUpdatedProfile({
            description: updatedProfile.description,
            contact: newContact
        });
    }

    const handleCancel = () => {
        toggleEditingMode(false);
        toggleEditingDescription(false);
        toggleEditingContact(false);
        setUpdatedProfile({
            description: profile.description,
            contact: profile.contact
        });
    }

    var [saveChanges] = useMutation(mutations.EDIT_PROFILE, {
        variables: {
            id: profile._id,
            updatedProfile: updatedProfile
        }
    });

    const handleSave = () => {
        saveChanges();
        setTimeout(() => {
            refetchProfileData();
        }, 300);
        handleCancel();
        setUpdatedProfile({
            description: updatedProfile.description,
            contact: updatedProfile.contact
        });
    }

    const isOwnProfile = profile && user && profile.user === user._id;

    const created = 'Created: ' + moment(userObject.createdAt).format("MMMM D[,] YYYY");
    const platforms = profile.platforms.length !== 1 ? profile.platforms.length + ' Platforms' : profile.platforms.length + ' Platform';
    const quizzes = profile.quizzes.length !== 1 ? profile.quizzes.length + ' Quizzes' : profile.quizzes.length + ' Quiz';
    const quizHits = quizHitCount !== 1 ? quizHitCount + ' Quiz Hits' : quizHitCount + ' Quiz Hit';

    return (
        <Grid>
            <Grid.Column width={12}>
                <div>
                    <div className="display-flex">
                        <h3 className="ui header" style={{ marginBottom: '10px' }}>
                            Description
                        </h3>
                        {
                            editingMode && <i class="pencil alternate icon" style={{ marginTop: '-1px', marginLeft: '5px' }} onClick={() => toggleEditingDescription(!editingDescription)}/>
                        }
                    </div>
                    {
                        !editingDescription && !editingMode && <div className="text_box">{profile.description}</div>
                    }
                    {
                        editingDescription && <textarea className="edit-box" defaultValue={updatedProfile.description} onBlur={handleDescriptionEdit}></textarea>
                    }
                    {
                        !editingDescription && editingMode && <div className="text_box">{updatedProfile.description}</div>
                    }
                </div>

                <div className="ui hidden divider"></div>

                <div>
                    <div className="display-flex">
                        <h3 className="ui header" style={{ marginBottom: '10px' }}>
                            Contact
                        </h3>
                        {
                            editingMode && <i class="pencil alternate icon" style={{ marginTop: '-1px', marginLeft: '5px' }} onClick={() => toggleEditingContact(!editingContact)}/>
                        }
                    </div>
                    {
                        !editingContact && !editingMode && <div className="text_box">{profile.contact}</div>
                    }
                    {
                        editingContact && <textarea className="edit-box" defaultValue={updatedProfile.contact} onBlur={handleContactEdit}></textarea>
                    }
                    {
                        !editingContact && editingMode && <div className="text_box">{updatedProfile.contact}</div>
                    }
                </div>

                <div className="ui hidden divider"></div>

                <div>
                    <h3 className="ui header"> 
                        Stats
                    </h3>
                    <div> {created} </div>
                    <div> {platforms} </div>
                    <div> {quizzes} </div>
                    <div> {quizHits} </div>
                </div>
            </Grid.Column>
            <Grid.Column width={4}>
                {
                    isOwnProfile && !editingMode && 
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => toggleEditingMode(!editingMode)}>
                            Edit
                        </button>  
                    </div>
                }

                {
                    editingMode && 
                    <div>
                        <button className="ui button cancel-button" style={{ float: 'right' }} onClick={handleCancel}>
                            Cancel
                        </button>  
                        <button className="ui button save-button" style={{ float: 'right' }} onClick={handleSave}>
                            Save
                        </button>  
                    </div>
                }
            </Grid.Column>
        </Grid>
    );
}
export default ProfileAbout;