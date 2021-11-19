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

    const [updatedQuizzes, setUpdatedQuizzes] = useState({
        quizzes: props.updatedQuizCollection.quizzes
    });

    const handleSave = (quizzes) => {
        props.setUpdatedQuizCollection({
            img: props.updatedQuizCollection.img,
            name: props.updatedQuizCollection.name,
            description: props.updatedQuizCollection.description,
            quizzes: quizzes
        });
    }

    const [RemoveQuizFromQuizCollection] = useMutation(mutations.REMOVE_QUIZ_FROM_QUIZ_COLLECTION);

    const removeQuizFromQuizCollection = async () => {
        await RemoveQuizFromQuizCollection({variables: { quizId: props.quiz._id, quizCollectionId: props.quizCollection._id }});
        const newQuizzes = props.updatedQuizCollection.quizzes.filter(q => q.toString() !== props.quiz._id.toString());
        // setUpdatedQuizzes({
        //     quizzes: newQuizzes
        // });

        handleSave(newQuizzes);
    }

    const handleUpClick = () => {
        console.log('HANDLE UP CLICK');
    }

    const handleDownClick = () => {
        console.log("HANDLE DOWN CLICK");
    }

    useEffect(() => {
        console.log(updatedQuizzes.quizzes);
      }, [updatedQuizzes])

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
        </div>
    );
}

export default QuizCollectionQuizCard;