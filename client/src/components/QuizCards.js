import React from 'react';

import QuizCard from './QuizCard';

function QuizCards(props) {  
    return (
        <div className="ui very relaxed horizontal list medium">
            {
                props.quizzes.map((entry, index) => (
                    <QuizCard
                        quiz={entry} key={index} user={props.user}
                        profile={props.profile} activeTab={props.activeTab} editingMode={props.editingMode}
                    />
                ))
            }
        </div>
    );
}

export default QuizCards;