import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';
import * as mutations from '../../cache/mutations';

function QuizCollectionQuizCard(props) {
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

    const [RemoveQuizFromQuizCollection] = useMutation(mutations.REMOVE_QUIZ_FROM_QUIZ_COLLECTION);

    const removeQuizFromQuizCollection = async () => {
        await RemoveQuizFromQuizCollection({variables: { quizId: props.quiz._id, quizCollectionId: props.quizCollection._id }});
        console.log(props.quiz._id);
        const newQuizzes = props.quizCollection.quizzes.filter(q => q.toString() !== props.quiz._id.toString());
        props.setUpdatedQuizCollection({
            img: props.updatedQuizCollection.img,
            name: props.updatedQuizCollection.name,
            description: props.updatedQuizCollection.description,
            quizzes: newQuizzes
        });
        
        console.log(props.updatedQuizCollection.quizzes);
        console.log(newQuizzes);
        props.refetchData();
    }

    const handleUpClick = () => {
    
    }

    const handleDownClick = () => {

    }

    return (
        <div className="item text-align-center cursor-pointer ui card" onClick={handleClick}>
            <div className="image">
                <img src={quiz && quiz.titleImg}
                    alt="quiz"
                />
            </div>
            <div className="content">
                <div className="description card-text">
                    <div style={{ fontWeight: 'bold' }}> {props.quiz.title} </div>
                    <div> Created by {quizCreator.username} </div>
                    <div> {quizHits} </div>
                    <div> {quiz.description} </div>
                </div>
            </div>
            {
                props.editingMode && 
                <i className="trash icon" style={{ fontSize: '15pt' }}
                    onClick={removeQuizFromQuizCollection}
                />
            }
            {
                props.editingMode && 
                <i className="angle up icon" style={{  fontSize: '15pt' }}
                    onClick={handleUpClick}
                />
            }
            {
                props.editingMode && 
                <i className="angle down icon" style={{  fontSize: '15pt' }}
                    onClick={handleDownClick}
                />
            }
        </div>
    );
}

export default QuizCollectionQuizCard;