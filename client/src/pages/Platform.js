import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';
import Home from '../tabs/Home';
import Quizzes from '../tabs/Quizzes';
import Collections from '../tabs/Collections';
import Collaborators from '../tabs/Collaborators';
import PlatformAbout from '../tabs/PlatformAbout';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Platform = () => {
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('home');
    const [followed, setFollowed ] = useState(false);
    const params = useParams();
    const platformId = params ? params.platformId : 'could not get params';

    // Platform page user is on
    const { data: PlatformData, refetch: refetchPlatformData } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: platformId
        }
    });

    var platform = {};
    if (PlatformData) { 
		platform = PlatformData.findPlatformById;
    }

    // User's own User and Profile
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

    const { data: userProfileData, refetch: refetchUserProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: user ? user.profileId : ''
        }
    });

    var userProfile = { following: [] };
    if (userProfileData) { 
        userProfile = userProfileData.findProfileById;
    }

    const handleTabClick = (name) => {
        setActiveTab(name);
    }

    useEffect(() => {
        if (userProfile && platform && userProfile.following.find(id => id.toString() === platform._id.toString())) {
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }, [userProfile, platform]);
    
    const [followPlatform] = useMutation(mutations.FOLLOW_PLATFORM, {
        variables: {
            userId: user._id,
            platformId: platform._id
        }
    });

    const handleFollow = () => {
        followPlatform();
        setTimeout(() => {
            refetchPlatformData();
            refetchUserProfileData();
        }, 300);
    }

    const isOwnPlatform = platform && user && platform.owner === user._id;

    return (
        <div>
            <MenuBar/>
            <div className="ui container banner-header"
                style={{ backgroundImage: `url(${platform.bannerImg})` }}
            >
                <div className="banner-info">
                    <div className="display-inline-block">
                        <img className="card-image platform-circle ui avatar image"
                            src={platform.platformImg}
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

                {!isOwnPlatform && 
                    <button className="ui button follow-button" onClick={handleFollow}>
                        {followed ? 'Unfollow' : 'Follow'}
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
                    {activeTab === 'about' && <PlatformAbout platform={platform} refetchPlatformData={refetchPlatformData}/>}
                </div>
            </div>
        </div>
    );
}
export default Platform;
