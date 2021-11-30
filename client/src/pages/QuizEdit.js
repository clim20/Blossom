import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import EditQuestion from '../components/EditQuestion';
import EditAnswer from '../components/EditAnswer';
import TableOfContents from '../components/TableOfContents'



const QuizEdit = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const params = useParams();
    const quizId = params ? params.quizId : 'could not get params';

    const { data: quizData, refetch: refetchQuizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
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
    const [selectedCard, setSelectedCard] = useState(-1);
    const [initTemp, setInitTemp] = useState(true);

    const [mode,setMode] = useState('draw');
    const [lineWidth, setLineWidth] = useState(10);
    const [penColor, setPenColor] = useState("#000000")

    const [UpdateQuiz] = useMutation(mutations.UPDATE_QUIZ);

    if(initTemp && quizData){
        setTempQuiz(originalQuiz)
        setInitTemp(false)
    }
    
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
                "bestScore": tempQuiz.scores[i].bestScore,
                "liked": tempQuiz.scores[i].liked
                
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
            refetchQuizData();
            history.push("/quiz/" + quizId);
            //window.location.reload(false);
            
        }, 300);
        

        
    }

    const handleCancel = () =>{
        history.push("/quiz/" + quizId);
    }

    const draw =(e)=> { //response to Draw button click 
        setMode('draw');
    }

    const erase =() => { //response to Erase button click
        setMode('erase');
    }

    const penSizeUp = () =>{ //increase pen size button clicked
        setLineWidth(lineWidth + 5);
    }

    const penSizeDown = () => {//decrease pen size button clicked
        setLineWidth(lineWidth - 5);
    }

    
    const setColor = (e) =>{ //a color button was clicked
        setPenColor(e.target.value)
    }

    const resetCanvas = () =>{
        setMode('draw')
        setLineWidth(10);
        setPenColor("#000000");
    }

    if(initTemp == false && isCreator){
        return (
            <div>
                <TableOfContents tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz} setSelectedCard = {setSelectedCard}/>

                <div>
                    <button onClick={(e)=>draw(e)} >Draw</button>
                    <button onClick={(e)=>erase(e)} >Erase</button>
                    <button onClick={(e)=>penSizeUp()} >Pen Size +</button>
                    <button onClick={(e)=>penSizeDown()} >Pen Size -</button>
                    <input type = "color" id="brushcolor" name="brushcolor" onChange={(e)=>setColor(e)}></input>
                </div>
                <div>
                    <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)}/>
                    <div>
                        <EditQuestion tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz} mode={mode} lineWidth={lineWidth} penColor={penColor} reset ={resetCanvas} />
                        <EditAnswer tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz} mode={mode} lineWidth={lineWidth} penColor={penColor} reset ={resetCanvas}/>
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
                QuizEdit Page
                
            </div>
        );
    }

    
}
export default QuizEdit;