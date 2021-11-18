import React from 'react';

import QuizCard from './QuizCard';

const QuizCards = (props) => {  
    const quizCardClass = props.activeTab === 'home' ? "ui three cards doubling stackable grid" : 
        props.activeTab || props.quizzes.length < 4 ? "ui three cards doubling stackable grid container" : "ui four cards doubling stackable grid container";

    return (
        <div>
            <br/>
            <div className={quizCardClass}>
                {
                    props.quizzes.map((entry, index) => (
                        <QuizCard
                            quiz={entry} key={index} user={props.user}
                            activeTab={props.activeTab} editingMode={props.editingMode}
                            featuredQuiz={props.featuredQuiz} setFeaturedQuiz={props.setFeaturedQuiz} 
                            refetchData={props.refetchData}
                        />
                    ))
                }
            </div>
        </div>
        
    );
}

export default QuizCards;