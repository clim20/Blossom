import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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
    const [currentQuiz, setCurrentQuiz] = useState({
        title: "What's The Deal With Seals?",
        author: "Joe Shmo",
        followers: 114,
        questions: 24,
        description: "test description"

    });
    const [highestScores, setHighestScores] = useState([["A",600],["B",500],["C",300],["D",200],["E",100]]);
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
        return(
            
            <div style={{textAlign: 'center'}}>
                
                <MenuBar></MenuBar>
                <h1 style={{textAlign: 'center'}}>{currentQuiz.title}</h1>
                <button onClick = {() => handleFollow()} style = {styles.button}>
                    <p style={{textAlign: 'center'}}>
                        {currentQuiz.author}
                    </p>
                    <p style={{textAlign: 'center'}}> 
                        {currentQuiz.followers + " Followers"}
                    </p>
                </button>
                <img src={image1}/>
                <p style={{textAlign: 'center'}}>{currentQuiz.questions}</p>
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
            <QuizStart currentQuiz = {currentQuiz}></QuizStart>
        );
        
       
    }

    //<Redirect to={{
    //    pathname: '/quiz/start/:quizId',
    //    state: { currentQuiz: currentQuiz }
    //  }} />
    

}
export default Quiz;