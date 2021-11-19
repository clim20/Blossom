import React from 'react';
import DrawComp from './DrawComp';

function EditAnswer(props) {
    //tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz}
    var currentCard = null
    if(props.selectedCard!=-1){
        currentCard = props.tempQuiz.cards[props.selectedCard]
    }

    const handleAnsChange = event =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.cards[props.selectedCard].answerExplanation = event;
        props.setTempQuiz(change);
    }

    const displayAnsChoice = (index) =>{
        let x = 'A'
        x = String.fromCharCode(x.charCodeAt(0) + index);
        return(
            <h>{"Correct Answer: "+x}</h>
        );
    }

    const handleDesChange = event =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
        change.description = event;
        props.setTempQuiz(change);
    }


    const handleDrawChange = drawing =>{
        let change = JSON.parse(JSON.stringify(props.tempQuiz));
       
        change.cards[props.selectedCard].answerImg = drawing;
        props.setTempQuiz(change);
        console.log(change)
    }
    

    //console.log(currentCard)
    
    //var quesTxt = "props.currentCard.question"
    if(currentCard){
        var ansIndex = currentCard.answer
        var ansExplanation = currentCard.answerExplanation
        return(
            <div>
                <DrawComp mode={props.mode} lineWidth={props.lineWidth} penColor={props.penColor} reset={props.reset} lastSave={currentCard.answerImg} save={handleDrawChange}></DrawComp>
                {displayAnsChoice(ansIndex)}
                <input type="text" value={ansExplanation} onChange={(e) => handleAnsChange(e.target.value)}/>
                
            </div>
        )
    }else{
        var description = props.tempQuiz.description
        return(
            <input type="text" value={description} onChange={(e) => handleDesChange(e.target.value)}/>
        );
    }
    
}

export default EditAnswer;