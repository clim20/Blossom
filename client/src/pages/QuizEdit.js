import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';


import MenuBar from '../components/MenuBar';
import EditQuestion from '../components/EditQuestion';
import EditAnswer from '../components/EditAnswer';
import TableOfContents from '../components/TableOfContents'



const QuizEdit = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const params = useParams();
    const quizId = params ? params.quizId : 'could not get params';

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: quizId
        }
    });

    let originalQuiz = {};
    if (quizData) { 
		originalQuiz = quizData.findQuizById;
    }

    const { data: creatorData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: originalQuiz.creator
        }
    });

    let creator = {};
    if(creatorData) {
        creator = creatorData.findUserById;
    }

    var isCreator = creator && user && creator._id === user._id
    const [tempQuiz, setTempQuiz] = useState(
        {
            
        }
    );
    const [selectedCard, setSelectedCard] = useState(0);
    const [initTemp, setInitTemp] = useState(true);

    const [UpdateQuiz] = useMutation(mutations.UPDATE_QUIZ);

    if(initTemp && quizData){
        setTempQuiz(originalQuiz)
        setInitTemp(false)
    }



    console.log(originalQuiz)
    console.log(tempQuiz)
    console.log(initTemp)
    
    var title = tempQuiz.title

    const handleTitleChange = event =>{
        let change = JSON.parse(JSON.stringify(tempQuiz));
        change.title = event;
        setTempQuiz(change);
    }

    const handleSave = async () =>{
        //console.log(JSON.parse(JSON.stringify(tempQuiz)));
        console.log(tempQuiz.cards)
        var badgeArr = [];
        for(let i = 0; i < tempQuiz.badges.length; i++){
            let insert = {
                "rank": tempQuiz.badges[i].rank,
                "image": tempQuiz.badges[i].image
                
            }
            
            badgeArr.push(insert)
            console.log(badgeArr)
        }

        var scoreArr = [];
        for(let i = 0; i < tempQuiz.scores.length; i++){
            let insert = {
                "user": tempQuiz.scores[i].user,
                "userScore": tempQuiz.scores[i].userScore,
                "bestScore": tempQuiz.scores[i].bestScore
                
              }
            
              scoreArr.push(insert)
            console.log(scoreArr)
        }

        var cardArr = [];
        for(let i = 0; i < tempQuiz.cards.length; i++){
            let insert = {
                "cardNum": tempQuiz.cards[i].cardNum,
                "question": tempQuiz.cards[i].question,
                "choices": tempQuiz.cards[i].choices,
                "answer": tempQuiz.cards[i].answer,
                "answerExplanation": tempQuiz.cards[i].answerExplanation,
                "questionImg": tempQuiz.cards[i].questionImg,
                "answerImg": tempQuiz.cards[i].answerImg,
                "drawing": tempQuiz.cards[i].drawing
              }
            
            cardArr.push(insert)
            console.log(cardArr)
        }
        const { data } = await UpdateQuiz({
            variables: { 
                quizId: quizId, 
                updatedQuiz: {
                    /*
                    "_id": tempQuiz._id,
                    "title": tempQuiz.title,
                    "description": tempQuiz.description,
                    "titleImg": tempQuiz.titleImg,
                    "creator": tempQuiz.creator,
                    "platformId": tempQuiz.platformId,
                    "quizHits": tempQuiz.quizHits,
                    "quizLikes": tempQuiz.quizLikes,
                    "quizDislikes": tempQuiz.quizDislikes,
                    "badges": tempQuiz.badges,
                    "scores": tempQuiz.scores,
                    "cards": tempQuiz.cards,
                    "createdAt": tempQuiz.createdAt
                    */
                    "_id": tempQuiz._id,
                    "title": tempQuiz.title,
                    "description": tempQuiz.description,
                    "titleImg": tempQuiz.titleImg,
                    "creator":  tempQuiz.creator,
                    "platformId": tempQuiz.platformId,
                    "quizHits": tempQuiz.quizHits,
                    "quizLikes": tempQuiz.quizLikes,
                    "quizDislikes": tempQuiz.quizDislikes,
                    "badges": badgeArr,
                    "scores": scoreArr,
                    "cards": cardArr,
                    "createdAt": tempQuiz.createdAt
                  }
            }
        });
        console.log(data)
        
        
        var savingQuiz = {};
        if (data) { 
            savingQuiz = data.updateQuiz;
        }

        console.log(savingQuiz);

        setTimeout(() => {
            
            history.push("/quiz/" + quizId);
            window.location.reload(false);
            
        }, 300);
        

        
    }

    const handleCancel = () =>{
        history.push("/quiz/" + quizId);
    }
    if(initTemp == false && isCreator){
        return (
            <div>
                <MenuBar/>
                <TableOfContents tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz} setSelectedCard = {setSelectedCard}/>
                <div>
                    <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)}/>
                    <div>
                        <EditQuestion tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz}/>
                        <EditAnswer tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz}/>
                    </div>
                    <div>
                        <button onClick = {() => handleSave()}>
                            Save
                        </button>
                        <button onClick = {() => handleCancel()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div>
                <MenuBar/>
                QuizEdit Page
                
            </div>
        );
    }

    
}
export default QuizEdit;