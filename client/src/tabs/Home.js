import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

const Home = (props) => {
    const history = useHistory();

    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.profile ? props.profile._id : ''
        }
    });

    var profile;
    if (props.profile && profileData) { 
		profile = profileData.findProfileById;
    }

    const { data: platformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform ? props.platform._id : ''
        }
    });

    var platform;
    if (props.platform && platformData) { 
		platform = platformData.findPlatformById;
    }

    const { data: quizData } = useQuery(queries.FIND_QUIZ_BY_ID, {
        variables: {
            id: profile ? profile.featuredQuiz : platform ? platform.featuredQuiz : ''
        }
    });

    var quiz;
    var quizHits = 0;
    if(quizData){
        quiz = quizData.findQuizById;
        quizHits = quiz.quizHits !== 1 ? quiz.quizHits + ' Quiz Hits' : quiz.quizHits + ' Quiz Hit';
    }

    const { data } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: quiz ? quiz.creator : ''
        }
    });

    var quizCreator;
    if(data){
        quizCreator = data.findUserById;
    }

    const handleClick = () => {
        history.push("/quiz/" + quiz._id);
    }

    return (
        <div>
            {quiz && 
                <div class="ui fluid card" style={{ cursor: 'pointer' }} onClick={handleClick}>
                    <div class="content">
                        <Grid>
                            <Grid.Column width={4}>
                                <Image src={quiz.titleImg}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                            <div>
                                <h3> {quiz.title} </h3>
                                <div> {quizHits} </div>
                                <div> Created by {quizCreator.username} </div>
                                <div className="ui hidden divider"></div>
                                <div> {quiz.description} </div>
                            </div>
                            </Grid.Column>                
                        </Grid>
                    </div>
                </div>
            }
        </div>
    );
}
export default Home;