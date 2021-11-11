import React from 'react';

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

    

    //console.log(currentCard)
    var ansIndex = currentCard.answer
    var ansExplanation = currentCard.answerExplanation
    //var quesTxt = "props.currentCard.question"
    if(currentCard){
        return(
            <div>
                {displayAnsChoice(ansIndex)}
                <input type="text" value={ansExplanation} onChange={(e) => handleAnsChange(e.target.value)}/>
                
            </div>
        )
    }else{

    }
    
}

export default EditAnswer;