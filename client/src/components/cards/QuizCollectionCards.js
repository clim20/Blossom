import React from 'react';

import QuizCollectionCard from './QuizCollectionCard';

function QuizCollectionCards(props) {  
    const quizCollectionCardClass = props.activeTab ? "ui three cards stackable" : "ui five cards stackable";

    return (
        <div>
            <br/>
            <div className={quizCollectionCardClass}>
                {
                    props.quizCollections.map((entry, index) => (
                        <QuizCollectionCard
                            quizCollection={entry} key={index} user={props.user}
                            profile={props.profile} platform={props.platform} activeTab={props.activeTab} editingMode={props.editingMode}
                            setShowQuizCollectionDeletionModal={props.setShowQuizCollectionDeletionModal} setQuizCollectionName={props.setQuizCollectionName}
                            setShowQuizCollectionRemovalModal={props.setShowQuizCollectionRemovalModal}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default QuizCollectionCards;