import React, { useContext, useState } from 'react';
import { Button, Dropdown, Grid, Input } from 'semantic-ui-react';

import { useParams, useHistory } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import QuizCollectionEntry from '../components/QuizCollectionEntry';

const CollectionButton = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const params = useParams();
    const quizId = params ? params.quizId : 'could not get params';

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: quizId
        }
    });

    var currentQuiz = {};
    if (quizData) { 
		currentQuiz = quizData.findQuizById;
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: currentQuiz.creator
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: userObject.profileId
        }
    });

    var profileObject = {};
    if (profileData) { 
		profileObject = profileData.findProfileById;
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
    if (quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
    }

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
        } else {
            addQuizToQuizCollection(returnedQuizCollection._id);
            setDisable(true);
            setTimeout(() => {
                setCreateClicked(false);
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

    return(
        <Grid.Row>
            {user && 
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button className="ui labeled icon button" style={{ backgroundColor: 'var(--pink)', width: '60%' }} onClick={() => setCreateClicked(true)}>
                        <Dropdown
                            style={{ backgroundColor: 'var(--darkPink)' }}
                            className='button icon'
                            icon='plus'
                            floating
                            trigger={<></>}
                        >
                            <Dropdown.Menu>
                                <Dropdown.Header icon='clone outline' content='Quiz Collections' />
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
                        Create
                    </button>
                </div>
            }

            {createClicked && 
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Input 
                            action
                            name='name'
                            placeholder={"Enter Quiz Collection Name Here"}
                            autoFocus={true}
                            onChange={event => setQuizCollectionName(event.target.value)} 
                            inputtype='text'
                        >
                            <input/>
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
                    <div>
                        {submitted && message}
                    </div>
                </div>
            }
        </Grid.Row>
    );
}
export default CollectionButton;