import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';


function QuizCard(props) {
    const history = useHistory();

    const { quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quiz._id
        }
    });

    var quiz = {};
    var title = "";
    if (quizData) { 
		quiz = quizData.getQuizById;
        title = props.quiz.title;
    }

    const { creatorData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.quiz.creator
        }
    });

    var creatorname = "";
    if(creatorData){
        creatorname = creatorData.findUserById.username
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
                    {creatorname}
                </div>
                <br/>
        </div>
    );
    /*
    (
        
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image platform-circle ui avatar image"
                src={platform.platformImg}
                alt="platform"
            />
            <br/>
            <br/>
            <div className="header">{props.platform.name}</div>
            <br/>
            <div className="header"> {followerCount} followers</div>
        </div>    
    );
    */
}

}
export default QuizCard;