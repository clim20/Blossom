import React from 'react';
import DrawComp from './DrawComp';

function EditAnswer(props) {
    var currentCard = null
    if(props.selectedCard !== -1){
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
    }
    
    if(currentCard){
        var ansIndex = currentCard.answer
        var ansExplanation = currentCard.answerExplanation
        return(
            <div className="question-card">
                <DrawComp mode={props.mode} lineWidth={props.lineWidth} penColor={props.penColor} reset={props.reset} lastSave={currentCard.answerImg} save={handleDrawChange}></DrawComp>
                <div style={{'position': 'absolute', 'top' : '110%'}}>
                    {displayAnsChoice(ansIndex)}
                    <textarea className="quizdescription" value={ansExplanation} onChange={(e) => handleAnsChange(e.target.value)} style={{'height':'100px'}}/>
                </div>
            </div>
        )
    }else{
        var description = props.tempQuiz.description
        return(
            <div className="answer-card" style={{'border':'0'}}>
                <textarea className="quizdescription" value={description} onChange={(e) => handleDesChange(e.target.value)}/>
                <div style={{'height' : '30px'}}>
                </div>
            </div>
            
        );
    }
}

export default EditAnswer;