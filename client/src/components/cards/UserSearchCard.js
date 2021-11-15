import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const UserSearchCard = (props) => {
    const history = useHistory();

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: props.user ? props.user : ''
        }
    });

    var user;
    if (userData) { 
		user = userData.findUserById;
    }
    
    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: user ? user.profileId : ''
        }
    });

    var profile;
    if (profileData) { 
		profile = profileData.findProfileById;
    }

    const handleClick = () => {
        history.push("/profile/" + user.profileId);
    }

    const followerCount = profile ? profile.followerCount !== 1 ? profile.followerCount + ' Followers' : profile.followerCount + ' Follower' : '';
    const platforms = profile ? profile.platforms.length !== 1 ? profile.platforms.length + ' Platforms' : profile.platforms.length + ' Platform' : '';
    const quizzes = profile ? profile.quizzes.length !== 1 ? profile.quizzes.length + ' Quizzes' : profile.quizzes.length + ' Quiz' : '';

    return (
        <div>
            {profile && 
                <div className="ui fluid card" style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={handleClick}>
                    <div className="content">
                        <Grid verticalAlign="middle">
                            <Grid.Column width={4} style={{ textAlign: 'center' }}>
                                <Image className="card-image creator-circle ui avatar image" src={profile && profile.profileImg}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                            <div>
                                <h3> {user && user.username} </h3>
                                <div> {profile && followerCount} </div>
                                <div> {profile && platforms} </div>
                                <div> {profile && quizzes} </div>
                                {profile && profile.description !== '' &&
                                    <div>
                                        <br/>
                                        {profile.description}
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

export default UserSearchCard;