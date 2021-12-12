import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useQuery } from '@apollo/react-hooks';

import { Button } from 'semantic-ui-react';

import * as queries from '../cache/queries';

const Quest = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    if (!user) {
        history.push("/");
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: userObject.profileId
        }
    });

    var profileObject = {};
    var quizzes = [];
    var platform = [];
    var followers = 0;
    if (profileData) { 
		profileObject = profileData.findProfileById;
        quizzes = profileObject.quizzes;
        platform = profileObject.platforms;
        followers = profileObject.followerCount;
    }

    var quizzesArr = [];
    const { data: quizData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: quizzes
        }
    });

    if (quizData) {
        quizzesArr = quizData.findQuizzesByIds;
    }

    const [disabled1, setDisable1] = useState(false);
    const [disabled2, setDisable2] = useState(false);
    const [disabled3, setDisable3] = useState(false);
    const [disabled4, setDisable4] = useState(false);
    const [disabled5, setDisable5] = useState(false);
    const [disabled6, setDisable6] = useState(false);
	
    const [disabled7, setDisable7] = useState(false);
    const [disabled8, setDisable8] = useState(false);
    const [disabled9, setDisable9] = useState(false);
    const [disabled10, setDisable10] = useState(false);
    const [disabled11, setDisable11] = useState(false);
    const [disabled12, setDisable12] = useState(false);

    //Created a Platform
    useEffect(() => {
        if(platform.length > 0){
            setDisable1(true);
        }
        refetchProfileData();
    }, [platform], refetchProfileData)

    //Made a Quiz
    useEffect(() => {
        if(quizzes.length > 0){
            setDisable2(true);
            //Made 5 Quizzes
            if(quizzes.length > 4) {
                setDisable3(true);
            }
            //Made 10 Quizzes
            if(quizzes.length > 9) {
                setDisable4(true);
            }
        }
        refetchProfileData();
    }, [quizzes], refetchProfileData);

    //Has 100 Followers
    useEffect(()=> {
        if(followers > 99) {
            setDisable6(true);
        }
        if(followers > 199) {
            setDisable12(true);
        }
        refetchProfileData();
    }, [followers], refetchProfileData);
	
    useEffect(() => {
        for(let i=0; i < quizzesArr.length; i++){
            if(quizzesArr[i].quizHits > 99){
                setDisable5(true);
            }
            if(quizzesArr[i].quizLikes > 4){
                setDisable7(true);
            }
            if(quizzesArr[i].quizLikes > 9){
                setDisable8(true);
            }
            if(quizzesArr[i].quizLikes > 49){
                setDisable9(true);
            }
            if(quizzesArr[i].quizLikes > 99){
                setDisable10(true);
            }
            if(quizzesArr[i].quizDislikes == 0){
                setDisable11(true);
            }
        }
        refetchProfileData();
    }, [quizzesArr], refetchProfileData);
	
    const[pageNumber, setPageNumber] = useState(1);
    const handleBackArrow = () => {
        if(pageNumber !== 1) {
            setPageNumber(1);
        }
    }
    const handleForthArrow = () => {
        if(pageNumber !== 2){
            setPageNumber(2);
        }
    }
    
    const [firstPage, setFirstPage] = useState(false);
    useEffect(()=> {
        if(pageNumber == 1){
        setFirstPage(true);
        }else{
        setFirstPage(false);
        }
    });

    return (
        user && <div>
            <h2 className="quests">
                Quests
	    	<span className="arrow">
	    	<Button.Group>
	    		<Button icon='left chevron' onClick={handleBackArrow}/>
	    		<Button icon='right chevron' onClick={handleForthArrow}/>
	    	</Button.Group>
	    	</span>
            </h2>
	   {(firstPage) ? 
            <div className="quests-rectangle">
                    <br />
                <h2 className="quest-block">
                    <div className="quest-text">Create your first platform!</div>
                    <div className="quest-button">
                        {(disabled1) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Make your first quiz!</div>
                    <div className="quest-button">
                        {(disabled2) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Make 5 Quizzes!</div>
                    <div className="quest-button">
                        {(disabled3) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Make 10 Quizzes!</div>
                    <div className="quest-button">
                        {(disabled4) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Have 100 people take one of your quiz.</div>
                    <div className="quest-button">
                        {(disabled5) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Have 100 Followers!</div>
                    <div className="quest-button">
                        {(disabled6) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
            </div>
	    :
            <div className="quests-rectangle">
                    <br />
                <h2 className="quest-block">
                    <div className="quest-text">Get 5 Likes On A Quiz!</div>
                    <div className="quest-button">
                        {(disabled7) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Get 10 Likes On A Quiz!</div>
                    <div className="quest-button">
                        {(disabled8) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Get 50 Likes On A Quiz!</div>
                    <div className="quest-button">
                        {(disabled9) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Get 100 Likes On A Quiz!</div>
                    <div className="quest-button">
                        {(disabled10) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Have 0 Dislikes On A Quiz!</div>
                    <div className="quest-button">
                        {(disabled11) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
                <h2 className="quest-block">
                    <div className="quest-text">Have 200 Followers!</div>
                    <div className="quest-button">
                        {(disabled12) ? <span className="complete-box">Completed</span> :
                        <span className="incomplete-box">Incomplete</span>} 
                    </div>
                </h2>
            </div> }
        </div>
    );
}
export default Quest;
