import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

import QuizCards from '../components/cards/QuizCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const ProfileQuizzes = (props) => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const profileId = params ? params.profileId : 'could not get params';

    const history = useHistory();

    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: profileId
        }
    });

    var profile;
    if(profileData) {
        profile = profileData.findProfileById;
    }

    const { data: quizzesData, refetch: refetchQuizzesData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: profile ? profile.quizzes : []
        }
    });

    var quizzes;
    if(quizzesData) { 
        quizzes = quizzesData.findQuizzesByIds; 
    }

    var isOwner;
    if(profile && user) {
        isOwner = profile.user === user._id;
    }

    const [featuredQuiz, changeFeaturedQuiz] = useState(profile.featuredQuiz);
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        changeFeaturedQuiz(profile.featuredQuiz);
        toggleEditingMode(false);
    }

    const [setFeaturedQuiz] = useMutation(mutations.SET_FEATURED_QUIZ, {
        variables: {
            profilePlatformId: profile ? profile._id : '',
            quizId: featuredQuiz
        }
    });

    const handleSave = () => {
        if (featuredQuiz) {
            setFeaturedQuiz();
            setTimeout(() => {
                refetchProfileData();
                refetchQuizzesData();
            }, 300);
            handleCancel();
            changeFeaturedQuiz(featuredQuiz);
        } else {
            handleCancel();
        }
    }

    useEffect(() => {
        refetchProfileData();
        refetchQuizzesData();
    }, [user, profile, quizzes, refetchProfileData, refetchQuizzesData]);

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

        history.push("/quiz/edit/" + returnedQuiz._id);
    }

    return (
        <Grid>
            <Grid.Column width={12}>
                {quizzes && <QuizCards quizzes={quizzes} activeTab={props.activeTab} editingMode={editingMode} user={user}
                                featuredQuiz={featuredQuiz} setFeaturedQuiz={changeFeaturedQuiz} refetchData={refetchProfileData}/>
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
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={handleSubmit}>
                            Create
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
        </Grid>
    );
}
export default ProfileQuizzes;