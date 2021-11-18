import React, { useContext, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';
import QuizStart from './QuizStart';
import LeaderBoardModal from '../modals/LeaderBoardModal';

const styles = {
    button : {
        'border': 'none',
        'backgroundColor': '#ff00ff',
        'textAlign': 'center'
    }
}

const QuizEnd = (props) =>{

    const { user } = useContext(AuthContext);

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
    const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);
    var scores = props.currentQuiz.scores;
    
    const handleRetry = event =>{
        setIsRetrying(true);
        //history.push("/quiz/" + props.currentQuiz._id);
        window.location.reload(false);
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
        var name = "";
        let score = arr.userScore
        
        const NameComp = (props) =>{
            const { data: playerData } = useQuery(queries.FIND_USER_BY_ID, {
                variables: {
                    id: props.user
                }
            });

            var player = {};
            name = ""
            if (playerData) { 
		        player = playerData.findUserById;
                name = player.username
            }

            return <th>{name}</th>
        }

        return(
            <tr>
                <th>{index+1}</th>
                <NameComp user = {arr.user}></NameComp>
                <th>...</th>
                <th>{score}</th>
            </tr>
        )
        
    };

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
                <header>
                {props.numOfCorrect} out of {props.currentQuiz.cards.length}
                </header>
                
            </div>

            <button className="quiz-start-retry-button" onClick = {() => handleRetry()} style = {styles.button}>
                RETRY
            </button>
            <p>*Only first scores are posted to the leaderboards</p>

            <div>
                <button className="quizLeaderboard" style = {styles.button} onClick = {() => setShowLeaderBoardModal(true)} >
                    LEADERBOARDS
                </button>
                <table className="leaderboard-table">
                    {scores.slice(0,5).map(displayTopScores)}
                </table>
                
            </div>

            {
                    showLeaderBoardModal && (<LeaderBoardModal setShowLeaderBoardModal = {setShowLeaderBoardModal} scores = {scores} currentuser = {user._id}/>)
            }
        </div>
            
    );    
    
}
export default QuizEnd;