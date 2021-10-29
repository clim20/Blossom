import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';
import CreatorCards from '../components/CreatorCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import { UPDATE_SCORE } from '../cache/mutations';

const Home = () => {
    var users = [];

    const { data: usersData } = useQuery(queries.FETCH_POPULAR_USERS);
	if(usersData) { users = usersData.getPopularUsers; }

    const { user } = useContext(AuthContext);

	// const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];

    // const { user } = useContext(AuthContext);
    // const id = user? user.id : '';
    // const { data } = useQuery(queries.FIND_USER_BY_ID, {
    //     variables: {
    //         id: id
    //     }
    // });

    // var currentUser = {};
    // if (data) { 
	// 	currentUser = data.findUserById;
    // }

    // const previousScores = currentUser && currentUser.scores ? currentUser.scores : [];
    // const lastAttempt = previousScores && previousScores.length > 0 ? previousScores.at(-1) : 0;
    // const bestAttempt = previousScores && previousScores.length > 0 ? Math.max(...previousScores) : 0;

    // const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [score, setScore] = useState(0);
    // const [showAnswer, setShowAnswer] = useState(false);
    // const [showScore, setShowScore] = useState(false);

    // const [updateScore] = useMutation(UPDATE_SCORE, {
    //     variables: {
    //         id: id,
    //         score: score
    //     }
    // });

    // const handleAnswer = (answerOption) => {
    //     if (answerOption.isCorrect) {
    //         setScore(score + 1);
    //     }
    //     setShowAnswer(true);
    // };

    // const incrementNextQuestion = () => {
    //     const nextQuestion = currentQuestion + 1;
    //     if (nextQuestion < questions.length) {
    //         setCurrentQuestion(nextQuestion);
    //         setShowAnswer(false);
    //     } else {
    //         setShowScore(true);
    //         if (user) {
    //             updateScore(score);
    //         }
    //     }
    // };

    // const resetQuiz = () => {
    //     setScore(0);
    //     setCurrentQuestion(0);
    //     setShowAnswer(false);
    //     setShowScore(false);
    // }

    // const markup = showAnswer ?  
    //     <>
    //         <div className='question-section'>
    //             <div className='question-count'>
    //                 <span>Question {currentQuestion + 1}</span>/{questions.length}
    //             </div>
    //             <div className='question-text'>{questions[currentQuestion].questionText}</div>
    //         </div>
    //         <div className='answer-section'>
    //             {questions[currentQuestion].answerOptions.map((answerOption, index) => (
    //                 <button 
    //                     onClick={() => incrementNextQuestion()}
    //                     className={answerOption.isCorrect ? 'correct' : 'incorrect'}
    //                     key={index}
    //                 >
    //                     {answerOption.answerText}
    //                 </button>
    //             ))}
    //         </div>
    //     </> : 
    //     <>
    //         <div className='question-section'>
    //             <div className='question-count'>
    //                 <span>Question {currentQuestion + 1}</span>/{questions.length}
    //             </div>
    //             <div className='question-text'>{questions[currentQuestion].questionText}</div>
    //         </div>
    //         <div className='answer-section'>
    //             {questions[currentQuestion].answerOptions.map((answerOption, index) => (
    //                 <button
    //                     onClick={() => handleAnswer(answerOption)}
    //                     key={index}
    //                 >
    //                     {answerOption.answerText}
    //                 </button>
    //             ))}
    //         </div>
    //     </>
    // ;

	return (
        // <>
        //     {user && 
        //         <div style={{ marginBottom: 10 }}>
        //             <div>Previous Attempts: {previousScores.join(", ")}</div>
        //             <div>Best Attempt: {bestAttempt}</div>
        //             <div>Last Attempt: {lastAttempt}</div>
        //         </div>            
        //     }
        //     <div className='app'>
        //         {showScore ? (
        //             <div>
        //                 <div className='score-section'>You scored {score} out of {questions.length}</div>
        //                 <button style={{ display: 'block', marginTop: 20}} onClick={() => resetQuiz()}>
        //                     Retry
        //                 </button>
        //             </div>
        //         ) : (
        //             markup
        //         )}
        //     </div>
        // </>
        <div>
            <MenuBar/>
            {user &&
                <div>
                    <h3 className="ui header">For You</h3>
                    <div className="ui hidden divider"></div>
                </div>
            }

            <h3 className="ui header">Trending</h3>
            <div className="ui hidden divider"></div>
            <h3 className="ui header">Popular Creators</h3>
            {users && <CreatorCards users={users} />}
            <div className="ui hidden divider"></div>
            <h3 className="ui header">Popular Platforms</h3>
        </div>
	);
}

export default Home;