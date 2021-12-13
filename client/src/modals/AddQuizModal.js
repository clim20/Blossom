import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Modal, Dropdown } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const AddQuizModal = (props) => {
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

    const { data: quizData, refetch: refetchQuizData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: profile ? profile.quizzes : []
        }
    });

    var quizzes = [];
    var options =  [];
    if(quizData) { 
        quizzes = quizData.findQuizzesByIds; 
        if(props.platformQuizzes){
            for(let i = 0; i < props.platformQuizzes.length; i++){
                quizzes = quizzes.filter(quiz => quiz._id.toString() !== props.platformQuizzes[i]._id.toString());
            }
        }

        options = quizzes.map((entry, index) => ({
            key: index,
            text: entry.title,
            value: entry._id,
            selected: false,
        }));
    }

    const [placeholder, setPlaceholder] = useState(options.length > 0 ? "Select A Quiz To Add" : "No Quiz Addable");
    const [quizId, setQuizId] = useState({});
    
    const handleSubmit = async () => {
        if (options.length !== 0){
            setPlaceholder("Select A Quiz To Add");
            props.addQuiz(quizId);
        }
        if (options.length === 1){
            setPlaceholder("No Quiz Addable");
        }
    }

    const handleDropdownClick = async (e, data) => {
        console.log(quizzes);
        if(e.target.innerText) {
            setPlaceholder(e.target.innerText);
            setQuizId(data.value);
        }
    }

    // useEffect(() => {
    //     refetchQuizData();
    //     options = quizzes.map((entry, index) => ({
    //         key: index,
    //         text: entry.name,
    //         value: entry._id,
    //         selected: false,
    //     }));
    //     setPlaceholder(options.length > 0 ? "Select A Quiz To Add" : "No Quiz Addable");
    // }, [refetchQuizData]);

    return (
        <Modal
        size="tiny"
        open={true}
        >
            <i aria-hidden="true" class="close icon modal-close" onClick={() => props.setShowAddQuizModal(false)}/>
            <Modal.Header>ADD QUIZ</Modal.Header>
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
                    onClick={() => props.setShowAddQuizModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default AddQuizModal;