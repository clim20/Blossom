import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

function PlatformCard(props) {
    const history = useHistory();

    const { data } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform ? props.platform._id : ''
        }
    });

    var platform;
    if (data) { 
		platform = data.findPlatformById;
    }

    const handleClick = () => {
        if(!props.editingMode) {
            history.push("/platform/" + props.platform._id);
        }
    }

    const handleXClick = () => {
        props.setRemovePlatform(platform._id);
        props.setShowPlatformDeletionModal(true);
    }

    const onPlatformTab = props.activeTab === "platforms";
    const followerCount = platform ? platform.followerCount !== 1 ? platform.followerCount + ' followers' : platform.followerCount + ' follower' : '';
    
    return (
        <div className="item text-align-center cursor-pointer ui card" onClick={handleClick}>
            <div className="content">
                <div className="description card-text">
                    <img className="card-image platform-circle ui avatar image"
                        src={platform && platform.platformImg}
                        alt="platform"
                    />
                    {
                        onPlatformTab && props.editingMode && platform && platform.owner === props.user._id && 
                        <i className="times icon" style={{ float: 'right', marginLeft: '-100px', color: 'var(--cancelRed)', fontSize: '15pt' }}
                            onClick={handleXClick}
                        />
                    }
                    <br/>
                    <br/>
                    <div style={{ fontWeight: 'bold' }}>{props.platform.name}</div>
                    <div> {platform && followerCount} </div>
                    <div>
                        {onPlatformTab && platform && props.profile.user === platform.owner && <div> Owner </div>} 
                    </div>
                    <div>
                        {onPlatformTab && platform && props.profile.user !== platform.owner && <div> Collaborator </div>}
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default PlatformCard;