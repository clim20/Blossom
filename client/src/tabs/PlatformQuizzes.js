import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import QuizCards from '../components/cards/QuizCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const PlatformQuizzes = (props) => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const platformId = params ? params.platformId : 'could not get params';

    const { data: platformData, refetch: refetchPlatformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: platformId
        }
    });

    var platform;
    if(platformData) {
        platform = platformData.findPlatformById;
    }

    const { data: quizzesData, refetch: refetchQuizzesData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: platform ? platform.quizzes : []
        }
    });

    var quizzes;
    if(quizzesData) { 
        quizzes = quizzesData.findQuizzesByIds; 
    }

    var isOwner;
    if(platform && user) {
        isOwner = platform.owner === user._id;
    }

    const [featuredQuiz, changeFeaturedQuiz] = useState(platform.featuredQuiz);
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        changeFeaturedQuiz(platform.featuredQuiz);
        toggleEditingMode(false);
    }

    const [setFeaturedQuiz] = useMutation(mutations.SET_FEATURED_QUIZ, {
        variables: {
            profilePlatformId: platform ? platform._id : '',
            quizId: featuredQuiz
        }
    });

    const handleSave = () => {
        setFeaturedQuiz();
        setTimeout(() => {
            refetchPlatformData();
            refetchQuizzesData();
        }, 300);
        handleCancel();
        changeFeaturedQuiz(featuredQuiz);
    }

    useEffect(() => {
        refetchPlatformData();
        refetchQuizzesData();
    }, [user, platform, quizzes, refetchPlatformData, refetchQuizzesData]);

    const [CreateQuiz] = useMutation(mutations.CREATE_QUIZ);
    //const [DeleteQuiz = useMutation(mutations.)]
    const handleSubmit = async () => {
        const { data } = await CreateQuiz({
            variables: { 
                owner: user._id, 
                title: "test"
            }
        });

        var returnedQuiz = {};
        if (data) { 
            returnedQuiz = data.createQuiz;
            console.log(returnedQuiz);
        }
    }

    return (
        <Grid>
            <Grid.Column width={12}>
                {quizzes && <QuizCards quizzes={quizzes} activeTab={props.activeTab} platform={platform} editingMode={editingMode} user={user}
                                featuredQuiz={featuredQuiz} setFeaturedQuiz={changeFeaturedQuiz} refetchData={refetchPlatformData}/>
                }
            </Grid.Column>
            <Grid.Column width={4}>
                {
                    isOwner && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => toggleEditingMode(!editingMode)}>
                            Edit
                        </button>  
                    </div>
                }
                {
                    isOwner && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right', visibility: 'hidden' }}/>
                    </div>
                }
                {
                    editingMode &&
                    <div>
                        <button className="ui button cancel-button" style={{ float: 'right' }} onClick={handleCancel}>
                            Cancel
                        </button>  
                        <button className="ui button save-button" style={{ float: 'right' }} onClick={handleSave}>
                            Save
                        </button>  
                    </div>
                }
            </Grid.Column>
        </Grid>
    );
}
export default PlatformQuizzes;