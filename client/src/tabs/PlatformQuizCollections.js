import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import QuizCollectionCards from '../components/cards/QuizCollectionCards';
import QuizCollectionRemovalModal from '../modals/QuizCollectionRemovalModal';
import AddQuizCollectionModal from '../modals/AddQuizCollectionModal';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const PlatformQuizCollections = (props) => {
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

    const { data: quizCollectionsData, refetch: refetchQuizCollectionsData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_IDS, {
        variables: {
            ids: platform ? platform.quizCollections : []
        }
    });

    var quizCollections;
    if(quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
    }

    var isOwner;
    if(platform && user) {
        isOwner = platform.owner === user._id;
    }

    const [showQuizCollectionRemovalModal, setShowQuizCollectionRemovalModal] = useState(false);
    const [quizCollectionName, setQuizCollectionName] = useState('');
    const [showAddQuizCollectionModal, setShowAddQuizCollectionModal] = useState(false);
    const [newQuizCollectionName, setNewQuizCollectionName] = useState('');
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        toggleEditingMode(false);
    }

    const handleSave = () => {
        handleCancel();
    }

    useEffect(() => {
        refetchPlatformData();
        refetchQuizCollectionsData();
    }, [user, platform, quizCollections, refetchPlatformData, refetchQuizCollectionsData]);

    const [RemoveQuizCollection] = useMutation(mutations.REMOVE_QUIZ_COLLECTION);
    const [AddQuizCollection] = useMutation(mutations.ADD_QUIZ_COLLECTION);

    const removeQuizCollection = async (quizCollectionId) => {
        await RemoveQuizCollection({variables: { platformId: platform._id, quizCollectionId: quizCollectionId }});
        refetchPlatformData();        
    }

    const addQuizCollection = async (quizCollectionId) => {
        await AddQuizCollection({variables: { platformId: platform._id, quizCollectionId: quizCollectionId }});
        refetchPlatformData();  
    }

    return (
        <Grid>
            <Grid.Column width={12}>
                {
                    quizCollections && <QuizCollectionCards platform={platform} quizCollections={quizCollections} activeTab={props.activeTab} editingMode={editingMode} user={user}
                                    refetchData={refetchPlatformData} setShowQuizCollectionRemovalModal={setShowQuizCollectionRemovalModal} setQuizCollectionName={setQuizCollectionName}/>
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
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => setShowAddQuizCollectionModal(true)}>
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
                showQuizCollectionRemovalModal && (<QuizCollectionRemovalModal setShowQuizCollectionRemovalModal={setShowQuizCollectionRemovalModal}
                                                removeQuizCollection={removeQuizCollection} quizCollectionName={quizCollectionName}/>)
            }
            {
                showAddQuizCollectionModal && (<AddQuizCollectionModal platformQuizCollections={quizCollections} setShowAddQuizCollectionModal={setShowAddQuizCollectionModal}
                    addQuizCollection={addQuizCollection} setNewQuizCollectionName={setNewQuizCollectionName}/>)
            }
            </Grid>
    );
}
export default PlatformQuizCollections;