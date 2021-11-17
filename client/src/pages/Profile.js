import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import ProfileBanner from '../components/ProfileBanner';
import Home from '../tabs/Home';
import ProfileQuizzes from '../tabs/ProfileQuizzes';
import Platforms from '../tabs/Platforms';
import ProfileQuizCollections from '../tabs/ProfileQuizCollections';
import Following from '../tabs/Following';
import Badges from '../tabs/Badges';
import ProfileAbout from '../tabs/ProfileAbout';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('home');
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

    const handleTabClick = (name) => {
        setActiveTab(name);
    }

    return (
        <div>
            <ProfileBanner profile={profile} user={user} refetchProfileData={refetchProfileData}/>

            <div className="profile-section" style={{ top: user ? '4rem' : '7rem' }}>
                <div className="ui top attached tabular menu profile-tab" style={{ fontSize: '1vw', cursor: 'pointer' }}>
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
                    <div className={`${activeTab === 'quizCollections' ? 'active active-tab' : 'inactive-tab'} profile-tab item`}
                        onClick={() => handleTabClick('quizCollections')}
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
                    {activeTab === 'quizzes' && <ProfileQuizzes activeTab={activeTab}/>}
                    {activeTab === 'platforms' && <Platforms activeTab={activeTab}/>}
                    {activeTab === 'quizCollections' && <ProfileQuizCollections activeTab={activeTab}/>}
                    {activeTab === 'following' && <Following profile={profile}/>}
                    {activeTab === 'badges' && <Badges profile={profile}/>}
                    {activeTab === 'about' && <ProfileAbout profile={profile} refetchProfileData={refetchProfileData}/>}
                </div>
            </div>
        </div>
  );
}

export default Profile;