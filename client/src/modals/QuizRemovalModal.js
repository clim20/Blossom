import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const QuizRemovalModal = (props) => {
    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quizName ? props.quizName : {}
        }
    });

    var quiz = {};
    if (quizData) { 
		quiz = quizData.findQuizById;
    }

    const handleRemoval = async () => {
        props.removeQuiz(props.quizName);
        props.setShowQuizRemovalModal(false);
    }

    return (
        <Modal
        size="tiny"
        open={true}
        onClose={() => props.setShowQuizRemovalModal(false)}
        >
            <Modal.Header>CONFIRMATION</Modal.Header>
            <Modal.Content className="creation-modal">
                <span>
                    Are you sure you want to remove this quiz from this platform?
                </span>
            </Modal.Content>
            <span className="creation-modal">
                    {quiz.title}
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
                    onClick={() => props.setShowQuizRemovalModal(false)}
                >
                    Cancel
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default QuizRemovalModal;