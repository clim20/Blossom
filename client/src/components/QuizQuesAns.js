//import React, { useContext, useState } from 'react';
import React, {useRef, useState, useEffect } from "react";
//import { useMutation, useQuery } from '@apollo/react-hooks';


const QuizQuesAns = (props) => {


    const refs = useRef(null)
    const ctx = useRef(null)
    
    

    useEffect(() =>{
        console.log("here")
        refs.current.width = window.innerWidth * 2;
        refs.current.height = window.innerHeight * 2;
        refs.current.style.width = `${window.innerWidth}px`;
        refs.current.style.height = `${window.innerHeight}px`;
        ctx.current  = refs.current.getContext("2d")
        ctx.current.scale(2, 2);
        ctx.current.fillStyle="white"
        ctx.current.fillRect(0,0,400,400)
        
        

        
    }, []);

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

    
    var imagechoice = "";
        if(props.showAnswer == true){
            imagechoice = props.currentQuestion.answerImg;
        }else{
            imagechoice = props.currentQuestion.questionImg;
        }
        if(imagechoice!=""){
            var imagedata = new Image;
            imagedata.onload = function(){
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = imagechoice;
        }else{
            ctx.current  = refs.current.getContext("2d")
            ctx.current.scale(2, 2);
            ctx.current.fillStyle="white"
            ctx.current.fillRect(0,0,400,400)
        }
    if(props.showAnswer == true){

        return( 
            <div>
                <div style={{position: 'reletive'}}>
                    <canvas ref={refs} width="400px" height="400px"></canvas>
                </div>
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
                <div style={{position: 'reletive'}}>
                    <canvas ref={refs} width="400px" height="400px"></canvas>
                </div>
                <p>{props.currentQuestion.question}</p>
                <div>
                    {props.currentQuestion.choices.map(createQuestion)}
                </div>
            </div>
        );
    }
    

}
export default QuizQuesAns;