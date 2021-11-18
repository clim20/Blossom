import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Button, Input, Dropdown, Icon } from 'semantic-ui-react';

import * as queries from '../cache/queries';

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
        console.log(props.quizCollection.name);
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