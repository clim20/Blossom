import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import QuizCards from '../components/QuizCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const ProfileQuizzes = (props) => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const profileId = params ? params.profileId : 'could not get params';

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
            ids: profile.quizzes
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

    const [featuredQuiz, setfeaturedQuiz] = useState('');
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        toggleEditingMode(false);
    }

    const handleSave = () => {
        setTimeout(() => {
            refetchProfileData();
        }, 300);
        handleCancel();
    }

    useEffect(() => {
        refetchProfileData();
        refetchQuizzesData();
    }, [user, profile, quizzes, refetchProfileData, refetchQuizzesData]);

    return (
        <div>
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
                    <button className="ui button request-button" style={{ float: 'right' }}>
                        Create
                    </button>
                </div>
            }
            {
                editingMode &&
                <div style={{ float: 'right' }}>
                    <button className="ui button save-button" onClick={handleSave}>
                        Save
                    </button>  
                    <button className="ui button cancel-button" onClick={handleCancel}>
                        Cancel
                    </button>  
                </div>
            }

            {quizzes && <QuizCards quizzes={quizzes} profile={profile} activeTab={props.activeTab} editingMode={editingMode} user={user}/>}
        </div>
    );
}
export default ProfileQuizzes;