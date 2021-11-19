import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import CreatorCards from '../components/cards/CreatorCards';
import PlatformCards from '../components/cards/PlatformCards';
import QuizCards from '../components/cards/QuizCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Home = () => {
    const { user } = useContext(AuthContext);

    var users = [];
    const { data: usersData, refetch: usersRefetch } = useQuery(queries.FETCH_POPULAR_USERS);
	if(usersData) {
        users = usersData.getPopularUsers;
    }

    var platforms = [];
    const { data: platformsData } = useQuery(queries.FETCH_POPULAR_PLATFORMS);
    if(platformsData) { 
        platforms = platformsData.getPopularPlatforms; 
    }

    var quizzes = [];
    const {data: quizzesData} = useQuery(queries.FETCH_POPULAR_QUIIZZES);
    if(quizzesData) { 
        quizzes = quizzesData.getPopularQuizzes; 
    }

    var forYouQuizzes = [];
    const {data: forYouQuizzesData} = useQuery(queries.GET_FOR_YOU_QUIZZES, {
        variables: {
            id: user ? user.profileId : ''
        }
    });

    if(forYouQuizzesData) { 
        forYouQuizzes = forYouQuizzesData.getForYouQuizzes; 
    }

	return (
        <div style={{ paddingBottom: '3rem' }}>
            {user && forYouQuizzes.length !== 0 && 
                <div>
                    <h3 className="ui header">For You</h3>
                    {forYouQuizzes && <QuizCards quizzes={forYouQuizzes}/>}
                    <div className="ui hidden divider"></div>
                </div>
            }

            <h3 className="ui header">Trending</h3>
            {quizzes && <QuizCards quizzes={quizzes}/>}
            <div className="ui hidden divider"></div>
            <h3 className="ui header">Popular Creators</h3>
            {users && <CreatorCards users={users} />}
            <div className="ui hidden divider"></div>
            <h3 className="ui header">Popular Platforms</h3>
            {platforms && <PlatformCards platforms={platforms} />}
        </div>
	);
}

export default Home;