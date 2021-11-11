import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Modal } from 'semantic-ui-react';

import * as queries from '../cache/queries';

const PlatformDeletionModal = (props) => {
    const { data: platformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.removePlatform ? props.removePlatform : {}
        }
    });

    var platformObject = {};
    if (platformData) { 
		platformObject = platformData.findPlatformById;
    }

    const handleRemoval = async () => {
        props.deletePlatform(props.removePlatform);
        props.setShowPlatformDeletionModal(false);
    }

    return (
        <Modal
        size="tiny"
        open={true}
        onClose={() => props.setShowPlatformDeletionModal(false)}
        >
            <Modal.Header>CONFIRMATION</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    Are you sure you want to delete this platform?
                </span>
            </Modal.Content>
            <span className="creation-modal">
                    {platformObject.name}
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
                    onClick={() => props.setShowPlatformDeletionModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default PlatformDeletionModal;