import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import CreatorCards from '../components/cards/CreatorCards';
import PlatformCards from '../components/cards/PlatformCards';

import * as queries from '../cache/queries';

const Following = (props) => {
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
        <Grid>
            <Grid.Column>
                <br/>
                {
                    users.length > 0 && 
                    <div>
                        <h3 className="ui header">Users</h3>
                        <CreatorCards users={users} activeTab='following'/>
                    </div>
                }
                <div className="ui hidden divider"></div>
                {
                    platforms.length > 0 &&
                    <div>
                        <h3 className="ui header">Platforms</h3>
                        {platforms && <PlatformCards platforms={platforms} activeTab='following'/>}
                    </div>
                }          
            </Grid.Column>
        </Grid>
    );
}
export default Following;