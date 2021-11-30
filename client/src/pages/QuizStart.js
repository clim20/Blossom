import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import QuizQuesAns from '../components/QuizQuesAns'
import QuizEnd from './QuizEnd';

const QuizStart = (props) => {

    //console.log(props.highestScores)
    let maxtime = 10
    const [questionNumber, setQuestionNumber] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [questionScore, setQuestionScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [numOfCorrect, setNumofCorrect] = useState(0);
    const [timer, setTimer] = useState(maxtime);
    const [timerActive, setTimerActive] = useState(true);
    
    const [UpdateQuiz] = useMutation(mutations.UPDATE_QUIZ);
   
    const saveScore = async () =>{
        let temp = JSON.parse(JSON.stringify(props.currentQuiz));
        
        var badgeArr = [];
        for(let i = 0; i < temp.badges.length; i++){
            let insert = {
                "rank": temp.badges[i].rank,
                "image": temp.badges[i].image
                
            }
            
            badgeArr.push(insert)
            console.log(badgeArr)
        }

        

        var scoreArr = [];
        for(let i = 0; i < temp.scores.length; i++){
            let insert = {
                "user": temp.scores[i].user,
                "userScore": temp.scores[i].userScore,
                "bestScore": temp.scores[i].bestScore,
                "liked": temp.scores[i].liked
                
              }
            
              scoreArr.push(insert)
            //console.log(scoreArr)
        }

        //let tempQuizScores = temp.scores;
        let existingScore = scoreArr.findIndex(({ user }) => user === props.currentUser._id)
        console.log(existingScore)
        let hitmodify = temp.quizHits
        if (existingScore != -1){
            if (scoreArr[existingScore].bestScore < totalScore){
                scoreArr[existingScore].bestScore = totalScore;
            }
        }else{
            hitmodify += 1;
            let i = 0;
            let foundspot = false;
            while(foundspot==false&&i<scoreArr.length){
                if(totalScore>scoreArr[i].userScore){
                    scoreArr.splice(i, 0, 
                        {
                            "user": props.currentUser._id,
                            "userScore": totalScore,
                            "bestScore": totalScore,
                            "liked": 0
                        });
                    foundspot = true
                }
            }

            if (foundspot==false){
                scoreArr.push(
                    {
                        "user": props.currentUser._id,
                        "userScore": totalScore,
                        "bestScore": totalScore,
                        "liked": 0
                    }
                )
            }
        }

        console.log(scoreArr)
        var cardArr = [];
        for(let i = 0; i < temp.cards.length; i++){
            let insert = {
                "cardNum": temp.cards[i].cardNum,
                "question": temp.cards[i].question,
                "choices": temp.cards[i].choices,
                "answer": temp.cards[i].answer,
                "answerExplanation": temp.cards[i].answerExplanation,
                "questionImg": temp.cards[i].questionImg,
                "answerImg": temp.cards[i].answerImg,
                "drawing": temp.cards[i].drawing
              }
            
            cardArr.push(insert)
            //console.log(cardArr)
        }
        
        
        
        
        //console.log(props.currentQuiz._id)
        
        const { data } = await UpdateQuiz({

            variables: { 
                quizId: temp._id, 
                updatedQuiz: {
                   
                    "_id": temp._id,
                    "title": temp.title,
                    "description": temp.description,
                    "titleImg": temp.titleImg,
                    "creator":  temp.creator,
                    "platformId": temp.platformId,
                    "quizHits": hitmodify,
                    "quizLikes": temp.quizLikes,
                    "quizDislikes": temp.quizDislikes,
                    "badges": badgeArr,
                    "scores": scoreArr,
                    "cards": cardArr,
                    "createdAt": temp.createdAt
                  }
            }
        });
        
        console.log(props.currentQuiz.score)

        var savingQuiz = {};
        if (data) { 
            savingQuiz = data.updateQuiz;
        }

        console.log(savingQuiz);

        setTimeout(() => {
            props.refetchQuizData();
        }, 300);
    }

    const handleFinish = () =>{
        console.log("finish called")
        setIsFinished(true);
        saveScore();
    }

    const handleSetQuestionNumber = () =>{
        setQuestionNumber(questionNumber+1);
        setTimerActive(true);
        setTimer(maxtime);

    }

    const handleSetShowAnswer = () =>{
        if(showAnswer){
            setShowAnswer(false);
        }else{
            setShowAnswer(true);
        }
        
    }

    
    const handleAnswerOptionsClick = (isCorrect) => {
        var scored = 50+5*timer;
        setTimerActive(false);
        //setTimer(30);
        if(isCorrect){
            setNumofCorrect(numOfCorrect+1)
            setQuestionScore(scored)
            setTotalScore(totalScore + scored)
        }else{
            setQuestionScore(0)
        }


    };

    

    useEffect(()=>{
        if(!timer){
            setQuestionScore(0);
            setShowAnswer(true);
            return;
        }
        let interval = null;
        //console.log(timer)
        if(timerActive){
            interval = setInterval(() =>{
                setTimer(timer - 1);
            }, 1000);
        }else if (!timerActive){
            clearInterval(interval);

        
        }
        return () => clearInterval(interval);
    }, [timerActive, timer]);

    //console.log(showAnswer)
    
    if(questionNumber == props.currentQuiz.cards.length&&isFinished == false){
        handleFinish();
        
    }

    if(isFinished == true){
        //saveScore();
        //console.log(props.currentQuiz.cards.length)
        return( 
            <QuizEnd score = {totalScore} currentQuiz = {props.currentQuiz } numOfCorrect = {numOfCorrect}></QuizEnd>
        );
    }else{
        //console.log(props.currentQuiz.cards.length)
        return (
            <div>
                <br />
                <h3>{(questionNumber+1)+ " of "+(props.currentQuiz.cards.length)}</h3>
                <h1>
                    <p style={{textAlign:'center'}}>{props.currentQuiz.title}</p>
                </h1>
                <h4>
                    <p style={{textAlign:'center'}}>{"Created by "+props.author}</p>
                </h4>
                
                {timerActive && <h3>{timer}</h3>}
                <div className="each-question">
                    <QuizQuesAns showAnswer={showAnswer} currentQuestion={props.currentQuiz.cards[questionNumber] } score={questionScore} handleSetQuestionNumber={handleSetQuestionNumber}  handleSetShowAnswer={handleSetShowAnswer} handleAnswerOptionsClick={handleAnswerOptionsClick}></QuizQuesAns>
                </div>

                <button className="quiz-finish-button" onClick = {() => handleFinish()}>
                    Finish
                </button>
    
            </div>
        );
    }
    

}
export default QuizStart;