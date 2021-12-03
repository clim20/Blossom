import React, {useRef, useState, useEffect } from "react";
import DrawComp from './DrawComp';


import { useMutation, useQuery } from '@apollo/react-hooks';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';


function EditQuestion(props) {
    //tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz}
    var currentCard = null
    if(props.selectedCard!=-1){
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
            if(change.cards[props.selectedCard].answer == index){
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
        console.log(change)
    }

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [testarr, setTestarr] = useState([])
    const [uploadBlock, setUploadBlock] = useState(false)

    const [CreateImage] = useMutation(mutations.CREATE_DRAWING);
    
        
    const  addDrawingtoArr = async (url) =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        const { data: newDrawing } =  await CreateImage({
            variables: { 
                image: url, 
                rotation: 0, 
                position: [0,0], 
                sizein: [10, 10]
            }
        });

        var returnedDrawing = {};
        console.log(newDrawing)
        if (newDrawing) { 
            returnedDrawing = newDrawing.createDrawing;
            //console.log(newDrawing);
            //console.log(returnedDrawing);
            change.cards[props.selectedCard].drawing.push(returnedDrawing._id);
            console.log(change);
            props.setTempQuiz(change);
            
        }
    } 

    const uploadImage = async () => {
        
        //const imagearr = JSON.parse(JSON.stringify(props.tempQuiz.cards[props.selectedCard].drawing));
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
            setUrl(data.url)
            addDrawingtoArr(data.url)
        })
        .catch(err => {
            console.log(err);
        })

        
        //console.log(testarr)
        console.log("image uploaded")
        setUploadBlock(false)
    }

    const uploadBtn =()=>{
        if(uploadBlock==false){
            setUploadBlock(true)
            uploadImage()
        }
        
    }
    //profile ? profile.quizzes : []
    //console.log(currentCard.drawing)
    const { data: drawingData, refetch: refetchDrawingData } = useQuery(queries.FIND_DRAWINGS_BY_IDS, {
        variables: {
            ids: currentCard ? currentCard.drawing : []
        }
    });

    var drawingarr = [];
   
    if (drawingData) { 
        console.log(drawingData)
		drawingarr = drawingData.findDrawingsByIds;
        console.log(drawingarr)
    }


    const displayChoices = (choice, index) =>{
        //String.fromCharCode(c.charCodeAt(0) + 1);
        let x = 'A'
        x = String.fromCharCode(x.charCodeAt(0) + index);
        if (props.tempQuiz.cards[props.selectedCard].answer == index){
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

    const displayImages = (drawing) =>{

        return (<img src={drawing.img}/>)
    }

    //console.log(currentCard)
    
    //var quesTxt = "props.currentCard.question"
    
    if(currentCard){
        var quesTxt = currentCard.question
        return(
            <div>
                <input type="file"  accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])}/>
                <button onClick={uploadBtn}> Upload </button>
                <DrawComp mode={props.mode} lineWidth={props.lineWidth} penColor={props.penColor} reset={props.reset} lastSave={currentCard.questionImg} save={handleDrawChange}></DrawComp>
                {drawingarr.map(drawing => displayImages(drawing))}
                <input type="text" value={quesTxt} onChange={(e) => handleQuesChange(e.target.value)}/>
                <div>
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
            <div>TitleImgPlaceHolder</div>
        );
       
    }
    
}

export default EditQuestion;