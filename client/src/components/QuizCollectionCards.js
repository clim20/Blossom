import React from 'react';

import QuizCollectionCard from './QuizCollectionCard';

function QuizCollectionCards(props) {  
    const quizCollectionCardClass = props.activeTab ? "ui three cards" : "ui five cards";

    return (
        <div>
            <br/>
            <div className={quizCollectionCardClass}>
                {
                    props.quizCollections.map((entry, index) => (
                        <QuizCollectionCard
                            quizCollection={entry} key={index} user={props.user}
                            profile={props.profile} activeTab={props.activeTab} editingMode={props.editingMode}
                            setShowQuizCollectionDeletionModal={props.setShowQuizCollectionDeletionModal} setQuizCollectionName={props.setQuizCollectionName}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default QuizCollectionCards;