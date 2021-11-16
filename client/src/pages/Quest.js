import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const Quest = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    if (!user) {
        history.push("/");
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user.profileId : ''
        }
    });

    const { data: userObject } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: userData ? userData.quizzes : ''
        }
    });

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
                    <span className="checkBox4">Incomplete</span>
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make your first quiz!
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