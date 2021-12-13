import React from 'react';


function TableOfContents(props) {
    var cardsArr = props.tempQuiz.cards

    const handleAddCard = () =>{
        if(props.selectedCard !== -1){
            let change = JSON.parse(JSON.stringify(props.tempQuiz));
            let ins = {
                cardNum: 0,
                question: "Enter Question Here",
                choices: ["Enter Choices Here"],
                answer: 0,
                answerExplanation: "Enter Explanation Here",
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
        
            props.setSelectedCard (props.selectedCard + 1)
            props.setTempQuiz(change);
        }
        
    }
    const handleDelCard = () =>{
        if(props.selectedCard !== -1){
            let change = JSON.parse(JSON.stringify(props.tempQuiz));
            if(change.cards.length>1){
                change.cards.splice(props.selectedCard,1);
                if(change.cards.length === props.selectedCard){
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
        if(props.selectedCard !== -1){
            if(direction === 0 && props.selectedCard<cardsArr.length-1){
            
                let change = JSON.parse(JSON.stringify(props.tempQuiz));
                let temphold = change.cards[props.selectedCard]
                change.cards[props.selectedCard] = change.cards[props.selectedCard+1]
                change.cards[props.selectedCard+1] = temphold
                change.cards[props.selectedCard].cardNum = props.selectedCard
                change.cards[props.selectedCard+1].cardNum = props.selectedCard+1
                
                props.setTempQuiz(change);
                props.setSelectedCard(props.selectedCard+1)
    
            }else if(direction === 1 && props.selectedCard > 0){
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
    }

    const handleCardSelection = index => {
        props.setSelectedCard(index);
    }

    const displayCards = (card, index) => {
        if (props.selectedCard === index) {
            return(
                <tr>
                    <div style={{ 'padding': '10px'}}>
                        <button className = "table-of-contents-cards" onClick = {() => handleCardSelection(index)} style={{"background-color": "#4CAF50"}}>{(index+2)+": "+card.question}</button>
                    </div>
                </tr>
            );
        } else {
            return(
                <tr>
                    <div style={{ 'padding': '10px'}}>
                        <button className = "table-of-contents-cards" onClick = {() => handleCardSelection(index)}>{(index+2)+": "+card.question}</button>
                    </div>
                </tr>
            );
        } 
        
    }
    const displayTitle = () => {
        if (props.selectedCard === -1) {
            return(
                <tr>
                    <div style={{ 'padding': '10px'}}>
                        <button className = "table-of-contents-cards" onClick = {() => handleCardSelection(-1)} style={{"background-color": "#4CAF50"}}>{"1: Title"}</button>
                    </div>
                    
                </tr>
            );
        }else{
            return(
                <tr>
                    <div style={{ 'padding': '10px'}}>
                        <button className = "table-of-contents-cards" onClick = {() => handleCardSelection(-1)}>{"1: Title"}</button>
                    </div>
                </tr>
            );
        } 
    }
    
    cardsArr = props.tempQuiz.cards
    
    return(
        <div className = "table-of-contents">
            <table style = {{'width' : '100%'}}>
                <tr style = {{'border': '1px solid black', 'backgroundColor': '#e7e7e7', 'padding': '0'}}>
                    <th >
                        <button className = "table-of-contents-selector" onClick = {() => handleAddCard()}>+</button>
                    </th>
                    <th>
                        <button className = "table-of-contents-selector" onClick = {() => handleDelCard()}>-</button>
                    </th>
                    <th>
                        <button className = "table-of-contents-selector" onClick = {() => handleSwapCard(1)}>/\</button>
                    </th>
                    <th>
                        <button className = "table-of-contents-selector" onClick = {() => handleSwapCard(0)}>\/</button>
                    </th>
                </tr>
            </table>
            <div style={{'width': '225px', 'height': '610px' ,'overflow':'auto'}}>
                <table>
                    {displayTitle()}
                    {cardsArr.map(displayCards)}
                </table>
            </div>
                
        </div>
    )
    
    
}

export default TableOfContents;