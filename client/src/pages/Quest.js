import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Quest = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    //const params = useParams();
    //const userId = params ? params._id : 'could not get params';
    

    if (!user) {
        history.push("/");
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

    var userQuizzes = {};
    if(userObject) {
        userQuizzes = userObject.quizzes;
    }

   /* const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            quests: user.quests 
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = questDes.isCompleted;
    }*/

    const [disabled1, setDisable1] = useState(false);
    const [disabled2, setDisable2] = useState(false);
    const [disabled3, setDisable3] = useState(false);
    const [disabled4, setDisable4] = useState(false);
    const [disabled5, setDisable5] = useState(false);
    const [disabled6, setDisable6] = useState(false);

    if(userQuizzes) {
        setDisable5(true);
        if(userQuizzes.length > 9) {
            setDisable4(true);
        }
    }

    return (
        user && <div>
            <h2 className="quests">
                Quests
            </h2>
            <div className="quests-rectangle">
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Be 1st place on the leaderboard once!
                    <span className="checkBox1">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maintain 1st place on a leaderboard for a week!
                    <span className="checkBox2">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 100 people take one of your quiz.
                    <span className="checkBox3">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make 10 Quizzes!
                    {disabled4} ? <span className="completeBox4">Complete</span> 
                    :
                    <span className="checkBox4">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make your first quiz!
                    {disabled5} ? <span className="completeBox5">Complete</span>
                    :
                    <span className="checkBox5">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take your first quiz!
                    <span className="checkBox6">Incomplete</span>
                </h2>
            </div>
        </div>
    );
}
export default Quest;