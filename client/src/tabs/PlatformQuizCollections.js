import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

import QuizCollectionCards from '../components/QuizCollectionCards';
import QuizCollectionRemovalModal from '../modals/QuizCollectionRemovalModal';

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

    const removeQuizCollection = async (quizCollectionId) => {
        await RemoveQuizCollection({variables: { platformId: platform._id, quizCollectionId: quizCollectionId }});
        refetchPlatformData();        
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
                quizCollections && <QuizCollectionCards platform={platform} quizCollections={quizCollections} activeTab={props.activeTab} editingMode={editingMode} user={user}
                                refetchData={refetchPlatformData} setShowQuizCollectionRemovalModal={setShowQuizCollectionRemovalModal} setQuizCollectionName={setQuizCollectionName}/>
            }
            {
                showQuizCollectionRemovalModal && (<QuizCollectionRemovalModal setShowQuizCollectionRemovalModal={setShowQuizCollectionRemovalModal}
                                                removeQuizCollection={removeQuizCollection} quizCollectionName={quizCollectionName}/>)
            }
        </div>
    );
}
export default PlatformQuizCollections;