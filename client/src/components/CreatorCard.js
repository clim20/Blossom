import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const CreatorCard = (props) => {
    const history = useHistory();
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
        if(!props.editingMode)
            history.push("/profile/" + props.user.profileId);
    }

    const handleXClick = () => {
        props.setRemoveUser(props.user._id);
        props.setShowCollaboratorRemovalModal(true);
    }

    const onCollaboratorTab = props.activeTab === "collaborators";
    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image creator-circle ui avatar image"
                src={profile.profileImg}
                alt="creator profile"
            />
            {
                onCollaboratorTab && props.editingMode && props.user._id !== props.platform.owner &&
                <i class="times icon" style={{ float: 'right', marginLeft: '-100px', color: 'var(--cancelRed)', fontSize: '15pt' }}
                    onClick={handleXClick}
                />
            }
            <br/>
            <br/>
            <div className="header">
                {props.user.username}
            </div>
            <br/>
            <div className="header">
                {profile && profile.followerCount && profile.followerCount} followers
            </div>
            <div>
                {onCollaboratorTab && props.user._id === props.platform.owner && <div> Owner </div>} 
            </div>
            <div>
                {onCollaboratorTab && props.user._id !== props.platform.owner && <div> Collaborator </div>}
            </div>
        </div>    
    );
}

export default CreatorCard;