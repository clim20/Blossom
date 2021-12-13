import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

function QuizCollectionEntry(props) {

    var checkQuizStatus = false;
    if (props.quizCollection) {
        for (let i = 0; i < props.quizCollection.quizzes.length; i++) {
            if (props.quizCollection.quizzes[i].toString() === props.currentQuiz._id.toString()) {
                checkQuizStatus = true;
                break;
            }
            else {
                checkQuizStatus = false;
            }
        }
    }

    const [hasQuiz, setHasQuiz] = useState(checkQuizStatus);

    const handleClick = () => {
        if (!hasQuiz){
            props.addQuizToQuizCollection(props.quizCollection._id);
            setHasQuiz(true);
        }
        else {
            props.removeQuizFromQuizCollection(props.quizCollection._id);
            setHasQuiz(false);
        }
        props.refetchQuizCollectionsData();
    }

    return (
        <Dropdown.Item>
            <div className="ui checkbox">
                <input type="checkbox" onChange={handleClick} checked={hasQuiz}/>
                <label>{props.quizCollection.name}</label>
            </div>
        </Dropdown.Item>
    );
}

export default QuizCollectionEntry;