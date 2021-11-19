import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const QuizCollectionSearchCard = (props) => {
    console.log(props)
    const history = useHistory();

    const { data: quizCollectionData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_ID, {
        variables: {
            id: props.quizCollection ? props.quizCollection : ''
        }
    });

    var quizCollection;
    if(quizCollectionData){
        quizCollection = quizCollectionData.findQuizCollectionById;
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: quizCollection ? quizCollection.creator : ''
        }
    });

    var quizCollectionCreator;
    if(userData){
        quizCollectionCreator = userData.findUserById.username;
    }

    const handleClick = () => {
        history.push("/quizCollection/" + quizCollection._id);
    }
    
    const quizzes = quizCollection ? quizCollection.quizzes.length !== 1 ? quizCollection.quizzes.length + ' Quizzes' : quizCollection.quizzes.length + ' Quiz' : '';

    return (
        <div>
            {quizCollection && 
                <div className="ui fluid card" style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={handleClick}>
                    <div className="content">
                        <Grid verticalAlign="middle">
                            <Grid.Column width={4} style={{ textAlign: 'center' }}>
                                <Image src={quizCollection.img}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                            <div>
                                <h3> {quizCollection && quizCollection.name} </h3>
                                <div> Created by {quizCollectionCreator && quizCollectionCreator.username} </div>
                                <div> {quizCollection && quizzes} </div>
                                {quizCollection && quizCollection.description !== '' &&
                                    <div>
                                        <br/>
                                        {quizCollection.description}
                                    </div>
                                }
                            </div>
                            </Grid.Column>                
                        </Grid>
                    </div>
                </div>
            }
        </div>
    );
}

export default QuizCollectionSearchCard;