import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Button } from 'semantic-ui-react';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';
import { selectionSetMatchesResult } from '@apollo/react-hooks/node_modules/@apollo/client/cache/inmemory/helpers';

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

    var profileId = userObject.profileId;

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
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


    /*let count = 0;
    for (const obj of quizzes) {
        if (obj.status === '0') count++;
    }*/
    //console.log(platform.length);
    /*if(platform.length != 0) {
        setDisable1(true);
    }*/

    //Created a Platform
    useEffect(() => {
        if(platform.length > 0){
            setDisable1(true);
        }
    })

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
    });

    //Has 100 Followers
    useEffect(()=> {
        if(followers > 99) {
            setDisable6(true);
        }
	if(followers > 199) {
	    setDisable12(true);
	}
    });
	
    useEffect(() => {
	for(let i=0; i < quizzes.length; i++){
	   if(quizzes[i].quizLikes > 4){
	      setDisable7(true);
	   }
	   if(quizzes[i].quizLikes > 9){
	      setDisable8(true);
	   }
	   if(quizzes[i].quizLikes > 49){
	      setDisable9(true);
	   }
	   if(quizzes[i].quizLikes > 99){
	      setDisable10(true);
	   }
	   if(quizzes[i].quizDislikes == 0){
	      setDisable11(true);
	   }else{
	      setDisable11(false);
	   }
	}
    });
	
    const[pageNumber, setPageNumber] = useState(1);
    const handleBackArrow = () => {
	if(pageNumber == 1){
	}else{
	   setPageNumber(1);
	}
    }
    const handleForthArrow = () => {
	if(pageNumber == 2){
	}else{
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
	    		<Button color='#ffc0cb' icon='left chevron' onClick={handleBackArrow} />
	    		<Button color='#ffc0cb' icon='right chevron' onClick={handleForthArrow} />
	    	</Button.Group>
	    	</span>
            </h2>
	   {(firstPage) ? <div className="quests-rectangle">
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Create your first platform!
                    {(disabled1) ? <span className="completeBox1">Completed</span> :
                    <span className="checkBox1">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make your first quiz!
                    {(disabled2) ? <span className="completeBox2">Completed</span> :
                    <span className="checkBox2">Incomplete</span> }
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make 5 Quizzes!
                    {(disabled3) ? <span className="completeBox3">Completed</span> :
                    <span className="checkBox3">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Make 10 Quizzes!
                    {(disabled4) ? <span className="completeBox4">Completed</span> :
                    <span className="checkBox4">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 100 people take one of your quiz.
                    {(disabled5) ? <span className="completeBox5">Completed</span> :
                    <span className="checkBox5">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 100 Followers!
                    {(disabled6) ? <span className="completeBox6">Completed</span> :
                    <span className="checkBox6">Incomplete</span>}
                </h2>
            </div>
	    :
            <div className="quests-rectangle">
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get 5 Likes!
                    {(disabled7) ? <span className="completeBox7">Completed</span> :
                    <span className="checkBox7">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get 10 Likes!
                    {(disabled8) ? <span className="completeBox8">Completed</span> :
                    <span className="checkBox8">Incomplete</span> }
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get 50 Likes!
                    {(disabled9) ? <span className="completeBox9">Completed</span> :
                    <span className="checkBox9">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get 100 Likes!
                    {(disabled10) ? <span className="completeBox10">Completed</span> :
                    <span className="checkBox10">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 0 Dislikes!
                    {(disabled11) ? <span className="completeBox11">Completed</span> :
                    <span className="checkBox11">Incomplete</span>}
                </h2>
                    <br />
                <h2>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Have 200 Followers!
                    {(disabled12) ? <span className="completeBox12">Completed</span> :
                    <span className="checkBox12">Incomplete</span>}
                </h2>
            </div> }
        </div>
    );
}
export default Quest;
