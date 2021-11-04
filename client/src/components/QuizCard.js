import React from 'react';
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

function QuizCard(props) {
    const history = useHistory();

    const { quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quiz._id
        }
    });

    var quiz = {};
    var title = "";
    if (quizData) { 
		quiz = quizData.getQuizById;
        title = props.quiz.title;
    }

    const { creatorData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.quiz.creator
        }
    });

    var creatorname = "";
    if(creatorData){
        creatorname = creatorData.findUserById.username
    }

    const handleClick = () => {
        history.push("/quiz/" + props.quiz._id);
    }

    return (
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
                <img className="card-image ui avatar image"
                    src="https://d3ftabzjnxfdg6.cloudfront.net/app/uploads/2021/02/19-07-13_8644-BB-web-1024x585.jpg"
                    alt="quiz"
                />
                <br/>
                <br/>
                <div className="header">
                    {props.quiz.title}
                </div>
                <div>
                    {creatorname}
                </div>
                <br/>
        </div>
    );
    
    (
        
        <div className="item text-align-center cursor-pointer" onClick={handleClick}>
            <img className="card-image platform-circle ui avatar image"
                src={platform.platformImg}
                alt="platform"
            />
            <br/>
            <br/>
            <div className="header">{props.platform.name}</div>
            <br/>
            <div className="header"> {followerCount} followers</div>
        </div>    
    );
}

export default QuizCard;