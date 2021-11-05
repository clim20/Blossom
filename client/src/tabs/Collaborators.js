import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

import CreatorCards from '../components/CreatorCards';
import RequestModal from '../modals/RequestModal';

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
    if(user) {
        isOwner = platform.owner === user._id;
        isCollaborator = platform.collaborators.includes(user._id);
        isRequest = platform.requests.includes(user._id);
    }
    const [showCollaboratorRequests, setShowCollaboratorRequests] = useState(false);
    const [buttonText, setButtonText] = useState(user ? (!isOwner ? (isRequest ? "Pending..." : (isCollaborator ? "Leave" : "Join")) : "Requests") : "");
    const [isEditing, setEditing] = useState(false);

    const handleClick = async () => {
       switch (buttonText) {
           case "Join": 
                const { data: joinData } = await AddCollaboratorRequest({variables: { platformId: platform._id, userId: user._id }});
                setButtonText("Pending...");
                refetchPlatformData();
                break;
           case "Requests": 
                setShowCollaboratorRequests(true);
                break;
            case "Leave":
                const { data: leaveData } = await RemoveCollaborator({variables: { platformId: platform._id, userId: user._id }});
                setButtonText("Join");
                refetchPlatformData();
                break;
            case "Pending...":
                alert("Join request already sent");
                break;
       }
    }

    useEffect(() => {
        (user ? (!isOwner ? (isRequest ? setButtonText("Pending...") 
                                        : (isCollaborator ? setButtonText("Leave") 
                                        : setButtonText("Join"))) : setButtonText("Requests")) 
                                        : setButtonText(""))
    }, [user, platform]);

    useEffect(() => {
        refetchPlatformData();
    }, [user, platform]);

    return (
        <div>
            {user && buttonText !== "" &&
                <button className="ui button request-button" onClick={handleClick}>
                    {buttonText}
                </button>
            }
            {collaborators && <CreatorCards users={collaborators} activeTab={props.activeTab} platform={platform} />}
            {showCollaboratorRequests && (<RequestModal platform={platform} setShowCollaboratorRequests={setShowCollaboratorRequests} setButtonText={setButtonText}
            refetchPlatformData={refetchPlatformData}
            />
            )}
        </div>
    );
}
export default Collaborators;