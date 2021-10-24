import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

function CreatorCard(props) {
    const history = useHistory();
    const { user } = useContext(AuthContext);

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
        history.push("/profile/:" + props.user.profileId);
    }

    return (
        <div className="item" style={{ textAlign: "center" }} onClick={handleClick}>
            <img className="creator-circle ui avatar image"
                style={{ width: "8rem", height: "8rem" }}
                src="https://image.pngaaa.com/477/46477-middle.png"
            />
            <br/>
            <br/>
            <a className="header">{props.user.username}</a>
            <br/>
            <a className="header">{profile.followerCount} followers</a>
        </div>    
    );
}

export default CreatorCard;