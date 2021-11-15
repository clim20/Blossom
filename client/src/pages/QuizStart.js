import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';

import QuizQuesAns from '../components/QuizQuesAns'
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