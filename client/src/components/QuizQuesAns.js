import React, {useRef, useEffect } from "react";

const QuizQuesAns = (props) => {
    const refs = useRef(null);
    const ctx = useRef(null);

    useEffect(() =>{
        refs.current.width = 996;
        refs.current.height = 496;
        refs.current.style.width = `996px`;
        refs.current.style.height =  `496px`;
        ctx.current  = refs.current.getContext("2d")
        ctx.current.scale(1, 1);
        ctx.current.fillStyle="white"
        ctx.current.fillRect(0,0,996,496)
    }, []);

    const nextQuestion = () =>{
        props.handleSetQuestionNumber();
        props.handleSetShowAnswer();
    }

    const createQuestion = (choice, index) =>{
        return(
            <button onClick = {() => answerQuestion(index === props.currentQuestion.answer)}>{choice}</button>
        );
    };

    const answerQuestion = (isCorrect) =>{
        props.handleSetShowAnswer();
        props.handleAnswerOptionsClick(isCorrect)
    };

    var imagechoice = "";
        if (props.showAnswer === true) {
            imagechoice = props.currentQuestion.answerImg;
        } else {
            imagechoice = props.currentQuestion.questionImg;
        }
        if (imagechoice !== ""){
            var imagedata = new Image();
            imagedata.onload = function() {
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = imagechoice;
        } else if (refs.current) {
            ctx.current  = refs.current.getContext("2d")
            ctx.current.scale(1, 1);
            ctx.current.fillStyle="white"
            ctx.current.fillRect(0,0,996,496)
        }

    if (props.showAnswer === true) {
        return( 
            <div>
                <div style={{position: 'reletive'}}>
                    <canvas ref={refs} width="1000px" height="500px"></canvas>
                </div>
                <button onClick = {() => nextQuestion()}>
                    <h>Correct Answer: {String.fromCharCode('A'.charCodeAt(0)+props.currentQuestion.answer)}</h>
                    <br></br>
                    <h>{props.score} pts</h>
                    <br></br>
                    <p>{props.currentQuestion.answerExplanation}</p>
                </button>
            </div>
        );
    }else{
        return (
            <div>
                <div style={{position: 'reletive'}}>
                    <canvas ref={refs} width="1000px" height="500px"></canvas>
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