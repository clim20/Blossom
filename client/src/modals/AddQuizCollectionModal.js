import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Modal, Dropdown } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const AddQuizCollectionModal = (props) => {
    const { user } = useContext(AuthContext);

    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: user.profileId
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
    var options =  [];
    if(quizCollectionsData) { 
        quizCollections = quizCollectionsData.findQuizCollectionByIds; 
        if(props.platformQuizCollections){
            for(let i = 0; i < props.platformQuizCollections.length; i++){
                quizCollections = quizCollections.filter(quizCollection => quizCollection._id.toString() !== props.platformQuizCollections[i]._id.toString());
            }
        }

        options = quizCollections.map((entry, index) => ({
            key: index,
            text: entry.name,
            value: entry._id,
            selected: false,
        }));
    }

    const [placeholder, setPlaceholder] = useState(options.length > 0 ? "Select A Quiz Collection To Add" : "No Quiz Collections Addable");
    const [quizCollectionId, setQuizCollectionId] = useState({});
    
    const handleSubmit = async () => {
        if (options.length !== 0){
            setPlaceholder("Select A Quiz Collection To Add");
            props.addQuizCollection(quizCollectionId);
        }
        if (options.length === 1){
            setPlaceholder("No Quiz Collections Addable");
        }
    }

    const handleDropdownClick = async (e, data) => {
        if(e.target.innerText) {
            setPlaceholder(e.target.innerText);
            setQuizCollectionId(data.value);
        }
    }

    return (
        <Modal
        size="tiny"
        open={true}
        >
            <i aria-hidden="true" class="close icon modal-close" onClick={() => props.setShowAddQuizCollectionModal(false)}/>
            <Modal.Header>ADD QUIZ COLLECTION</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    {}
                </span>
                <Dropdown 
                    style={{ width: "50%", textOverflow: "ellipsis" }}
                    selection
                    selectOnBlur={false} 
                    options={options} 
                    text={placeholder}
                    onChange={handleDropdownClick} item/>
            </Modal.Content>
            <br/>
            <div className="creation-modal">
                <Button 
                    className="create-modal-button"
                    onClick={handleSubmit}
                >
                    Add
                </Button>
                {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}
                <Button
                    className="cancel-modal-button"
                    onClick={() => props.setShowAddQuizCollectionModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default AddQuizCollectionModal;