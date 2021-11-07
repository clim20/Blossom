import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import PlatformCards from '../components/PlatformCards';

import * as queries from '../cache/queries';

const Platforms = (props) => {
    const [isEditing, setEditing] = useState(false);

    var platforms = [];
    const { data: platformsData } = useQuery(queries.FIND_PLATFORMS_BY_IDS, {
        variables: {
            ids: props.profile.platforms
        }
    });

    if(platformsData) { 
        platforms = platformsData.findPlatformsByIds; 
    }

    return (
        <div>
            {platforms && <PlatformCards platforms={platforms} profile={props.profile} activeTab={props.activeTab}/>}
        </div>
    );
}
export default Platforms;