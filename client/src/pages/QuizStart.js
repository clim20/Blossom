import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';
import QuizCard from '../components/QuizCard'
import QuizEnd from './QuizEnd';

const QuizStart = (props) => {

    console.log(props.highestScores)

    const [questionNumber, setQuestionNumber] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [questionScore, setQuestionScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
   
    const handleFinish = () =>{
        setIsFinished(true);
    }

    const handleSetQuestionNumber = () =>{
        setQuestionNumber(questionNumber+1);
    }

    const handleSetShowAnswer = () =>{
        if(showAnswer){
            setShowAnswer(false);
        }else{
            setShowAnswer(true);
        }
        
    }

    
    const handleAnswerOptionsClick = (isCorrect) => {
        var scored = 100;
        if(isCorrect){
            setQuestionScore(scored)
            setTotalScore(totalScore + scored)
        }else{
            setQuestionScore(0)
        }


    };

    if(isFinished == true || questionNumber == props.currentQuiz.cards.length){
        return( 
            <QuizEnd score = {totalScore} currentQuiz = {props.currentQuiz } highestScores = {props.highestScores}></QuizEnd>
        );
    }else{
        return (
            <div>
                <header>{(questionNumber+1)+ " of "+(props.currentQuiz.cards.length)}</header>
                <header>
                    <p>{props.currentQuiz.title}</p>
                    <p>{"Created by "+props.currentQuiz.author}</p>
       
                </header>
                <div>
                    <QuizCard showAnswer={showAnswer} currentQuestion={props.currentQuiz.cards[questionNumber] } score={questionScore} handleSetQuestionNumber={handleSetQuestionNumber}  handleSetShowAnswer={handleSetShowAnswer} handleAnswerOptionsClick={handleAnswerOptionsClick}></QuizCard>
                </div>

                <button onClick = {() => handleFinish()}>
                    Finish
                </button>
    
            </div>
        );
    }
    

}
export default QuizStart;