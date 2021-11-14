import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import MenuBar from '../components/MenuBar';
import CreatorCards from '../components/CreatorCards';
import PlatformCards from '../components/PlatformCards';
import QuizCards from '../components/QuizCards'

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Home = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    var users = [];
    const { data: usersData, refetch: usersRefetch } = useQuery(queries.FETCH_POPULAR_USERS);
	if(usersData) {
        users = usersData.getPopularUsers;
    }

    console.log(users);

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

    console.log(quizzes);

	return (
        <div style={{ paddingBottom: '3rem' }}>
            {user &&
                <div>
                    <h3 className="ui header">For You</h3>
                    <div className="ui hidden divider"></div>
                </div>
            }

            <h3 className="ui header">Trending</h3>
            {/* TEMP BUTTON TO TEST QUIZ */}
               {/* <div className="item cursor-pointer" onClick={() => history.push("/quiz/" + 123)}>
                <img className="card-image ui avatar image"
                    src="https://d3ftabzjnxfdg6.cloudfront.net/app/uploads/2021/02/19-07-13_8644-BB-web-1024x585.jpg"
                    alt="quiz"
                />
                <br/>
                <br/>
                <div className="header">
                    What's The Deal With Seals?
                </div>
                <div>
                    Joe Shmo
                </div>
                <br/>
                </div>   */} 
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