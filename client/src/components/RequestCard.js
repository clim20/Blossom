import React from 'react';
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Icon, Modal } from 'semantic-ui-react'

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const RequestCard = (props) => {
    const history = useHistory();

    const [AddCollaborator] 			        = useMutation(mutations.ADD_COLLABORATOR);
    const [RemoveCollaboratorRequest] 			= useMutation(mutations.REMOVE_COLLABORATOR_REQUEST);
    
    const { data } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.user.profileId
        }
    });

    var profile = {};
    if (data) { 
		profile = data.findProfileById;
    }

    const handleClick = () => {
        history.push("/profile/" + props.user.profileId);
    }

    const handleAccept = async () => {
        const { data: addData } = await AddCollaborator({variables: { platformId: props.platform._id, userId: props.user._id }});
        props.setButtonText("Leave");
        props.refetchPlatformData();
    }

    const handleReject = async () => {
        const { data: removeData } = await RemoveCollaboratorRequest({variables: { platformId: props.platform._id, userId: props.user._id }});
        props.setButtonText("Join");
        props.refetchPlatformData();
    }

    return (
            <div className="item text-align-center cursor-pointer">
                <img className="card-image creator-circle ui avatar image"
                    src={profile.profileImg}
                    alt="creator profile"
                    onClick={handleClick}
                />
                <br/>
                <br/>
                <div className="header">
                    {props.user.username}
                </div>
                <br/>
                <Modal.Actions>
                    <Button positive onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button negative onClick={handleReject}>
                        Reject
                    </Button>
                </Modal.Actions>
            </div>  
    );
}

export default RequestCard;