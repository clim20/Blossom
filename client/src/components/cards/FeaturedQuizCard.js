import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const FeaturedQuizCard = (props) => {
    const history = useHistory();

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: props.quiz ? props.quiz : ''
        }
    });

    var quiz;
    var quizHits = 0;
    if(quizData){
        quiz = quizData.findQuizById;
        quizHits = quiz.quizHits !== 1 ? quiz.quizHits + ' Quiz Hits' : quiz.quizHits + ' Quiz Hit';
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: quiz ? quiz.creator : ''
        }
    });

    var quizCreator = '';
    if(userData){
        quizCreator = userData.findUserById.username;
    }

    const handleClick = () => {
        history.push("/quiz/" + quiz._id);
    }

    return (
        <div>
            {quiz && 
                <div className="ui fluid card" style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={handleClick}>
                    <div className="content">
                        <Grid verticalAlign="middle">
                            <Grid.Column width={4} style={{ textAlign: 'center' }}>
                                <Image src={quiz.titleImg}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                            <div>
                                <h3> {quiz && quiz.title} </h3>
                                <div> {quiz && quizHits} </div>
                                <div> Created by {quiz && quizCreator} </div>
                                {quiz && quiz.description !== '' &&
                                    <div>
                                        <br/>
                                        {quiz.description}
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

export default FeaturedQuizCard;