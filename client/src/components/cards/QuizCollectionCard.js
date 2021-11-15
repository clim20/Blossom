import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

function QuizCollectionCard(props) {
    const history = useHistory();

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.quizCollection ? props.quizCollection.creator : ''
        }
    });

    var quizCollectionCreator = {};
    if(userData){
        quizCollectionCreator = userData.findUserById;
    }

    const { data } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_ID, {
        variables: {
            id: props.quizCollection ? props.quizCollection._id : ''
        }
    });

    var quizCollection = {};
    var quizzesCount = 0;
    if (data) { 
		quizCollection = data.findQuizCollectionById;
        quizzesCount = props.quizCollection.quizzes.length;
    }

    const handleClick = () => {
        if(!props.editingMode) {
            history.push("/quizCollection/" + props.quizCollection._id);
        }
    }

    const handleXClick = () => {
        props.setQuizCollectionName(quizCollection._id);
        if (!props.platform) {
            props.setShowQuizCollectionDeletionModal(true);
        } else {
            props.setShowQuizCollectionRemovalModal(true);
        }
    }

    const onQuizCollectionTab = props.activeTab === "quizCollections";
    
    return (
        <div className="item text-align-center cursor-pointer ui card" onClick={handleClick}>
            <div className="content">
                <div className="description">
                    {
                        onQuizCollectionTab && props.editingMode && 
                        <i className="times icon" style={{ position: 'absolute', top: '8px', right: '15px', color: 'var(--cancelRed)', fontSize: '15pt' }}
                            onClick={handleXClick}
                        />
                    }
                    <img width='200px' height='120px'
                        src="https://www.samoyed-dogs.net/wp-content/uploads/2020/08/poup-e1617474219921.png"
                        alt="quizCollection"
                    />
                    <br/>
                    <br/>
                    <div className="card-text"> {props.quizCollection && props.quizCollection.name} </div>
                    <div> Created by {quizCollectionCreator && quizCollectionCreator.username} </div>
                    <div> {quizCollection && quizzesCount} </div>
                </div>
            </div>
        </div>   
    );
}

export default QuizCollectionCard;