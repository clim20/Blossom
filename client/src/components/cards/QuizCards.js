import React from 'react';

import QuizCard from './QuizCard';

const QuizCards = (props) => {  
    const quizCardClass = props.activeTab ? "ui three cards stackable" : "ui four cards stackable";

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