import React, { useContext, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import CollectionButton from '../components/CollectionButton';
import LeaderBoardModal from '../modals/LeaderBoardModal';
import QuizStart from './QuizStart';

const Quiz = () => {
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
        cards = currentQuiz.cards;
        scores = JSON.parse(JSON.stringify(currentQuiz.scores));
    }

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

    var isCreator = userObject && user && userObject._id === user._id;

    const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const handleStart = () =>{
        setRedirect(true);
    };

    const gotoEdit = () => {
        history.push("/quiz/edit/" + quizId);
    }; 

    const handleCreatorClick = () => {
        history.push("../profile/" + profileObject._id);
    };
    
    const displayTopScores = (arr, index) => {
        var name = "";
        let score = arr.userScore;
        
        const NameComp = (props) => {
            const { data: playerData } = useQuery(queries.FIND_USER_BY_ID, {
                variables: {
                    id: props.user
                }
            });

            var player = {};
            name = "";
            if (playerData) { 
		        player = playerData.findUserById;
                name = player.username;
            }

            return <td style={{ overflowWrap: 'anywhere' }}>{name}</td>
        }

        return(
            <tr key={index}>
                <td style={{ overflowWrap: 'anywhere' }}>{index+1}</td>
                <NameComp user={arr.user}></NameComp>
                <td>{score}</td>
            </tr>
        )
    };

    const [DelQuiz] = useMutation(mutations.DELETE_QUIZ);

    const delTest = async () =>{     
        await DelQuiz({variables: { id: quizId }});
        refetchQuizData();
        history.push("/profile/" + profileObject._id);    
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
            
            badgeArr.push(insert);
            console.log(badgeArr);
        }

        var scoreArr = [];
        for (let i = 0; i < temp.scores.length; i++){
            let insert = {
                "user": temp.scores[i].user,
                "userScore": temp.scores[i].userScore,
                "bestScore": temp.scores[i].bestScore,
                "liked": temp.scores[i].liked
            }
            
            scoreArr.push(insert);
            //console.log(scoreArr)
        }
        let currentUser = user;
        //let tempQuizScores = temp.scores;
        let existingScore = scoreArr.findIndex(({ user }) => user === currentUser._id);

        console.log(existingScore);
        if (existingScore != -1) {
            scoreArr[existingScore].liked = like;
        }

        console.log(scoreArr);
        var cardArr = [];
        for (let i = 0; i < temp.cards.length; i++) {
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
            
            cardArr.push(insert);
            //console.log(cardArr)
        }
        
        let tempquizLikes = temp.quizLikes;
        let tempquizDislikes = temp.quizDislikes;
        let prev = currentQuiz.scores[existingScore].liked;
        console.log("prev = " + prev);

        if (prev == 1) {
            tempquizLikes = tempquizLikes - 1;
        } else if (prev == 2) {
            tempquizDislikes = tempquizDislikes - 1;
        }

        if (like == 1) {
            tempquizLikes = tempquizLikes + 1;
        } else if (like == 2) {
            tempquizDislikes = tempquizDislikes + 1;
        }
        //console.log(props.currentQuiz._id);
        
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
        
        //console.log(currentQuiz.score);

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

    const [enableLike, setEnableLike] = useState(true);
    const handleLike = (like) => {
        let currentUser = user ? user : { _id: '' };
        
        let existingScore = currentQuiz.scores.findIndex(({ user }) => user === currentUser._id);
        //console.log(currentQuiz.scores[existingScore].liked);
        if (existingScore !== -1 && enableLike) {
            setEnableLike(false);
            saveLike(like);
        }
    }

    const displayLikeBtn = () =>{
        //refetchQuizData();
        let currentUser = user;
        let existingScore = -1;
        if (currentQuiz.scores) {
            existingScore = currentQuiz.scores.findIndex(({ user }) => user === currentUser._id);
        }
        
        if (enableLike == false || existingScore == -1) {
            return(
                <div>
                    <div className="ui labeled button" style={{ marginRight: '15px' }}>
                        <i className="thumbs up icon" onClick={() => handleLike(1)}></i>
                        {currentQuiz.quizLikes}
                    </div>

                    <div className="ui labeled button">
                        <i className="thumbs down icon" onClick={() => handleLike(2)}></i>
                        {currentQuiz.quizDislikes}
                    </div>
                </div>
            )
        }

        if (enableLike && existingScore != -1) {
            if (currentQuiz.scores[existingScore].liked === 1) {
                return(
                    <div>
                        <div className="ui labeled button" style={{ marginRight: '15px' }}>
                            <i className="thumbs up icon like-dislike" onClick={() => handleLike(0)}></i>
                            {currentQuiz.quizLikes}
                        </div>
        
                        <div className="ui labeled button">
                            <i className="thumbs down icon" onClick={() => handleLike(2)}></i>
                            {currentQuiz.quizDislikes}
                        </div>
                    </div>
                )
                
            } else if (currentQuiz.scores[existingScore].liked == 2) {
                return(
                    <div>
                        <div className="ui labeled button" style={{ marginRight: '15px' }}>
                            <i className="thumbs up icon" onClick={() => handleLike(1)}></i>
                            {currentQuiz.quizLikes}
                        </div>
        
                        <div className="ui labeled button">
                            <i className="thumbs down icon like-dislike" onClick={() => handleLike(0)}></i>
                            {currentQuiz.quizDislikes}
                        </div>
                    </div>
                )
            }
        }

        return(
            <div>
                <div className="ui labeled button" style={{ marginRight: '15px' }}>
                    <i className="thumbs up icon" onClick={() => handleLike(1)}></i>
                    {currentQuiz.quizLikes}
                </div>

                <div className="ui labeled button">
                    <i className="thumbs down icon" onClick={() => handleLike(2)}></i>
                    {currentQuiz.quizDislikes}
                </div>
            </div>
        )
    }
    
    if (!quizData){
        return(
            <div>Quiz Loading or Not Found</div>
        )
    }

    if (redirect == false){
        //console.log(highestScores)
        return(
            <Grid>
                <Grid.Column width={12}>
                    <Grid.Row>
                        <div className="display-inline-block text-align-center">
                            <h1 className="quiz-title">{currentQuiz.title}</h1>
                            <button className="quiz-creator-follow" onClick={handleCreatorClick}>
                                <img className="ui avatar image follow-button-image" src={profileObject && profileObject.profileImg} />
                                <div>
                                    <p> {username} </p>
                                    <p> {followers + " Followers"} </p>
                                </div>
                            </button>
                        </div>
                    </Grid.Row>

                    <Grid.Row>
                        <div className="display-inline-block text-align-center">
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                                {displayLikeBtn()}
                            </div>
                        </div>
                    </Grid.Row>

                    <Grid.Row>
                        <div className="display-inline-block text-align-center">
                            <img className="quiz-picture" src={currentQuiz.titleImg} />
                            <br/>
                            <br/>
                            <p> {cards.length + " Questions"} </p>
                            <p> {currentQuiz && currentQuiz.description} </p>
                            <button className="ui button quiz-buttons" onClick={() => handleStart()}>
                                START
                            </button>
                        </div>
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={4}>
                    <Grid.Row>
                        <div className="text-align-center">   
                            {isCreator &&  
                                <button className="ui button quiz-buttons" onClick={() => gotoEdit()} >
                                    Edit
                                </button>
                            }

                            {isCreator &&
                                <button className="ui button quiz-buttons" onClick={() => delTest()} >
                                    Delete
                                </button>
                            }
                        </div>
                    </Grid.Row>

                    <CollectionButton/>

                    <Grid.Row>
                        <div className="text-align-center">   
                            <button className="ui button quiz-leaderboard" onClick = {() => setShowLeaderBoardModal(true)}>
                                LEADERBOARD
                            </button>
                            <table className="ui small stackable table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.slice(0,5).map(displayTopScores)}
                                </tbody>
                            </table>
                        </div>
                    </Grid.Row>
                </Grid.Column>

                {
                    showLeaderBoardModal && (<LeaderBoardModal setShowLeaderBoardModal={setShowLeaderBoardModal} scores={scores} currentUser={user._id}/>)
                }
            </Grid>
        );

    } else{
        return(
            <QuizStart currentQuiz={currentQuiz} author={username} currentUser={user} refetchQuizData={refetchQuizData}></QuizStart>
        );
    }
}
export default Quiz;