import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

function PlatformCard(props) {
    const history = useHistory();

    const { data } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform._id
        }
    });

    var platform = {};
    var followerCount = 0;
    if (data) { 
		platform = data.findPlatformById;
        followerCount = props.platform.followerCount;
    }

    const handleClick = () => {
        if(!props.editingMode)
            history.push("/platform/" + props.platform._id);
    }

    const onPlatformTab = props.activeTab === "platforms";
    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image platform-circle ui avatar image"
                src={platform.platformImg}
                alt="platform"
            />
            {
                onPlatformTab && props.editingMode &&
                <i class="times icon" style={{ float: 'right', marginLeft: '-100px', color: 'var(--cancelRed)', fontSize: '15pt' }}
                    onClick={() => props.deletePlatform(platform._id)}
                />
            }
            <br/>
            <br/>
            <div className="header">{props.platform.name}</div>
            <br/>
            <div className="header"> 
                {followerCount} followers
            </div>
            <div>
                {onPlatformTab && props.profile.user === platform.owner && <div> Owner </div>} 
            </div>
            <div>
                {onPlatformTab && props.profile.user !== platform.owner && <div> Collaborator </div>}
            </div>
        </div>    
    );
}

export default PlatformCard;