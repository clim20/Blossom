import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateIcon from '@mui/icons-material/Create';

import { AuthContext } from '../context/auth';
import * as mutations from '../cache/mutations';

const ProfileAbout = ({ profile, refetchProfileData }) => {
    const { user } = useContext(AuthContext);

    const [updatedProfile, setUpdatedProfile] = useState({ 
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

    return (
        <div>
            <div>
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
                    <div style={{ float: 'right' }}>
                        <button className="ui button save-button" onClick={handleSave}>
                            Save
                        </button>  
                        <button className="ui button cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>  
                    </div>
                }
            </div>

            <div className="ui hidden divider"></div>

            <div>
                <div className="display-flex">
                    <h3 className="ui header" style={{ marginBottom: '10px' }}>
                        Description
                    </h3>
                    {
                        editingMode && <CreateIcon style={{ marginTop: '-1px', marginLeft: '5px' }} onClick={() => toggleEditingDescription(!editingDescription)}/>
                    }
                </div>
                {
                    !editingDescription && !editingMode && <div>{profile.description}</div>
                }
                {
                    editingDescription && <textarea className="edit-box" defaultValue={profile.description} onBlur={handleDescriptionEdit}></textarea>
                }
                {
                    !editingDescription && editingMode && <div>{updatedProfile.description}</div>
                }
            </div>

            <div className="ui hidden divider"></div>

            <div>
                <div className="display-flex">
                    <h3 className="ui header" style={{ marginBottom: '10px' }}>
                        Contact
                    </h3>
                    {
                        editingMode && <CreateIcon style={{ marginTop: '-1px', marginLeft: '5px' }} onClick={() => toggleEditingContact(!editingContact)}/>
                    }
                </div>
                {
                    !editingContact && !editingMode && <div>{profile.contact}</div>
                }
                {
                    editingContact && <textarea className="edit-box" defaultValue={profile.contact} onBlur={handleContactEdit}></textarea>
                }
                {
                    !editingContact && editingMode && <div>{updatedProfile.contact}</div>
                }
            </div>
        </div>
    );
}
export default ProfileAbout;