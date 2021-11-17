import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Modal, Input } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import * as mutations from '../cache/mutations';

const PlatformCreationModal = (props) => {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    
    const [inputPlatformName, setInputPlatformName] = useState({ name: '' });
    const [disabled, setDisable] = useState(false);
    const [submitted, setSubmit] = useState(false);

    const [CreatePlatform] 			    = useMutation(mutations.CREATE_PLATFORM);

    const setPlatformName = async (e) => {
		const { name, value } = e.target;
        const updated = { ...inputPlatformName, [name]: value };
		setInputPlatformName(updated);
	}

    const handleSubmit = async () => {
        setSubmit(true);
        if (inputPlatformName.name !== '') {
            const { data } = await CreatePlatform({
                variables: { 
                    owner: user._id, 
                    name: inputPlatformName.name
                }
            });

            var returnedPlatform = {};
            if (data) { 
                returnedPlatform = data.createPlatform;
                console.log(returnedPlatform);
            }

            if (returnedPlatform.name === "") {
                console.log("disable false");
                setDisable(false);
                // error message
            } else{
                console.log("disable true");
                setDisable(true);

                setTimeout(() => {
                    props.setShowCreationMenu(false);
                    props.refetchProfileData();
                }, 300);
            }
        } 
    }

    const message = disabled ? 
        <div className="suc-msg">
            Successfully Created Platform
        </div>
        :
        <div className="err-msg">
            Invalid/Duplicate Platform Name
        </div>
    ;

    const platformName = "Platform Name: \xa0\xa0\xa0\xa0";
    return (
        <Modal
        size="tiny"
        open={true}
        >
            <i aria-hidden="true" class="close icon modal-close" onClick={() => props.setShowCreationMenu(false)}/>
            <Modal.Header>CREATE PLATFORM</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    {platformName}
                </span>
                <Input className='create-modal-input' name='name' placeholder={"Untitled"} onBlur={setPlatformName} inputtype='text'></Input>
            </Modal.Content>
            <div className="creation-modal">
                {submitted && message}
            </div>
            <br/>
            <div className="creation-modal">
                <Button 
                    className="create-modal-button"
                    onClick={handleSubmit}
                    disable={inputPlatformName || inputPlatformName.name === ''}
                >
                    Create
                </Button>
                {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}
                <Button
                    className="cancel-modal-button"
                    onClick={() => props.setShowCreationMenu(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default PlatformCreationModal;