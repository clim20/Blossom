import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';
import image1 from '../testpic/seal.jpg';

import MenuBar from '../components/MenuBar';
import QuizStart from './QuizStart';

const styles = {
    button : {
        'border': 'none',
        'backgroundColor': '#ff00ff',
        'textAlign': 'center'
    }
}

const QuizEnd = (props) =>{

    const [isRetrying, setIsRetrying] = useState(false);
    
    const handleRetry = event =>{
        setIsRetrying(true);
    };
    const handleFollow = event =>{
        //props.handleFollow(event);
    };
    const handleCreateCollection = event =>{
        props.handleCreateCollection(event);
    };
    const handleAddToCollection = event =>{
        props.handleAddToCollection(event);
    };

    const displayTopScores = (arr, index) =>{

        return(
            <tr>
                <th>{index+1}</th>
                <th>{arr[0]}</th>
                <th>...</th>
                <th>{arr[1]}</th>
            </tr>
        )
        
    };

    if(isRetrying == false){
        return(
        
            <div style={{textAlign: 'center'}}>
                <MenuBar></MenuBar>
                <h1 style={{textAlign: 'center'}}>{props.currentQuiz.title}</h1>
                <button onClick = {() => handleFollow()} style = {styles.button}>
                    <p style={{textAlign: 'center'}}>
                        {props.currentQuiz.author}
                    </p>
                    <p style={{textAlign: 'center'}}> 
                        {props.currentQuiz.followers + " Followers"}
                    </p>
                </button>
                
                <div>
                    <header>Congratulations</header>
                    <header>
                    {props.score} pts
                    </header>
                </div>
    
                <button onClick = {() => handleRetry()} style = {styles.button}>
                    RETRY
                </button>
                <p>*Only first scores are posted to the leaderboards</p>
    
                <div>
                    <button style = {styles.button}>
                        LEADERBOARDS
                    </button>
                    <table>
                        {props.highestScores.splice(0,5).map(displayTopScores)}
                    </table>
                    
                </div>
            </div>
            
        );    
    }else{
        return(
            <QuizStart currentQuiz = {props.currentQuiz} highestScores = {props.highestScores}></QuizStart>
        );
    }
    

}
export default QuizEnd;