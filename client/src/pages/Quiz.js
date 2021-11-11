import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import image1 from '../testpic/seal.jpg';

import MenuBar from '../components/MenuBar';
import QuizStart from './QuizStart';

const styles = {
    button : {
        'border': 'none',
        'backgroundColor': '#ff00ff',
        'textAlign': 'center'
    }
}

const Quiz = () =>{
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const params = useParams();
    const quizId = params ? params.quizId : 'could not get params';

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: quizId
        }
    });

    var currentQuiz = {};
    var cards = [];
    if (quizData) { 
		currentQuiz = quizData.findQuizById;
        cards = currentQuiz.cards
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: currentQuiz.creator
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

    var isCreator = userObject && user && userObject._id === user._id

    console.log(username)
    console.log(followers)

    
    const [highestScores, setHighestScores] = useState([["A",600],["B",500],["C",300],["D",200]]);
    const [score, setScore] = useState(0);

    const [redirect, setRedirect] = useState(false);

    const handleStart = event =>{
        setRedirect(true);
    };
    const gotoEdit = event =>{
        history.push("/quiz/edit/" + quizId)
    }; 
    const handleFollow = event => {};
    const handleCreateCollection = event => {};
    const handleAddToCollection = event => {};
    
    const scoreQuery = () =>{};
    const handleSaveChanges = () =>{};

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

    if(redirect == false){
        console.log(highestScores)
        return(
            
            <div style={{textAlign: 'center'}}>
                
                <MenuBar></MenuBar>

                <h1 className="quiz-title" style={{textAlign: 'center'}}>{currentQuiz.title}</h1>
                <button className="quiz-creator-follow" onClick = {() => handleFollow()} style = {styles.button}>
                    {/* <p style={{textAlign: 'center'}}>
                        {username}
                    </p>
                    <p style={{textAlign: 'center'}}> 
                        {followers + " Followers"}
                    </p>*/}
                    <p style={{textAlign: 'center'}}>
                        {username}
                        <br />
                        {followers + " Followers"}
                    </p>
                </button>
                <img src={image1} width='500' height='300'/>
                <p style={{textAlign: 'center'}}>{cards.length + " Questions"}</p>
                <p>{currentQuiz.description}</p>
    
                <button className="quiz-start-retry-button" onClick = {() => handleStart()} style = {styles.button}>
                    Start
                </button>
    
                <div>
                    <h1 className="quiz-title" style={{textAlign: 'center'}}>{currentQuiz.title}</h1>
                    <button className="quiz-creator-follow" onClick = {() => handleFollow()} style = {styles.button}>
                        <p style={{textAlign: 'center'}}>
                            {username}
                        </p>
                        <p style={{textAlign: 'center'}}> 
                            {followers + " Followers"}
                        </p>
                    </button>
                    <img src={image1}/>
                    <p style={{textAlign: 'center'}}>{cards.length + " Questions"}</p>
                    <p>{currentQuiz.description}</p>
        
                    <button className="quiz-start-end-button" onClick = {() => handleStart()} style = {styles.button}>
                        Start
                    </button>

                    <table className="leaderboard-table">
                        {highestScores.splice(0,5).map(displayTopScores)}
                    </table>
                    

        
                    <div>
                        <button className="quizLeaderboard" style = {styles.button}>
                            LEADERBOARDS
                        </button>
                        <table>
                            {highestScores.splice(0,5).map(displayTopScores)}
                        </table>
                        
                    </div>
                </div>
                {isCreator &&
                    <button className="quiz-start-end-button" onClick = {() => gotoEdit()} style = {styles.button}>
                        Edit
                    </button>
                }
                
            </div>
            
        );

    }else{
        
        return(
            <QuizStart currentQuiz = {currentQuiz} author = {username}></QuizStart>
        );
        
       
    }

    //<Redirect to={{
    //    pathname: '/quiz/start/:quizId',
    //    state: { currentQuiz: currentQuiz }
    //  }} />
    

}
export default Quiz;