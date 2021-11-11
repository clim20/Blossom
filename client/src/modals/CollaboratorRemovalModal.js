import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const CollaboratorRemovalModal = (props) => {
    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.removeUser ? props.removeUser : {}
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

    const handleRemoval = async () => {
        props.removeCollaborator(props.removeUser);
        props.setShowCollaboratorRemovalModal(false);
    }

    return (
        <Modal
        size="tiny"
        open={true}
        onClose={() => props.setShowCollaboratorRemovalModal(false)}
        >
            <Modal.Header>CONFIRMATION</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    Are you sure you want to remove this user's collaborators rights?
                </span>
            </Modal.Content>
            <span className="creation-modal">
                    {userObject.username}
            </span>
            <br/>
            <br/>
            <div className="creation-modal">
                <Button 
                    className="create-modal-button"
                    onClick={handleRemoval}
                >
                    Confirm
                </Button>
                {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}
                <Button
                    className="cancel-modal-button"
                    onClick={() => props.setShowCollaboratorRemovalModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default CollaboratorRemovalModal;