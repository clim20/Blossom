import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';
import Home from '../tabs/Home';
import Quizzes from '../tabs/Quizzes';
import Collections from '../tabs/Collections';
import Collaborators from '../tabs/Collaborators';
import About from '../tabs/About';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Platform = () => {
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('home');
    const params = useParams();
    const platformId = params ? params.platformId : 'could not get params';

    const { data } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: platformId
        }
    });

    var platform = {};
    if (data) { 
		platform = data.findPlatformById;
    }

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: platform.owner
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }
    console.log(userObject);

    const handleTabClick = (name) => {
        setActiveTab(name);
    }

    return (
        <div>
            <MenuBar/>
            <div className="ui container banner-header"
                style={{ backgroundImage: `url(https://img.wallpapersafari.com/desktop/1024/576/75/50/m1YVTq.jpg)` }}
            >
                <div className="banner-info">
                    <div className="display-inline-block">
                        <img className="card-image creator-circle ui avatar image"
                            src="https://i.pinimg.com/originals/36/36/91/363691f9212a3c3184703443c42c7a40.jpg"
                            alt="platform"
                        />
                    </div>
                    {platform && platform.owner && 
                        <div className="banner-text">
                            <h2 style={{ marginBottom: '0' }}>{platform.name}</h2>
                            <div>{platform.followerCount} followers</div>
                        </div>
                    }
                </div>

                {platform && user && userObject.username !== user.username && 
                    <button className="ui button follow-button">
                        Follow
                    </button>
                }
            </div>

            <div className="ui container platform-section">
                <div className="ui top attached tabular menu platform-tab">
                    <div className={`${activeTab === 'home' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('home')}
                    >
                        HOME
                    </div>
                    <div className={`${activeTab === 'quizzes' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('quizzes')}
                    >
                        QUIZZES
                    </div>
                    <div className={`${activeTab === 'collections' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('collections')}
                    >
                        COLLECTIONS
                    </div>
                    <div className={`${activeTab === 'collaborators' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('collaborators')}
                    >
                        COLLABORATORS
                    </div>
                    <div className={`${activeTab === 'about' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('about')}
                    >
                        ABOUT
                    </div>
                </div>

                <div className="ui bottom attached active tab segment platform-content">
                    {activeTab === 'home' && <Home/>}
                    {activeTab === 'quizzes' && <Quizzes/>}
                    {activeTab === 'collections' && <Collections/>}
                    {activeTab === 'collaborators' && <Collaborators/>}
                    {activeTab === 'about' && <About/>}
                </div>
            </div>
        </div>
    );
}
export default Platform;