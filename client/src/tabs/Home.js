import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

import FeaturedQuizCard from '../components/cards/FeaturedQuizCard';
import QuizCards from '../components/cards/QuizCards';
import QuizCollectionCards from '../components/cards/QuizCollectionCards';

const Home = (props) => {
    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.profile ? props.profile._id : ''
        }
    });

    var profile;
    if (props.profile && profileData) { 
		profile = profileData.findProfileById;
    }

    const { data: platformData, refetch: refetchPlatformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform ? props.platform._id : ''
        }
    });

    var platform;
    if (props.platform && platformData) { 
		platform = platformData.findPlatformById;
    }

    const quiz = profile ? profile.featuredQuiz : platform ? platform.featuredQuiz : '';

    var popularQuizzes = [];
    const {data: popularQuizzesData, refetch: refetchPopularQuizzesData } = useQuery(queries.GET_POPULAR_QUIIZZES_OF_ID, {
        variables: {
            id: profile ? profile._id : platform ? platform._id : ''
        }
    });
    if(popularQuizzesData) { 
        popularQuizzes = popularQuizzesData.getPopularQuizzesOfId; 
    }

    var popularQuizCollections = [];
    const {data: popularQuizCollectionsData, refetch: refetchPopularQuizCollectionsData} = useQuery(queries.GET_POPULAR_QUIZ_COLLECTIONS_OF_ID, {
        variables: {
            id: profile ? profile._id : platform ? platform._id : ''
        }
    });
    if(popularQuizCollectionsData) { 
        popularQuizCollections = popularQuizCollectionsData.getPopularQuizCollectionsOfId; 
    }

    useEffect(() => {
        refetchProfileData();
        refetchPlatformData();
        refetchPopularQuizzesData();
        refetchPopularQuizCollectionsData();
    }, [quiz, popularQuizzes, popularQuizCollections, refetchProfileData, refetchPlatformData, refetchPopularQuizzesData, refetchPopularQuizCollectionsData]);

    return (
        <div>
            {quiz && 
                <div>
                    <FeaturedQuizCard quiz={quiz} activeTab='home'/>
                    <br/>
                </div>
            }

            {popularQuizzes.length > 0 &&
                <div>
                    <h3 className="ui header">
                        Popular Quizzes
                    </h3>
                    <QuizCards quizzes={popularQuizzes} activeTab='home'/>
                    <br/>
                </div>
            }

            {popularQuizCollections.length > 0 &&
                <div>
                    <h3 className="ui header">
                        Popular Quiz Collections
                    </h3>
                    <QuizCollectionCards quizCollections={popularQuizCollections} activeTab='home'/>
                    <br/>
                </div>
            }
        </div>
    );
}
export default Home;