import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';

const Quest = () => {

    return (
        <div>
            <MenuBar/>
            <div className="quests">
                Quests
            </div>
            <div className="quests-rectangle">
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Be 1st place on the leaderboard once!
                    <span className="checkBox1">Incomplete</span>
                </p>
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maintain 1st place on a leaderboard for a week!
                    <span className="checkBox2">Incomplete</span>
                </p>
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 100 people take one of your quiz.
                    <span className="checkBox3">Incomplete</span>
                </p>
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make 10 Quizzes!
                    <span className="checkBox4">Incomplete</span>
                </p>
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make your first quiz!
                    <span className="checkBox5">Incomplete</span>
                </p>
                    <br />
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take you first quiz!
                    <span className="checkBox6">Incomplete</span>
                </p>
            </div>
        </div>
    );
}
export default Quest;