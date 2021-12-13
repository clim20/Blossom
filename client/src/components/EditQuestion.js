import React, { useState } from "react";
import DrawComp from './DrawComp';


import { useQuery } from '@apollo/react-hooks';
import * as queries from '../cache/queries';

function EditQuestion(props) {
    var currentCard = null;
    if(props.selectedCard !== -1){
        currentCard = props.tempQuiz.cards[props.selectedCard]
    }

    const handleQuesChange = event =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.cards[props.selectedCard].question = event;
        props.setTempQuiz(change);
    }

    const handleAddChoice = () =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.cards[props.selectedCard].choices.push("Enter Choice Here");
        props.setTempQuiz(change);
    }

    const handleChoiceTxtChange = (event, index) =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.cards[props.selectedCard].choices[index] = event;
        props.setTempQuiz(change);
    }

    const handleDelChoice = (index) =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        if(change.cards[props.selectedCard].choices.length > 1){
            if(change.cards[props.selectedCard].answer === index){
                change.cards[props.selectedCard].answer = 0;
            }else if(change.cards[props.selectedCard].answer > index){
                change.cards[props.selectedCard].answer = change.cards[props.selectedCard].answer - 1
            }
            change.cards[props.selectedCard].choices.splice(index,1);
            props.setTempQuiz(change);
        }
    }

    const handleAnsChange = (index) =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.cards[props.selectedCard].answer = index;
        props.setTempQuiz(change);
    }

    const handleDrawChange = drawing =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
       
        change.cards[props.selectedCard].questionImg = drawing;
        props.setTempQuiz(change);
    }

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [uploadBlock, setUploadBlock] = useState(false)

    const  setTitleImg = async (url) =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.titleImg = url;
        props.setTempQuiz(change);
    }

    const uploadImage = async () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blossom");
        data.append("cloud_name", "blossom-images");
        await fetch("https://api.cloudinary.com/v1_1/blossom-images/image/upload", {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
            setTitleImg(data.url);
        })
        .catch(err => {
            console.log(err);
        })

        setUploadBlock(false)
    }

    const uploadBtn =()=>{
        if(uploadBlock === false){
            setUploadBlock(true)
            uploadImage()
        }
    }

    const { data: drawingData } = useQuery(queries.FIND_DRAWINGS_BY_IDS, {
        variables: {
            ids: currentCard ? currentCard.drawing : []
        }
    });

    const displayChoices = (choice, index) =>{
        let x = 'A'
        x = String.fromCharCode(x.charCodeAt(0) + index);
        if (props.tempQuiz.cards[props.selectedCard].answer === index){
            return(
                <tr>
                    <th>
                        <button onClick = {() => handleDelChoice(index)}>x</button>
                    </th>
                    <th>
                        <button onClick = {() => handleAnsChange(index)} style={{"background-color": "#4CAF50"}}>{x}</button>
                    </th>
                    <th>
                        <input type="text" value={choice} onChange={(e) => handleChoiceTxtChange(e.target.value,index)}/>
                    </th>
                </tr>
            )
        }

        return(
            <tr>
                <th>
                    <button onClick = {() => handleDelChoice(index)}>x</button>
                </th>
                <th>
                    <button onClick = {() => handleAnsChange(index)}>{x}</button>
                </th>
                <th>
                    <input type="text" value={choice} onChange={(e) => handleChoiceTxtChange(e.target.value,index)}/>
                </th>
            </tr>
        )
        
    };
    
    if(currentCard){
        var quesTxt = currentCard.question
        return(
            <div className="answer-card" style={{'top':'900px'}}>
                
                
                <DrawComp mode={props.mode} lineWidth={props.lineWidth} penColor={props.penColor} reset={props.reset} lastSave={currentCard.questionImg} save={handleDrawChange}></DrawComp>
                
                <div style={{'position':'absolute', 'top':'110%'}}>
                    <input type="text" value={quesTxt} onChange={(e) => handleQuesChange(e.target.value)}/>
                    <table>
                        {currentCard.choices.map(displayChoices)}
                        <tr>
                            <th>
                                <button onClick = {() => handleAddChoice()}>+</button>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }else{
        return(

            <div className="question-card">
                <img alt="question card" src={props.tempQuiz.titleImg} style={{'display' : 'block', 'margin-left' : 'auto', 'margin-right' : 'auto', 'width' : '50%', 'maxHeight' : '100%', 'maxWidth' : '100%'}}/>
                <input type="file"  accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} style={{'position':'absolute', 'left' : '11%', 'top':'95%'}}/>
                <button className="drawing_btn" onClick={uploadBtn} style={{'position':'absolute', 'left' : '0%', 'top':'94%'}}> Upload </button>
            </div>
        );
       
    }
    
}

export default EditQuestion;