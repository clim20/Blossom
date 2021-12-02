import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";
import { Button, Input, Dropdown, Icon } from 'semantic-ui-react';

//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import image1 from '../testpic/seal.jpg';

import QuizStart from './QuizStart';
import QuizCollectionEntry from '../components/QuizCollectionEntry';
import LeaderBoardModal from '../modals/LeaderBoardModal';

const styles = {
    button : {
        'border': 'none',
        'backgroundColor': '#ff00ff',
        'textAlign': 'center'
    }
}

const Quiz = () =>{
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const params = useParams();
    const quizId = params ? params.quizId : 'could not get params';

    const { data: quizData, refetch: refetchQuizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: quizId
        }
    });

    var currentQuiz = {};
    var cards = [];
    var scores = [];
    if (quizData) { 
		currentQuiz = quizData.findQuizById;
        cards = currentQuiz.cards
        scores = JSON.parse(JSON.stringify(currentQuiz.scores));
    }
    console.log(currentQuiz)

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: currentQuiz.creator
        }
    });

    var userObject = {};
    var username = "";
    if (userData) { 
		userObject = userData.findUserById;
        username = userObject.username;
    }

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: userObject.profileId
        }
    });

    var profileObject = {};
    var followers = 0;
    if (profileData) { 
		profileObject = profileData.findProfileById;
        followers = profileObject.followerCount;
    }

    const { data: userProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: user ? user.profileId : []
        }
    });

    var userProfile = {};
    if (userProfileData) { 
		userProfile = userProfileData.findProfileById;
    }

    const { data: quizCollectionsData, refetch: refetchQuizCollectionsData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_IDS, {
        variables: {
            ids: userProfile ? userProfile.quizCollections : []
        }
    });

    var quizCollections;
    if(quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
    }

    var isCreator = userObject && user && userObject._id === user._id

    const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const handleStart = event =>{
        setRedirect(true);
    };

    const gotoEdit = event =>{
        history.push("/quiz/edit/" + quizId)
    }; 



    const handleFollow = event => {};
    

    
    const displayTopScores = (arr, index) =>{
        var name = "";
        let score = arr.userScore
        
        const NameComp = (props) =>{
            const { data: playerData } = useQuery(queries.FIND_USER_BY_ID, {
                variables: {
                    id: props.user
                }
            });

            var player = {};
            name = ""
            if (playerData) { 
		        player = playerData.findUserById;
                name = player.username
            }

            return <th>{name}</th>
        }

        return(
            <tr>
                <th>{index+1}</th>
                <NameComp user = {arr.user}></NameComp>
                <th>...</th>
                <th>{score}</th>
            </tr>
        )
        
    };

    const [DelQuiz] = useMutation(mutations.DELETE_QUIZ);

    const delTest = async () =>{     
        await DelQuiz({variables: { id: quizId }});
        refetchQuizData();
        history.push("/profile/"+profileObject._id);    
    }

    const [UpdateQuiz] = useMutation(mutations.UPDATE_QUIZ);
   
    const saveLike = async (like) =>{
        let temp = JSON.parse(JSON.stringify(currentQuiz));
        
        var badgeArr = [];
        for(let i = 0; i < temp.badges.length; i++){
            let insert = {
                "rank": temp.badges[i].rank,
                "image": temp.badges[i].image
                
            }
            
            badgeArr.push(insert)
            console.log(badgeArr)
        }

        

        var scoreArr = [];
        for(let i = 0; i < temp.scores.length; i++){
            let insert = {
                "user": temp.scores[i].user,
                "userScore": temp.scores[i].userScore,
                "bestScore": temp.scores[i].bestScore,
                "liked": temp.scores[i].liked
                
              }
            
              scoreArr.push(insert)
            //console.log(scoreArr)
        }
        let  currentuser = user
        //let tempQuizScores = temp.scores;
        let existingScore = scoreArr.findIndex(({ user }) => user === currentuser._id)


        console.log(existingScore)
        if (existingScore != -1){
            
            scoreArr[existingScore].liked = like;
            
        }

        console.log(scoreArr)
        var cardArr = [];
        for(let i = 0; i < temp.cards.length; i++){
            let insert = {
                "cardNum": temp.cards[i].cardNum,
                "question": temp.cards[i].question,
                "choices": temp.cards[i].choices,
                "answer": temp.cards[i].answer,
                "answerExplanation": temp.cards[i].answerExplanation,
                "questionImg": temp.cards[i].questionImg,
                "answerImg": temp.cards[i].answerImg,
                "drawing": temp.cards[i].drawing
              }
            
            cardArr.push(insert)
            //console.log(cardArr)
        }
        
        
        
        let tempquizLikes = temp.quizLikes
        let tempquizDislikes = temp.quizDislikes
        let prev = currentQuiz.scores[existingScore].liked
        console.log("prev = "+prev)

        if(prev == 1){
            tempquizLikes = tempquizLikes - 1
        }else if(prev == 2){
            tempquizDislikes = tempquizDislikes -1
        }

        if(like == 1){
            tempquizLikes = tempquizLikes + 1
        }else if(like == 2){
            tempquizDislikes = tempquizDislikes + 1
        }
        //console.log(props.currentQuiz._id)
        
        const { data } = await UpdateQuiz({

            variables: { 
                quizId: temp._id, 
                updatedQuiz: {
                   
                    "_id": temp._id,
                    "title": temp.title,
                    "description": temp.description,
                    "titleImg": temp.titleImg,
                    "creator":  temp.creator,
                    "platformId": temp.platformId,
                    "quizHits": temp.quizHits,
                    "quizLikes": tempquizLikes,
                    "quizDislikes": tempquizDislikes,
                    "badges": badgeArr,
                    "scores": scoreArr,
                    "cards": cardArr,
                    "createdAt": temp.createdAt
                  }
            }
        });
        
        //console.log(currentQuiz.score)

        var savingQuiz = {};
        if (data) { 
            savingQuiz = data.updateQuiz;
        }

        console.log(savingQuiz);

        setTimeout(() => {
            
            
            setEnableLike(true);
            refetchQuizData();
        }, 300);
    };

    const [enableLike, setEnableLike] = useState(true)
    const handleLike = (like) => {
        let  currentuser = user
        
        let existingScore = currentQuiz.scores.findIndex(({ user }) => user === currentuser._id)
        //console.log(currentQuiz.scores[existingScore].liked)
        if(existingScore != -1&&enableLike){
            setEnableLike(false);
            saveLike(like);
        }
       
    }

    const displayLikeBtn = () =>{
        //refetchQuizData();
        let  currentuser = user
        let existingScore = -1
        if(currentQuiz.scores){
            existingScore = currentQuiz.scores.findIndex(({ user }) => user === currentuser._id)
        }
        
        if(enableLike == false){
            return(
                <div>
                    <button disabled className="quiz-start-end-button" onClick = {() => handleLike(1)} style = {styles.button, {"background-color": "#c0c0c0"}}>
                        Like
                    </button>
    
                    <button disabled className="quiz-start-end-button" onClick = {() => handleLike(2)} style = {styles.button, {"background-color": "#c0c0c0"}}>
                        Dislike
                    </button>
                </div>
                
            )
        }
        if(existingScore != -1){
            
            if(currentQuiz.scores[existingScore].liked == 1){
                return(
                    <div>
                        <button className="quiz-start-end-button" onClick = {() => handleLike(0)} style = {styles.button,{"background-color": "#4CAF50"}}>
                            Like
                        </button>

                        <button className="quiz-start-end-button" onClick = {() => handleLike(2)} style = {styles.button}>
                            Dislike
                        </button>
                    </div>
                )
                
            }else if(currentQuiz.scores[existingScore].liked == 2){
                return(
                    <div>
                        <button className="quiz-start-end-button" onClick = {() => handleLike(1)} style = {styles.button}>
                            Like
                        </button>

                        <button className="quiz-start-end-button" onClick = {() => handleLike(0)} style = {styles.button,{"background-color": "#4CAF50"}}>
                            Dislike
                        </button>
                    </div>
                )
            }
        }
        return(
            <div>
                <button className="quiz-start-end-button" onClick = {() => handleLike(1)} style = {styles.button}>
                    Like
                </button>

                <button className="quiz-start-end-button" onClick = {() => handleLike(2)} style = {styles.button}>
                    Dislike
                </button>
            </div>
            
        )
        
    }



    /* QUIZ COLLECTION FUNCTIONS */
    const [CreateQuizCollection] = useMutation(mutations.CREATE_QUIZ_COLLECTION);
    const [AddQuizToQuizCollection] = useMutation(mutations.ADD_QUIZ_TO_QUIZ_COLLECTION);
    const [RemoveQuizFromQuizCollection] = useMutation(mutations.REMOVE_QUIZ_FROM_QUIZ_COLLECTION);

    const [createClicked, setCreateClicked] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [quizCollectionName, setQuizCollectionName] = useState("");

    const createQuizCollection = async () => {
        const { data } = await CreateQuizCollection({variables: { owner: user._id, name: quizCollectionName }});
        setQuizCollectionName("");
        setSubmit(true);

        var returnedQuizCollection = {};
        if (data) { 
            returnedQuizCollection = data.createQuizCollection;
        }

        if (returnedQuizCollection.name === "") {
            setDisable(false);
        } else{
            addQuizToQuizCollection(returnedQuizCollection._id);
            setDisable(true);
            setTimeout(() => {
                setCreateClicked(false)
                setSubmit(false);
                history.push("/quizCollection/" + returnedQuizCollection._id);
            }, 300);
        }
    }

    const addQuizToQuizCollection = async (quizCollectionId) => {
        await AddQuizToQuizCollection({variables: { quizId: currentQuiz._id, quizCollectionId: quizCollectionId }});
    }

    const removeQuizFromQuizCollection = async (quizCollectionId) => {
        await RemoveQuizFromQuizCollection({variables: { quizId: currentQuiz._id, quizCollectionId: quizCollectionId }});
    }

    const message = disabled ? 
        <div className="suc-msg">
            Successfully Created Quiz Collection
        </div>
        :
        <div className="err-msg">
            Invalid/Duplicate Quiz Collection Name
        </div>
    ;



    if(redirect == false){
        //console.log(highestScores)
        return(
            <div style={{textAlign: 'center'}}>    
                <div>
                    <h1 className="quiz-title" style={{textAlign: 'center'}}>{currentQuiz.title}</h1>
                    <button className="quiz-creator-follow" onClick = {() => handleFollow()} style = {styles.button}>
                        <p style={{textAlign: 'center'}}>
                            {username}
                        </p>
                        <p style={{textAlign: 'center'}}> 
                            {followers + " Followers"}
                        </p>
                    </button>
                    <img src={image1}/>
                    <p style={{textAlign: 'center'}}>{cards.length + " Questions"}</p>
                    <p>{currentQuiz.description}</p>
        
                    <button className="quiz-start-end-button" onClick = {() => handleStart()} style = {styles.button}>
                        Start
                    </button>

                    {displayLikeBtn()}
                    {/*<button className="quiz-start-end-button" onClick = {() => handleLike(1)} style = {styles.button}>
                        Like
                    </button>

                    <button className="quiz-start-end-button" onClick = {() => handleLike(2)} style = {styles.button}>
                        Dislike
                    </button>*/}

                    <table className="leaderboard-table">
                        {scores.slice(0,5).map(displayTopScores)}
                    </table>
        
                    <div>
                        <button className="quizLeaderboard" style = {styles.button} onClick = {() => setShowLeaderBoardModal(true)}>
                            LEADERBOARDS
                        </button>
                        <table>
                            {scores.slice(0,5).map(displayTopScores)}
                        </table>
                        
                    </div>
                </div>
                {isCreator &&
                    <button className="quiz-start-end-button" onClick = {() => gotoEdit()} >
                        Edit
                    </button>
                }
                {isCreator &&
                    <button className="quiz-start-end-button" onClick = {() => delTest()} >
                        DelTest
                    </button>
                }
                {
                    user && 
                    <div>
                    <Button.Group>
                        <Dropdown
                            style={{ backgroundColor: 'var(--darkPink)' }}
                            className='button icon'
                            icon='plus'
                            floating
                            trigger={<></>}
                        >
                            <Dropdown.Menu>
                                <Dropdown.Header icon='clone outline icon' content='Quiz Collections' />
                                <Dropdown.Divider />
                                {
                                    quizCollections && quizCollections.map((entry, index) => (
                                        <QuizCollectionEntry
                                            quizCollection={entry} key={index}
                                            addQuizToQuizCollection={addQuizToQuizCollection}
                                            removeQuizFromQuizCollection={removeQuizFromQuizCollection}
                                            refetchQuizCollectionsData={refetchQuizCollectionsData}
                                            currentQuiz={currentQuiz}
                                        />
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            style={{ backgroundColor: 'var(--pink)' }}
                            onClick={() => setCreateClicked(true)}
                        >
                            Create
                        </Button>
                    </Button.Group>
                    </div>
                }
                {
                    createClicked && 
                    <div>
                        <Input 
                            action
                            name='name'
                            placeholder={"Enter Quiz Collection Name Here"}
                            autoFocus={true}
                            onChange={event => setQuizCollectionName(event.target.value)} 
                            inputtype='text'
                        >
                        <input/>
                        {submitted && message}
                        <Button 
                            icon="check"
                            style={{ backgroundColor: 'var(--saveGreen)', width: "15%" }}
                            className='ui button icon'
                            onClick={createQuizCollection}
                        />
                        <Button 
                            icon="close"
                            style={{ backgroundColor: 'var(--cancelRed)', width: "15%" }}
                            className='ui button icon'
                            onMouseDown={() => setCreateClicked(false)}
                        />
                    </Input>
                    </div>
                }
                {
                    showLeaderBoardModal && (<LeaderBoardModal setShowLeaderBoardModal = {setShowLeaderBoardModal} scores = {scores} currentuser = {user._id}/>)
                }
            </div>
        );

    }else{
        
        return(
            <QuizStart currentQuiz = {currentQuiz} author = {username} currentUser = {user} refetchQuizData = {refetchQuizData}></QuizStart>
        );
        
       
    }

    //<Redirect to={{
    //    pathname: '/quiz/start/:quizId',
    //    state: { currentQuiz: currentQuiz }
    //  }} />
    

}
export default Quiz;