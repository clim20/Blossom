import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import QuizCollectionCards from '../components/cards/QuizCollectionCards';
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
        await DeleteQuizCollection({variables: { quizCollectionId: quizCollectionId }});
        refetchProfileData();        
    }

    return (
        <Grid>
            <Grid.Column width={12}>
                {
                    quizCollections && <QuizCollectionCards quizCollections={quizCollections} activeTab={props.activeTab} editingMode={editingMode} user={user}
                                    refetchData={refetchProfileData} setShowQuizCollectionDeletionModal={setShowQuizCollectionDeletionModal} setQuizCollectionName={setQuizCollectionName}/>
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
            {
                showQuizCollectionDeletionModal && (<QuizCollectionDeletionModal setShowQuizCollectionDeletionModal={setShowQuizCollectionDeletionModal}
                                                deleteQuizCollection={deleteQuizCollection} quizCollectionName={quizCollectionName}/>)
            }
        </Grid>
    );
}
export default ProfileQuizCollections;