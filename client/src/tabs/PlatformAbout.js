import React, { useContext, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const PlatformAbout = ({ platform, refetchPlatformData }) => {
    const { user } = useContext(AuthContext);

    const { data: ownerData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: platform ? platform.owner : ''
        }
    });

    var owner = {};
    if (ownerData) { 
		owner = ownerData.findUserById;
    }

    const { data: quizHitsData } = useQuery(queries.GET_QUIZ_HITS, {
        variables: {
            ids: platform ? platform.quizzes : []
        }
    });

    var quizHitCount = 0;
    if (quizHitsData) { 
		quizHitCount = quizHitsData.getQuizHits;
    }

    const [updatedPlatform, setUpdatedPlatform] = useState({ 
        platformImg: platform.platformImg,
        bannerImg: platform.bannerImg,
        description: platform.description,
        contact: platform.contact 
    });
    const [editingMode, toggleEditingMode] = useState(false);
    const [editingDescription, toggleEditingDescription] = useState(false);
    const [editingContact, toggleEditingContact] = useState(false);
    
    const handleDescriptionEdit = (e) => {
        const newDescription = e.target.value ? e.target.value : platform.description;
        setUpdatedPlatform({
            description: newDescription,
            contact: updatedPlatform.contact
        });
    }

    const handleContactEdit = (e) => {
        const newContact = e.target.value ? e.target.value : platform.contact;
        setUpdatedPlatform({
            description: updatedPlatform.description,
            contact: newContact
        });
    }

    const handleCancel = () => {
        toggleEditingMode(false);
        toggleEditingDescription(false);
        toggleEditingContact(false);
        setUpdatedPlatform({
            description: platform.description,
            contact: platform.contact
        });
    }

    var [saveChanges] = useMutation(mutations.EDIT_PLATFORM, {
        variables: {
            id: platform._id,
            updatedPlatform: updatedPlatform
        }
    });

    const handleSave = () => {
        saveChanges();
        setTimeout(() => {
            refetchPlatformData();
        }, 300);
        toggleEditingMode(false);
        toggleEditingDescription(false);
        toggleEditingContact(false);
        setUpdatedPlatform({
            description: updatedPlatform.description,
            contact: updatedPlatform.contact
        });
    }

    const isOwnPlatform = platform && user && platform.owner === user._id;

    const created = 'Created: ' + moment(owner.createdAt).format("MMMM D[,] YYYY");
    const platformOwner = 'Owner: ' + owner.username;
    const collaborators = platform.collaborators.length !== 1 ? platform.collaborators.length + ' Collaborators' : platform.collaborators.length + ' Collaborator';
    const quizzes = platform.quizzes.length !== 1 ? platform.quizzes.length + ' Quizzes' : platform.quizzes.length + ' Quiz';
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
                        !editingDescription && !editingMode && <div className="text_box">{platform.description}</div>
                    }
                    {
                        editingDescription && <textarea className="edit-box" defaultValue={updatedPlatform.description} onBlur={handleDescriptionEdit}></textarea>
                    }
                    {
                        !editingDescription && editingMode && <div className="text_box">{updatedPlatform.description}</div>
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
                        !editingContact && !editingMode && <div className="text_box">{platform.contact}</div>
                    }
                    {
                        editingContact && <textarea className="edit-box" defaultValue={updatedPlatform.contact} onBlur={handleContactEdit}></textarea>
                    }
                    {
                        !editingContact && editingMode && <div className="text_box">{updatedPlatform.contact}</div>
                    }
                </div>

                <div className="ui hidden divider"></div>

                <div>
                    <h3 className="ui header"> 
                        Stats
                    </h3>
                    <div> {created} </div>
                    <div> {platformOwner} </div>
                    <div> {collaborators} </div>
                    <div> {quizzes} </div>
                    <div> {quizHits} </div>
                </div>
            </Grid.Column>
            <Grid.Column width={4}>
                {
                    isOwnPlatform && !editingMode && 
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
export default PlatformAbout;