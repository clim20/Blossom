import React, { useEffect, useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';

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
    if (data) {
        quizCreator = data.findUserById;
    }

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quiz._id
        }
    });

    var quiz = {};
    var quizHits = 0;
    if (quizData) {
        quiz = quizData.findQuizById;
        quizHits = props.quiz.quizHits !== 1 ? props.quiz.quizHits + ' Quiz Hits' : props.quiz.quizHits + ' Quiz Hit';
    }

    const handleClick = () => {
        if (!props.editingMode) {
            history.push("/quiz/" + props.quiz._id);
        }
    }

    const [updatedQuizzes, setUpdatedQuizzes] = useState(props.updatedQuizCollection.quizzes);

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
        setUpdatedQuizzes(newQuizzes);
        handleSave(newQuizzes);
    }

    useEffect(() => {
        console.log(updatedQuizzes);
      }, [updatedQuizzes])

    return (
        <div>
            <div className="ui fluid card" style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={handleClick}>
                <div className="content">
                    <Grid verticalAlign="middle">
                        <Grid.Column width={4} style={{ textAlign: 'center' }}>
                            <Image src={quiz.titleImg}/>
                        </Grid.Column>

                        <Grid.Column width={11}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}> {props.quiz.title} </div>
                                <div> {quizHits} </div>
                                <div> Created by {quizCreator.username} </div>
                                <div> {quiz.description} </div>
                            </div>
                        </Grid.Column>    

                        <Grid.Column width={1}>
                            {
                                props.editingMode && 
                                <i className="trash icon" style={{ fontSize: '15pt', cursor: 'pointer' }}
                                    onClick={removeQuizFromQuizCollection}
                                />
                            }
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default QuizCollectionQuizCard;