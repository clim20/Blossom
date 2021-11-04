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
                <span className="quest-lists">
                    Be 1st place on the leaderboard once!
                    <span className="checkBox">Incomplete</span>
                    <br />
                    <br />
                    Maintain 1st place on a leaderboard for a week!
                    <span className="checkBox">Incomplete</span>
                    <br />
                    <br />
                    Have 100 people take one of your quiz.
                    <span className="checkBox">Incomplete</span>
                    <br />
                    <br />
                    Make 10 Quizzes!
                    <span className="checkBox">Incomplete</span>
                    <br />
                    <br />
                    Make your first quiz!
                    <span className="checkBox">Incomplete</span>
                    <br />
                    <br />
                    Take you first quiz!
                    <span className="checkBox">Incomplete</span>
                </span>
            </div>
        </div>
    );
}
export default Quest;