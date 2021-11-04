import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';


const QuizQuesAns = (props) => {

    const nextQuestion = () =>{
        props.handleSetQuestionNumber();
        props.handleSetShowAnswer();
    }

    const createQuestion = (choice, index) =>{
        return(
            <button onClick = {() => answerQuestion(index==props.currentQuestion.answer)}>{choice}</button>
        );
        
    };

    const answerQuestion = (isCorrect) =>{
        props.handleSetShowAnswer();
        props.handleAnswerOptionsClick(isCorrect)
    };

    if(props.showAnswer == true){
        return( 
            <div>
                <button onClick = {() => nextQuestion()}>
                    <h>Correct Answer: {String.fromCharCode('A'.charCodeAt(0)+props.currentQuestion.answer)}</h>
                    <h>{props.score} pts</h>
                    <p>{props.currentQuestion.answerExplanation}</p>
                </button>
            </div>
        );
    }else{
        return (
            <div>
                <p>{props.currentQuestion.question}</p>
                <div>
                    {props.currentQuestion.choices.map(createQuestion)}
                </div>
            </div>
        );
    }
    

}
export default QuizQuesAns;