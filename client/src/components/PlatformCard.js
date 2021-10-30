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
        history.push("/platform/" + props.platform._id);
    }

    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image platform-circle ui avatar image"
                src="https://i.pinimg.com/originals/36/36/91/363691f9212a3c3184703443c42c7a40.jpg"
                alt="platform"
            />
            <br/>
            <br/>
            <div className="header">{props.platform.name}</div>
            <br/>
            <div className="header"> {followerCount} followers</div>
        </div>    
    );
}

export default PlatformCard;