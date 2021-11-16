import React, { useContext, useEffect, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';

import QuizQuesAns from '../components/QuizQuesAns'
import QuizEnd from './QuizEnd';

const QuizStart = (props) => {

    //console.log(props.highestScores)
    let maxtime = 10
    const [questionNumber, setQuestionNumber] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [questionScore, setQuestionScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timer, setTimer] = useState(maxtime);
    const [timerActive, setTimerActive] = useState(true);
    
   
    const handleFinish = () =>{
        //setTimerActive(false);
        setIsFinished(true);
        
    }

    const handleSetQuestionNumber = () =>{
        setQuestionNumber(questionNumber+1);
        setTimerActive(true);
        setTimer(maxtime);

    }

    const handleSetShowAnswer = () =>{
        if(showAnswer){
            setShowAnswer(false);
        }else{
            setShowAnswer(true);
        }
        
    }

    
    const handleAnswerOptionsClick = (isCorrect) => {
        var scored = 50+5*timer;
        setTimerActive(false);
        //setTimer(30);
        if(isCorrect){
            setQuestionScore(scored)
            setTotalScore(totalScore + scored)
        }else{
            setQuestionScore(0)
        }


    };

    

    useEffect(()=>{
        if(!timer){
            setQuestionScore(0);
            setShowAnswer(true);
            return;
        }
        let interval = null;
        //console.log(timer)
        if(timerActive){
            interval = setInterval(() =>{
                setTimer(timer - 1);
            }, 1000);
        }else if (!timerActive){
            clearInterval(interval);

        
        }
        return () => clearInterval(interval);
    }, [timerActive, timer]);

    console.log(showAnswer)
    //if(timer <= 0){
    //    handleAnswerOptionsClick(false);
    //    handleSetShowAnswer();
        
    //}

    if(isFinished == true || questionNumber == props.currentQuiz.cards.length){
        console.log(props.currentQuiz.cards.length)
        return( 
            <QuizEnd score = {totalScore} currentQuiz = {props.currentQuiz } highestScores = {props.highestScores}></QuizEnd>
        );
    }else{
        console.log(props.currentQuiz.cards.length)
        return (
            <div>
                <br />
                <h3>{(questionNumber+1)+ " of "+(props.currentQuiz.cards.length)}</h3>
                <h1>
                    <p style={{textAlign:'center'}}>{props.currentQuiz.title}</p>
                </h1>
                <h4>
                    <p style={{textAlign:'center'}}>{"Created by "+props.author}</p>
                </h4>
                
                <h3>{timer}</h3>
                <div className="each-question">
                    <QuizQuesAns showAnswer={showAnswer} currentQuestion={props.currentQuiz.cards[questionNumber] } score={questionScore} handleSetQuestionNumber={handleSetQuestionNumber}  handleSetShowAnswer={handleSetShowAnswer} handleAnswerOptionsClick={handleAnswerOptionsClick}></QuizQuesAns>
                </div>

                <button className="quiz-finish-button" onClick = {() => handleFinish()}>
                    Finish
                </button>
    
            </div>
        );
    }
    

}
export default QuizStart;