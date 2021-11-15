import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';
import QuizStart from './QuizStart';

const styles = {
    button : {
        'border': 'none',
        'backgroundColor': '#ff00ff',
        'textAlign': 'center'
    }
}

const QuizEnd = (props) =>{

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.currentQuiz.creator
        }
    });

    var userObject = {};
    var username = "";
    if (userData) { 
		userObject = userData.findUserById;
        username = userObject.username;
    }

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: userObject.profileId
        }
    });

    var profileObject = {};
    var followers = 0;
    if (profileData) { 
		profileObject = profileData.findProfileById;
        followers = profileObject.followerCount;
    }


    const [isRetrying, setIsRetrying] = useState(false);
    
    const handleRetry = event =>{
        setIsRetrying(true);
    };
    const handleFollow = event =>{
        //props.handleFollow(event);
    };
    const handleCreateCollection = event =>{
        props.handleCreateCollection(event);
    };
    const handleAddToCollection = event =>{
        props.handleAddToCollection(event);
    };

    const displayTopScores = (arr, index) =>{

        return(
            <tr>
                <th>{index+1}</th>
                <th>{arr[0]}</th>
                <th>...</th>
                <th>{arr[1]}</th>
            </tr>
        )
        
    };

    if(isRetrying == false){
        return(
        
            <div style={{textAlign: 'center'}}>
                <h1 className="quiz-title" style={{textAlign: 'center'}}>{props.currentQuiz.title}</h1>
                <button className="quiz-creator-follow" onClick = {() => handleFollow()} style = {styles.button}>
                    <p style={{textAlign: 'center'}}>
                        {username}
                    </p>
                    <p style={{textAlign: 'center'}}> 
                        {followers + " Followers"}
                    </p>
                </button>
                
                <div>
                    <header>Congratulations</header>
                    <header>
                    {props.score} pts
                    </header>
                </div>
    
                <button className="quiz-start-retry-button" onClick = {() => handleRetry()} style = {styles.button}>
                    RETRY
                </button>
                <p>*Only first scores are posted to the leaderboards</p>
    
                <div>
                    <button className="quizLeaderboard" style = {styles.button}>
                        LEADERBOARDS
                    </button>
                    <table className="leaderboard-table">
                        {/*props.highestScores.splice(0,5).map(displayTopScores)*/}
                    </table>
                    
                </div>
            </div>
            
        );    
    }else{
        return(
            <QuizStart currentQuiz = {props.currentQuiz} highestScores = {props.highestScores}></QuizStart>
        );
    }
    

}
export default QuizEnd;