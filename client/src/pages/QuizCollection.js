import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const QuizCollection = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();

    const params = useParams();
    const quizCollectionId = params ? params.quizCollectionId : 'could not get params';

    const { data: quizCollectionData, refetch: refetchQuizCollectionData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_ID, {
        variables: {
            id: quizCollectionId
        }
    });

    var quizCollection = {};
    if (quizCollectionData) { 
		quizCollection = quizCollectionData.findQuizCollectionById;
    }

    return (
        <div>
            {
                quizCollection && 
                <div> {quizCollection.name} </div>
            }
        </div>
    );
}
export default QuizCollection;