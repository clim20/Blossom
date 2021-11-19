import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

import QuizCollectionBanner from "../components/QuizCollectionBanner";
import QuizCollectionQuizCard from '../components/cards/QuizCollectionQuizCard';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const QuizCollection = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const [editingMode, toggleEditingMode] = useState(false);

    const [updatedQuizCollection, setUpdatedQuizCollection] = useState({ 
        img: quizCollection ? quizCollection.img : "",
        name: quizCollection ? quizCollection.name : "",
        description: quizCollection ? quizCollection.description : "",
        quizzes: quizCollection ? quizCollection.quizzes : []
    });

    const params = useParams();
    const quizCollectionId = params ? params.quizCollectionId : 'could not get params';

    const { data: quizCollectionData, refetch: refetchQuizCollectionData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_ID, {
        variables: {
            id: quizCollectionId
        },
        onCompleted: data => setUpdatedQuizCollection({
            img: data.findQuizCollectionById.img,
            name: data.findQuizCollectionById.name,
            description: data.findQuizCollectionById.description,
            quizzes: data.findQuizCollectionById.quizzes
        })
    });

    var quizCollection = {};
    if (quizCollectionData) { 
		quizCollection = quizCollectionData.findQuizCollectionById;
    }

    const { data: quizzesData, refetch: refetchQuizzesData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: quizCollection ? quizCollection.quizzes : []
        }
    });

    var quizzes;
    if(quizzesData) { 
        quizzes = quizzesData.findQuizzesByIds; 
    }

    useEffect(() => {
        refetchQuizCollectionData();
    }, [updatedQuizCollection]);

    var [saveChanges] = useMutation(mutations.EDIT_QUIZ_COLLECTION, {
        variables: {
            id: quizCollection._id,
            updatedQuizCollection: updatedQuizCollection
        }
    });

    const [DeleteQuizCollection] = useMutation(mutations.DELETE_QUIZ_COLLECTION);

    const deleteQuizCollection = async () => {
        await DeleteQuizCollection({variables: { quizCollectionId: quizCollection._id }});
        history.push("/");
    }

    return (
        <div>
            <QuizCollectionBanner quizCollection={quizCollection} user={user} refetchQuizCollectionData={refetchQuizCollectionData}
                editingMode={editingMode} toggleEditingMode={toggleEditingMode} saveChanges={saveChanges}
                updatedQuizCollection={updatedQuizCollection} setUpdatedQuizCollection={setUpdatedQuizCollection}
            />
            <div className="ui divider"/>
            <div className="qc-section">
            {
                quizzes && quizzes.map((entry, index) => (
                    <QuizCollectionQuizCard
                        quiz={entry} key={index} index={index} user={user} quizCollection={quizCollection}
                        editingMode={editingMode} saveChanges={saveChanges}
                        refetchData={refetchQuizCollectionData}
                        updatedQuizCollection={updatedQuizCollection} setUpdatedQuizCollection={setUpdatedQuizCollection}
                    />
                ))
            }
            </div>
            <br/>
            {
                editingMode && <button className="ui button qc-delete-button" onClick={deleteQuizCollection}>
                    Delete
                </button>
            }
        </div>
    );
}
export default QuizCollection;