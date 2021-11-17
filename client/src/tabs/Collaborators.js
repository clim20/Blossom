import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

import CreatorCards from '../components/cards/CreatorCards';
import RequestModal from '../modals/RequestModal';
import CollaboratorRemovalModal from '../modals/CollaboratorRemovalModal';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Collaborators = (props) => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const platformId = params ? params.platformId : 'could not get params';

    const [AddCollaboratorRequest] 			    = useMutation(mutations.ADD_COLLABORATOR_REQUEST);
    const [RemoveCollaborator] 			        = useMutation(mutations.REMOVE_COLLABORATOR);

    var platform;
    const { data, refetch: refetchPlatformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: platformId
        }
    });

	if(data) {
        platform = data.findPlatformById;
    }

    var collaborators;
    const { data: collaboratorData } = useQuery(queries.FIND_COLLABORATORS_BY_IDS, {
        variables: {
            ids: platform.collaborators 
        }
    });

	if(collaboratorData) {
        collaborators = collaboratorData.findCollaboratorsByIds;
    }

    var isOwner, isCollaborator, isRequest;
    if(platform && user) {
        isOwner = platform.owner === user._id;
        isCollaborator = platform.collaborators.includes(user._id);
        isRequest = platform.requests.includes(user._id);
    }

    const [showCollaboratorRequests, setShowCollaboratorRequests] = useState(false);
    const [showCollaboratorRemovalModal, setShowCollaboratorRemovalModal] = useState(false);
    const [removeUser, setRemoveUser] = useState('');
    const [buttonText, setButtonText] = useState(user ? (!isOwner ? (isRequest ? "Pending..." : (isCollaborator ? "Leave" : "Join")) : "Requests") : "");
    const [editingMode, toggleEditingMode] = useState(false);

    const handleClick = async () => {
       switch (buttonText) {
           case "Join": 
                await AddCollaboratorRequest({variables: { platformId: platform._id, userId: user._id }});
                setButtonText("Pending...");
                refetchPlatformData();
                break;
           case "Requests": 
                setShowCollaboratorRequests(true);
                break;
            case "Leave":
                await RemoveCollaborator({variables: { platformId: platform._id, userId: user._id }});
                setButtonText("Join");
                refetchPlatformData();
                break;
            case "Pending...":
                alert("Join request already sent");
                break;
            default:
                break;
       }
    }

    useEffect(() => {
        (user ? (!isOwner ? (isRequest ? setButtonText("Pending...") 
                                        : (isCollaborator ? setButtonText("Leave") 
                                        : setButtonText("Join"))) : setButtonText("Requests")) 
                                        : setButtonText(""))
    }, [user, platform, isCollaborator, isOwner, isRequest]);

    useEffect(() => {
        refetchPlatformData();
    }, [user, platform, refetchPlatformData]);

    const handleCancel = () => {
        toggleEditingMode(false);
    }

    const handleSave = () => {
        setTimeout(() => {
            refetchPlatformData();
        }, 300);
        handleCancel();
    }

    const removeCollaborator = async (collaboratorId) => {
        console.log(collaboratorId);
        console.log(platform._id);
        const { data: removeData } = await RemoveCollaborator({variables: { platformId: platform._id, userId: collaboratorId }});
        console.log("collaborator removed");
        refetchPlatformData();        
    }

    return (
        <Grid>
            <Grid.Column width={12}>
                {collaborators && <CreatorCards users={collaborators} activeTab={props.activeTab} platform={platform} 
                                editingMode={editingMode} setShowCollaboratorRemovalModal={setShowCollaboratorRemovalModal} setRemoveUser={setRemoveUser}/>
                }
            </Grid.Column>
            <Grid.Column width={4}>
                {
                    isOwner && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => toggleEditingMode(!editingMode)}>
                            Edit
                        </button>  
                    </div>
                }
                {
                    !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={handleClick}>
                            {buttonText}
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
            {
                showCollaboratorRequests && (<RequestModal platform={platform} setShowCollaboratorRequests={setShowCollaboratorRequests} setButtonText={setButtonText}
                                            refetchPlatformData={refetchPlatformData}/>)
            }
            {
                showCollaboratorRemovalModal && (<CollaboratorRemovalModal setShowCollaboratorRemovalModal={setShowCollaboratorRemovalModal}
                                                removeCollaborator={removeCollaborator} removeUser={removeUser}/>)
            }
        </Grid>
    );
}
export default Collaborators;