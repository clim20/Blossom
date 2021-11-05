import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateIcon from '@mui/icons-material/Create';

import { AuthContext } from '../context/auth';
import * as mutations from '../cache/mutations';

const PlatformAbout = ({ platform, refetchPlatformData }) => {
    const { user } = useContext(AuthContext);

    const [updatedPlatform, setUpdatedPlatform] = useState({ 
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

    return (
        <div>
            <div>
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
                    !editingDescription && !editingMode && <div>{platform.description}</div>
                }
                {
                    editingDescription && <textarea className="edit-box" defaultValue={platform.description} onBlur={handleDescriptionEdit}></textarea>
                }
                {
                    !editingDescription && editingMode && <div>{updatedPlatform.description}</div>
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
                    !editingContact && !editingMode && <div>{platform.contact}</div>
                }
                {
                    editingContact && <textarea className="edit-box" defaultValue={platform.contact} onBlur={handleContactEdit}></textarea>
                }
                {
                    !editingContact && editingMode && <div>{updatedPlatform.contact}</div>
                }
            </div>
        </div>
    );
}
export default PlatformAbout;