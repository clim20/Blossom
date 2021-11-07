import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';
import Home from '../tabs/Home';
import Quizzes from '../tabs/Quizzes';
import Platforms from '../tabs/Platforms';
import Collections from '../tabs/Collections';
import Following from '../tabs/Following';
import Badges from '../tabs/Badges';
import ProfileAbout from '../tabs/ProfileAbout';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('home');
    const [followed, setFollowed ] = useState(false);
    const params = useParams();
    const profileId = params ? params.profileId : 'could not get params';

    useEffect(() => {
        if (params) {
            setActiveTab('home');
        }
    }, [params]);

    // Profile Page user is on
    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: profileId
        }
    });

    var profile = {};
    if (profileData) { 
		profile = profileData.findProfileById;
    }

    // User's own User and Profile
    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: profile ? profile.user : ''
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }

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
        if (userProfile && profile && userProfile.following.find(id => id.toString() === profile.user.toString())) {
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }, [userProfile, profile]);
    
    const [followProfile] = useMutation(mutations.FOLLOW_PROFILE, {
        variables: {
            userId: user ? user._id : '',
            profileId: profile ? profile._id : ''
        }
    });

    const handleFollow = () => {
        followProfile();
        setTimeout(() => {
            refetchProfileData();
            refetchUserProfileData();
        }, 300);
    }

    useEffect(() => {
        refetchProfileData();
    }, [user, profile]);

    const isOwnProfile = profile && user && profile.user === user._id;

    return (
        <div>
            <MenuBar/>
            <div className="ui container banner-header"
                style={{ backgroundImage: `url(${profile.bannerImg})` }}
            >
                <div className="banner-info">
                    <div className="display-inline-block">
                        <img className="card-image creator-circle ui avatar image"
                            src={profile.profileImg}
                            alt="creator profile"
                        />
                    </div>
                    {profile && profile.user && 
                        <div className="banner-text">
                            <h2 style={{ marginBottom: '0' }}>{userObject.username}</h2>
                            <div>{profile.followerCount} followers</div>
                        </div>
                    }
                </div>

                {user && !isOwnProfile &&
                    <button className="ui button follow-button" onClick={handleFollow}>
                        {followed ? 'Unfollow' : 'Follow'}
                    </button>
                }
            </div>

            <div className="ui container profile-section">
                <div className="ui top attached tabular menu profile-tab">
                    <div className={`${activeTab === 'home' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('home')}
                    >
                        HOME
                    </div>
                    <div className={`${activeTab === 'quizzes' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('quizzes')}
                    >
                        QUIZZES
                    </div>
                    <div className={`${activeTab === 'platforms' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('platforms')}
                    >
                        PLATFORMS
                    </div>
                    <div className={`${activeTab === 'collections' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('collections')}
                    >
                        COLLECTIONS
                    </div>
                    <div className={`${activeTab === 'following' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('following')}
                    >
                        FOLLOWING
                    </div>
                    <div className={`${activeTab === 'badges' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('badges')}
                    >
                        BADGES
                    </div>
                    <div className={`${activeTab === 'about' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('about')}
                    >
                        ABOUT
                    </div>
                </div>

                <div className="ui bottom attached active tab segment profile-content">
                    {activeTab === 'home' && <Home profile={profile}/>}
                    {activeTab === 'quizzes' && <Quizzes profile={profile}/>}
                    {activeTab === 'platforms' && <Platforms profile={profile} activeTab={activeTab}/>}
                    {activeTab === 'collections' && <Collections profile={profile}/>}
                    {activeTab === 'following' && <Following profile={profile}/>}
                    {activeTab === 'badges' && <Badges profile={profile}/>}
                    {activeTab === 'about' && <ProfileAbout profile={profile} refetchProfileData={refetchProfileData}/>}
                </div>
            </div>
        </div>
  );
}

export default Profile;