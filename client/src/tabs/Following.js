import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import CreatorCards from '../components/CreatorCards';
import PlatformCards from '../components/PlatformCards';

import * as queries from '../cache/queries';

const Following = (props) => {
    const [isEditing, setEditing] = useState(false);

    var following = [];
    const { data } = useQuery(queries.FIND_FOLLOWING_BY_IDS, {
        variables: {
            ids: props.profile.following
        }
    });

    if (data) {
        following = data.findFollowingByIds;
    }

    // Filter into users and platforms
    const users = following.filter((obj) => {
        if (obj.username) { return true; }
        return false;
    });

    const platforms = following.filter((obj) => {
        if (obj.name) { return true; }
        return false;
    });

    return (
        <div>
            {users.length > 0 && 
                <div>
                    <h3 className="ui header">Users</h3>
                    <CreatorCards users={users} />
                </div>
            }
            <div className="ui hidden divider"></div>
            {platforms.length > 0 &&
                <div>
                    <h3 className="ui header">Platforms</h3>
                    {platforms && <PlatformCards platforms={platforms} />}
                </div>
            }            
        </div>
    );
}
export default Following;