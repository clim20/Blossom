import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

import FeaturedQuizCard from '../components/cards/FeaturedQuizCard';

const Home = (props) => {
    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.profile ? props.profile._id : ''
        }
    });

    var profile;
    if (props.profile && profileData) { 
		profile = profileData.findProfileById;
    }

    const { data: platformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform ? props.platform._id : ''
        }
    });

    var platform;
    if (props.platform && platformData) { 
		platform = platformData.findPlatformById;
    }

    const quiz = profile ? profile.featuredQuiz : platform ? platform.featuredQuiz : '';

    return (
        <div>
            <FeaturedQuizCard quiz={quiz}/>
        </div>
    );
}
export default Home;