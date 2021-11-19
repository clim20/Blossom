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
        props.saveChanges();
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
        // console.log(updatedQuizzes.quizzes);
        // var newQuizzes = [...updatedQuizzes.quizzes];
        // var temp;
        // if (props.index > 0 && props.index < newQuizzes.length) {
        //     temp = newQuizzes[props.index-1];
        //     newQuizzes.splice(props.index-1, 1);
        //     newQuizzes.splice(props.index, 0, temp);
        //     // setUpdatedQuizzes({
        //     //     quizzes: newQuizzes});
        //     console.log(newQuizzes);
        //     console.log(updatedQuizzes.quizzes);
        // }
        // handleSave(newQuizzes);
    }

    const handleDownClick = () => {
        console.log("HANDLE DOWN CLICK");
        // console.log(updatedQuizzes.quizzes);
        // var newQuizzes = [...updatedQuizzes.quizzes];
        // var temp;
        // if (props.index >= 0 && props.index < newQuizzes.length-1) {
        //     temp = newQuizzes[props.index];
        //     newQuizzes.splice(props.index, 1);
        //     newQuizzes.splice(props.index+1, 0, temp);
        //     // setUpdatedQuizzes({
        //     //     quizzes: newQuizzes});
        //     console.log(newQuizzes);
        //     console.log(updatedQuizzes.quizzes);
        // }
        // handleSave(newQuizzes);
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
            {/* {
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
            } */}
        </div>
    );
}

export default QuizCollectionQuizCard;