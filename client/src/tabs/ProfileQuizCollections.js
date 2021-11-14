import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

import QuizCollectionCards from '../components/QuizCollectionCards';
import QuizCollectionDeletionModal from '../modals/QuizCollectionDeletionModal';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const ProfileQuizCollections = (props) => {
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

    const { data: quizCollectionsData, refetch: refetchQuizCollectionsData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_IDS, {
        variables: {
            ids: profile ? profile.quizCollections : []
        }
    });

    var quizCollections;
    if(quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
    }

    var isOwner;
    if(profile && user) {
        isOwner = profile.user === user._id;
    }

    const [showQuizCollectionDeletionModal, setShowQuizCollectionDeletionModal] = useState(false);
    const [quizCollectionName, setQuizCollectionName] = useState('');
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        toggleEditingMode(false);
    }

    const handleSave = () => {
        handleCancel();
    }

    useEffect(() => {
        refetchProfileData();
        refetchQuizCollectionsData();
    }, [user, profile, quizCollections, refetchProfileData, refetchQuizCollectionsData]);

    const [DeleteQuizCollection] = useMutation(mutations.DELETE_QUIZ_COLLECTION);

    const deleteQuizCollection = async (quizCollectionId) => {
        console.log("Still need to work on mutation"); //TODO
        // await DeleteQuizCollection({variables: { quizCollectionId: quizCollectionId }});
        // console.log("quiz collection removed");
        // refetchProfileData();        
    }

    const height = quizCollections && quizCollections.length === 0 ? "empty-tab" : "";

    return (
        <div className={height}>
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
                    <button className="ui button request-button" style={{ float: 'right', visibility: 'hidden' }}/>
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
            {
                quizCollections && <QuizCollectionCards quizCollections={quizCollections} activeTab={props.activeTab} editingMode={editingMode} user={user}
                                refetchData={refetchProfileData} setShowQuizCollectionDeletionModal={setShowQuizCollectionDeletionModal} setQuizCollectionName={setQuizCollectionName}/>
            }
            {
                showQuizCollectionDeletionModal && (<QuizCollectionDeletionModal setShowQuizCollectionDeletionModal={setShowQuizCollectionDeletionModal}
                                                deleteQuizCollection={deleteQuizCollection} quizCollectionName={quizCollectionName}/>)
            }
        </div>
    );
}
export default ProfileQuizCollections;