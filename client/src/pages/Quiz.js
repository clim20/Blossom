import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

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



    console.log(username)
    console.log(followers)

    /*
    const [currentQuiz, setCurrentQuiz] = useState({
        title: "What's The Deal With Seals?",
        author: "Joe Shmo",
        followers: 114,
        questions: 24,
        description: "test description",
        cards: [
            {
                cardNum: 0,
                question: "0",
                choices: ["0", "1", "2", "3"],
                answer: 0,
                answerExplanation: "it is 0",
    
            },
            {
                cardNum: 1,
                question: "1",
                choices: ["0", "1", "2", "3"],
                answer: 1,
                answerExplanation: "it is 1",
    
            },
            {
                cardNum: 2,
                question: "2",
                choices: ["0", "1", "2", "3"],
                answer: 2,
                answerExplanation: "it is 2",
    
            },
            {
                cardNum: 3,
                question: "3",
                choices: ["0", "1", "2", "3"],
                answer: 3,
                answerExplanation: "it is 3",
    
            }
        ]

    });
    */
    const [highestScores, setHighestScores] = useState([["A",600],["B",500],["C",300],["D",200]]);
    const [score, setScore] = useState(0);

    const [redirect, setRedirect] = useState(false);

    const handleStart = event =>{
        setRedirect(true);
    };
    const gotoEdit = event =>{}; 
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
                <h1 style={{textAlign: 'center'}}>{currentQuiz.title}</h1>
                <button onClick = {() => handleFollow()} style = {styles.button}>
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
    
                <button onClick = {() => handleStart()} style = {styles.button}>
                    Start
                </button>
    
                <div>
                    <button style = {styles.button}>
                        LEADERBOARDS
                    </button>
                    <table>
                        {highestScores.splice(0,5).map(displayTopScores)}
                    </table>
                    
                </div>
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