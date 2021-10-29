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
        history.push("/profile/" + props.user.profileId);
    }

    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image creator-circle ui avatar image"
                src="https://image.pngaaa.com/477/46477-middle.png"
                alt="creator profile"
            />
            <br/>
            <br/>
            <div className="header">
                {props.user.username}
            </div>
            <br/>
            <div className="header">
                {profile && profile.followerCount && profile.followerCount} followers
            </div>
        </div>    
    );
}

export default CreatorCard;