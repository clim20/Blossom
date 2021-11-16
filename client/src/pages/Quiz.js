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
    if (quizData) { 
		currentQuiz = quizData.findQuizById;
        cards = currentQuiz.cards
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

    const { data: quizCollectionsData, refetch: refetchQuizCollectionsData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_IDS, {
        variables: {
            ids: profileObject ? profileObject.quizCollections : []
        }
    });

    var quizCollections;
    if(quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
    }

    var isCreator = userObject && user && userObject._id === user._id

    //console.log(username)
    //console.log(followers)
    
    const [highestScores, setHighestScores] = useState([["A",600],["B",500],["C",300],["D",200]]);
    const [score, setScore] = useState(0);

    const [redirect, setRedirect] = useState(false);

    const handleStart = event =>{
        setRedirect(true);
    };

    const gotoEdit = event =>{
        history.push("/quiz/edit/" + quizId)
    }; 

    const handleFollow = event => {};
    
    const scoreQuery = () =>{};
    const handleSaveChanges = () =>{};

    
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

    const [DelQuiz] = useMutation(mutations.DELETE_QUIZ);

    const delTest = async () =>{     
        await DelQuiz({variables: { id: quizId }});
        refetchQuizData();
        history.push("/profile/"+profileObject._id);    
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

                    <table className="leaderboard-table">
                        {highestScores.splice(0,5).map(displayTopScores)}
                    </table>
        
                    <div>
                        <button className="quizLeaderboard" style = {styles.button}>
                            LEADERBOARDS
                        </button>
                        <table>
                            {highestScores.splice(0,5).map(displayTopScores)}
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
            </div>
        );

    }else{
        
        return(
            <QuizStart currentQuiz = {currentQuiz} author = {username}></QuizStart>
        );
        
       
    }

    //<Redirect to={{
    //    pathname: '/quiz/start/:quizId',
    //    state: { currentQuiz: currentQuiz }
    //  }} />
    

}
export default Quiz;