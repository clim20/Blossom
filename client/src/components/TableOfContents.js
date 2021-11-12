import React from 'react';

function TableOfContents(props) {
    //tempQuiz = {tempQuiz} selectedCard = {selectedCard} setTempQuiz = {setTempQuiz}
   
    var cardsArr =props.tempQuiz.cards

    const handleAddCard = () =>{
        if(props.selectedCard!= -1){
            let change = JSON.parse(JSON.stringify(props.tempQuiz));
            let ins = {
                cardNum: 0,
                question: "Enter Question Here",
                choices: ["Enter Choices Here"],
                answer: 0,
                answerExplanation: "Enter Explenation Here",
                questionImg: "",
                answerImg: "",
                drawing: null
            }
            change.cards.splice(props.selectedCard+1,0,ins );
            
            let i = props.selectedCard+1;
            while(i<change.cards.length){
                change.cards[i].cardNum = i;
                i++;
            }
        

            props.setTempQuiz(change);
        }
        
    }
    const handleDelCard = () =>{
        if(props.selectedCard!= -1){
            let change = JSON.parse(JSON.stringify(props.tempQuiz));
            if(change.cards.length>1){
                change.cards.splice(props.selectedCard,1);
                if(change.cards.length == props.selectedCard){
                    props.setSelectedCard(props.selectedCard-1)
                }else{
                    let i = props.selectedCard;
                    while(i<change.cards.length){
                        change.cards[i].cardNum = i;
                        i++;
                    }
                }

                props.setTempQuiz(change);
            }
        }
    }
    const handleSwapCard = (direction) =>{
        if(props.selectedCard!= -1){
            if(direction == 0&&props.selectedCard<cardsArr.length-1){
            
                let change = JSON.parse(JSON.stringify(props.tempQuiz));
                let temphold = change.cards[props.selectedCard]
                change.cards[props.selectedCard] = change.cards[props.selectedCard+1]
                change.cards[props.selectedCard+1] = temphold
                change.cards[props.selectedCard].cardNum = props.selectedCard
                change.cards[props.selectedCard+1].cardNum = props.selectedCard+1
                
                props.setTempQuiz(change);
                props.setSelectedCard(props.selectedCard+1)
    
            }else if(direction == 1 && props.selectedCard > 0){
                let change = JSON.parse(JSON.stringify(props.tempQuiz));
                let temphold = change.cards[props.selectedCard]
                change.cards[props.selectedCard] = change.cards[props.selectedCard-1]
                change.cards[props.selectedCard-1] = temphold
                change.cards[props.selectedCard].cardNum = props.selectedCard
                change.cards[props.selectedCard-1].cardNum = props.selectedCard-1
                
                props.setTempQuiz(change);
                props.setSelectedCard(props.selectedCard-1)
            }
        }
        
        //let change = JSON.parse(JSON.stringify(props.tempQuiz));
        //change.cards[props.selectedCard].answerExplanation = event;
        //props.setTempQuiz(change);
    }

    const handleCardSelection = index =>{
        props.setSelectedCard(index);
    }

    const displayCards = (card, index) =>{
        if(props.selectedCard == index){
            return(
                <tr>
                    <button onClick = {() => handleCardSelection(index)} style={{"background-color": "#4CAF50"}}>{(index+2)+": "+card.question}</button>
                </tr>
            );
        }else{
            return(
                <tr>
                    <button onClick = {() => handleCardSelection(index)}>{(index+2)+": "+card.question}</button>
                </tr>
            );
        } 
        
    }
    const displayTitle = () =>{
        if(props.selectedCard == -1){
            return(
                <tr>
                    <button onClick = {() => handleCardSelection(-1)} style={{"background-color": "#4CAF50"}}>{"1: Title"}</button>
                </tr>
            );
        }else{
            return(
                <tr>
                    <button onClick = {() => handleCardSelection(-1)}>{"1: Title"}</button>
                </tr>
            );
        } 
    }

    

    
    var cardsArr =props.tempQuiz.cards
    
    return(
        <div>
            <table>
                <tr>
                    <th>
                        <button onClick = {() => handleAddCard()}>+</button>
                    </th>
                    <th>
                        <button onClick = {() => handleDelCard()}>-</button>
                    </th>
                    <th>
                        <button onClick = {() => handleSwapCard(1)}>/\</button>
                    </th>
                    <th>
                        <button onClick = {() => handleSwapCard(0)}>\/</button>
                    </th>
                </tr>
                {displayTitle()}
                {cardsArr.map(displayCards)}
            </table>
                
        </div>
    )
    
    
}

export default TableOfContents;