import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';
import { selectionSetMatchesResult } from '@apollo/react-hooks/node_modules/@apollo/client/cache/inmemory/helpers';

const Quest = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    //const params = useParams();
    //const profileId = params ? params.profileId : 'could not get params';
    

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

    var profileId = userObject.profileId;

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: profileId
        }
    });

    var profileObject = {};
    var quizzes = [];
    if (profileData) { 
		profileObject = profileData.findProfileById;
        quizzes = profileObject.quizzes;
    }

    const [disabled1, setDisable1] = useState(false);
    const [disabled2, setDisable2] = useState(false);
    const [disabled3, setDisable3] = useState(false);
    const [disabled4, setDisable4] = useState(false);
    const [disabled5, setDisable5] = useState(false);
    const [disabled6, setDisable6] = useState(false);

    /*let count = 0;
    for (const obj of quizzes) {
        if (obj.status === '0') count++;
    }*/
    //console.log(quizzes.length);
    
    /*if(quizzes.length > 0) {
        setDisable5(true); //create first quiz 
        if(quizzes.length > 9) {
            setDisable4(true); //create 10 quizzes
        }
    }*/

    return (
        user && <div>
            <h2 className="quests">
                Quests
            </h2>
            <div className="quests-rectangle">
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Be 1st place on the leaderboard once!
                    {(disabled1) ? <span className="completeBox1">Completed</span> :
                    <span className="checkBox1">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maintain 1st place on a leaderboard for a week!
                    {(disabled2) ? <span className="completeBox2">Completed</span> :
                    <span className="checkBox2">Incomplete</span> }
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 100 people take one of your quiz.
                    {(disabled3) ? <span className="completeBox3">Completed</span> :
                    <span className="checkBox3">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make 10 Quizzes!
                    {(disabled4) ? <span className="completeBox4">Completed</span> :
                    <span className="checkBox4">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make your first quiz!
                    {(disabled5) ? <span className="completeBox5">Completed</span> :
                    <span className="checkBox5">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take your first quiz!
                    {(disabled6) ? <span className="completeBox6">Completed</span> :
                    <span className="checkBox6">Incomplete</span>}
                </h2>
            </div>
        </div>
    );
}
export default Quest;