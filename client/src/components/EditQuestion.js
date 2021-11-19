import React from 'react';
import DrawComp from './DrawComp';

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

    //console.log(currentCard)
    
    //var quesTxt = "props.currentCard.question"
    if(currentCard){
        var quesTxt = currentCard.question
        return(
            <div>
                <DrawComp mode={props.mode} lineWidth={props.lineWidth} penColor={props.penColor} reset={props.reset} lastSave={currentCard.questionImg} save={handleDrawChange}></DrawComp>
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