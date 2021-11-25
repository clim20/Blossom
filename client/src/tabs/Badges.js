import React, { useContext, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import BadgeCards from '../components/cards/BadgeCards';

import * as queries from '../cache/queries';

const Badges = (props) => {
    var badges = [];
    const { data } = useQuery(queries.FIND_BADGES_BY_IDS, {
        variables: {
            ids: props.profile.badges
        }
    });

    if (data) {
        badges = data.findBadgesByIds;
    }

    return (
        <Grid>
            <Grid.Column>
                <br/>
                {
                    badges.length > 0 && 
                    <div>
                        <BadgeCards badges={badges} activeTab='badges'/>
                    </div>
                }      
            </Grid.Column>
        </Grid>
    );
}
export default Badges;