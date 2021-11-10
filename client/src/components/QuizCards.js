import React from 'react';

import QuizCard from './QuizCard';

const QuizCards = (props) => {  
    return (
        <div className="ui very relaxed horizontal list medium">
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
    );
}

export default QuizCards;