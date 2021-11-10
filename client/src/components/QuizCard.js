import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

function QuizCard(props) {
    const history = useHistory();
    
    const { data } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.quiz.creator
        }
    });

    var quizCreator = {};
    if(data){
        quizCreator = data.findUserById;
    }

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quiz._id
        }
    });

    var quiz = {};
    var quizHits = 0;
    if(quizData){
        quiz = quizData.findQuizById;
        quizHits = props.quiz.quizHits !== 1 ? props.quiz.quizHits + ' Quiz Hits' : props.quiz.quizHits + ' Quiz Hit';
    }

    const handleClick = () => {
        if(!props.editingMode) {
            history.push("/quiz/" + props.quiz._id);
        }
    }

    const handleStarClick = () => {
        if (props.featuredQuiz !== quiz._id) {
            props.setFeaturedQuiz(quiz._id);
        } else {
            props.setFeaturedQuiz(null);
        }
        props.refetchData();
    }

    const onQuizzesTab = props.activeTab === "quizzes";
    const starClass = props.featuredQuiz === quiz._id ? 'star icon featured' : 'star icon unfeatured';

    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
                <img width='200px' height='120px'
                    src="https://d3ftabzjnxfdg6.cloudfront.net/app/uploads/2021/02/19-07-13_8644-BB-web-1024x585.jpg"
                    alt="quiz"
                />
                {
                    onQuizzesTab && props.editingMode && props.quiz.creator === props.user._id && 
                    <i class={starClass} onClick={handleStarClick}/>
                }
                <br/>
                <br/>
                <div className="header">
                    {props.quiz.title}
                </div>
                <div>
                    Created by {quizCreator.username}
                </div>
                <div>
                    {quizHits} Quiz Hits
                </div>
                <br/>
        </div>
    );
}

export default QuizCard;