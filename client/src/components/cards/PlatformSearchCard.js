import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const PlatformSearchCard = (props) => {
    const history = useHistory();
    
    const { data: platformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: props.platform ? props.platform : ''
        }
    });

    var platform;
    if (platformData) { 
		platform = platformData.findPlatformById;
    }

    const { data: ownerData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: platform ? platform.owner : ''
        }
    });

    var owner;
    if (ownerData) { 
		owner = ownerData.findUserById;
    }

    const handleClick = () => {
        history.push("/platform/" + platform._id);
    }

    const platformOwner = platform && owner ? 'Owned by ' + owner.username : '';
    const followerCount = platform ? platform.followerCount !== 1 ? platform.followerCount + ' Followers' : platform.followerCount + ' Follower' : '';
    const collaborators = platform ? platform.collaborators.length !== 1 ? platform.collaborators.length + ' Collaborators' : platform.collaborators.length + ' Collaborator' : '';
    const quizzes = platform ? platform.quizzes.length !== 1 ? platform.quizzes.length + ' Quizzes' : platform.quizzes.length + ' Quiz' : '';

    return (
        <div>
            {platform && 
                <div className="ui fluid card" style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={handleClick}>
                    <div className="content">
                        <Grid verticalAlign="middle">
                            <Grid.Column width={4} style={{ textAlign: 'center' }}>
                                <Image className="card-image platform-circle ui avatar image" src={platform && platform.platformImg}/>
                            </Grid.Column>
                            <Grid.Column width={12}>
                            <div>
                                <h3> {platform && platform.name} </h3>
                                <div> {platform && platformOwner} </div>
                                <div> {platform && followerCount} </div>
                                <div> {platform && collaborators} </div>
                                <div> {platform && quizzes} </div>
                                {platform && platform.description !== '' &&
                                    <div>
                                        <br/>
                                        {platform.description}
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

export default PlatformSearchCard;