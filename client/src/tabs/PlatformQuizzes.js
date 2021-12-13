import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import QuizCards from '../components/cards/QuizCards';
import AddQuizModal from '../modals/AddQuizModal.js';

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
    var isCollaborator;
    if(platform && user) {
        isOwner = platform.owner === user._id;
        isCollaborator = platform.collaborators.includes(user._id);
    }

    const [featuredQuiz, changeFeaturedQuiz] = useState(platform.featuredQuiz);
    const [editingMode, toggleEditingMode] = useState(false);
    const [showAddQuizModal, setShowAddQuizModal] = useState(false);
  
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

    const [RemoveQuiz] = useMutation(mutations.REMOVE_QUIZ_FROM_PLATFORM);
    const [AddQuiz] = useMutation(mutations.ADD_QUIZ_TO_PLATFORM);

    const removeQuiz = async (quizId) => {
        await RemoveQuiz({variables: { platformId: platform._id, quizId: quizId }});
        refetchPlatformData();        
    }

    const addQuiz = async (quizId) => {
        await AddQuiz({variables: { platformId: platform._id, quizId: quizId }});
        refetchPlatformData();  
    }

    useEffect(() => {
        refetchPlatformData();
        refetchQuizzesData();
    }, [user, platform, quizzes, refetchPlatformData, refetchQuizzesData]);

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
                    (isOwner || isCollaborator) && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => setShowAddQuizModal(true)}>
                            Add
                        </button>  
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
            {
                showAddQuizModal && (<AddQuizModal platformQuizzes={quizzes} setShowAddQuizModal={setShowAddQuizModal}
                    addQuiz={addQuiz}/>)
            }
        </Grid>
    );
}
export default PlatformQuizzes;