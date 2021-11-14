import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const QuizCollectionDeletionModal = (props) => {
    const { data: quizCollectionData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_ID, {
        variables: {
            id: props.quizCollectionName ? props.quizCollectionName : {}
        }
    });

    var quizCollection = {};
    if (quizCollectionData) { 
		quizCollection = quizCollectionData.findQuizCollectionById;
        console.log(quizCollection);
    }

    const handleRemoval = async () => {
        props.deleteQuizCollection(props.quizCollectionName);
        props.setShowQuizCollectionDeletionModal(false);
    }

    return (
        <Modal
        size="tiny"
        open={true}
        onClose={() => props.setShowQuizCollectionDeletionModal(false)}
        >
            <Modal.Header>CONFIRMATION</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    Are you sure you want to delete this collection?
                </span>
            </Modal.Content>
            <span className="creation-modal">
                    {quizCollection.name}
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
                    onClick={() => props.setShowQuizCollectionDeletionModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default QuizCollectionDeletionModal;