import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import PlatformBanner from "../components/PlatformBanner";
import Home from '../tabs/Home';
import PlatformQuizzes from '../tabs/PlatformQuizzes';
import PlatformQuizCollections from '../tabs/PlatformQuizCollections';
import Collaborators from '../tabs/Collaborators';
import PlatformAbout from '../tabs/PlatformAbout';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Platform = () => {
    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState('home');
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

    const handleTabClick = (name) => {
        setActiveTab(name);
    }

    return (
        <div>
            <PlatformBanner platform={platform} user={user} refetchPlatformData={refetchPlatformData}/>

            <div className="platform-section" style={{ top: user ? '4rem' : '7rem' }}>
                <div className="ui top attached tabular menu platform-tab" style={{ fontSize: '1vw', cursor: 'pointer' }}>
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
                    <div className={`${activeTab === 'quizCollections' ? 'active active-tab' : 'inactive-tab'} platform-tab item`}
                        onClick={() => handleTabClick('quizCollections')}
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
                    {activeTab === 'home' && <Home platform={platform}/>}
                    {activeTab === 'quizzes' && <PlatformQuizzes activeTab={activeTab}/>}
                    {activeTab === 'quizCollections' && <PlatformQuizCollections activeTab={activeTab}/>}
                    {activeTab === 'collaborators' && <Collaborators activeTab={activeTab}/>}
                    {activeTab === 'about' && <PlatformAbout platform={platform} refetchPlatformData={refetchPlatformData}/>}
                </div>
            </div>
        </div>
    );
}
export default Platform;
