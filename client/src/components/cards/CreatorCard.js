import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const CreatorCard = (props) => {
    const history = useHistory();
    
    const { data } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.user ? props.user.profileId : ''
        }
    });

    var profile;
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
    const followerCount = profile ? profile.followerCount !== 1 ? profile.followerCount + ' followers' : profile.followerCount + ' follower' : '';

    return (
        <div className="item text-align-center cursor-pointer ui card" onClick={handleClick}>
            <div className="content">
                <div className="description card-text">
                    <img className="card-image creator-circle ui avatar image"
                        src={profile && profile.profileImg}
                        alt="creator profile"
                    />
                    {
                        onCollaboratorTab && props.editingMode && props.user._id !== props.platform.owner &&
                        <i className="times icon" style={{ float: 'right', marginLeft: '-100px', color: 'var(--cancelRed)', fontSize: '15pt' }}
                            onClick={handleXClick}
                        />
                    }
                    <br/>
                    <br/>
                    <div style={{ fontWeight: 'bold' }}> {props.user.username} </div>
                    <div> {profile && followerCount} </div>
                    <div>
                        {onCollaboratorTab && props.user._id === props.platform.owner && <div> Owner </div>} 
                    </div>
                    <div>
                        {onCollaboratorTab && props.user._id !== props.platform.owner && <div> Collaborator </div>}
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default CreatorCard;