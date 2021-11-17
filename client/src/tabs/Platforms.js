import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

import PlatformCards from '../components/cards/PlatformCards';
import PlatformCreationModal from '../modals/PlatformCreationModal';
import PlatformDeletionModal from '../modals/PlatformDeletionModal';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Platforms = (props) => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const profileId = params ? params.profileId : 'could not get params';

    const [DeletePlatform] 			        = useMutation(mutations.DELETE_PLATFORM);

    var profile;
    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: profileId
        }
    });

    if(profileData) {
        profile = profileData.findProfileById;
    }

    var platforms;
    const { data: platformsData, refetch: refetchPlatformsData } = useQuery(queries.FIND_PLATFORMS_BY_IDS, {
        variables: {
            ids: profile.platforms
        }
    });

    if(platformsData) { 
        platforms = platformsData.findPlatformsByIds; 
    }

    var isOwner;
    if(profile && user) {
        isOwner = profile.user === user._id;
    }

    const [showCreationMenu, setShowCreationMenu] = useState(false);
    const [showPlatformDeletionModal, setShowPlatformDeletionModal] = useState(false);
    const [removePlatform, setRemovePlatform] = useState('');
    const [editingMode, toggleEditingMode] = useState(false);
  
    const handleCancel = () => {
        toggleEditingMode(false);
    }

    const handleSave = () => {
        setTimeout(() => {
            refetchProfileData();
        }, 300);
        handleCancel();
    }

    const deletePlatform = async (platformId) => {
        await DeletePlatform({variables: { platformId: platformId }});
        refetchProfileData();
        refetchPlatformsData();
    }

    useEffect(() => {
        refetchProfileData();
        refetchPlatformsData();
    }, [user, profile, platforms, refetchProfileData, refetchPlatformsData]);

    return (
        <Grid>
            <Grid.Column width={12}>
                {platforms && <PlatformCards platforms={platforms} profile={profile} activeTab={props.activeTab} editingMode={editingMode}
                                setShowPlatformDeletionModal={setShowPlatformDeletionModal} setRemovePlatform={setRemovePlatform} user={user}/>
                }
            </Grid.Column>
            <Grid.Column width={4}>
                {
                    isOwner && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => toggleEditingMode(!editingMode)}>
                            Edit
                        </button>  
                    </div>
                }
                {
                    isOwner && !editingMode &&
                    <div>
                        <button className="ui button edit-button" style={{ float: 'right' }} onClick={() => {setShowCreationMenu(true)}}>
                            Create
                        </button>
                    </div>
                }
                {
                    editingMode &&
                    <div>
                        <button className="ui button cancel-button" style={{ float: 'right' }} onClick={handleCancel}>
                            Cancel
                        </button>  
                        <button className="ui button save-button" style={{ float: 'right' }} onClick={handleSave}>
                            Save
                        </button>  
                    </div>
                }
            </Grid.Column>
            {
                showCreationMenu && (<PlatformCreationModal setShowCreationMenu={setShowCreationMenu} refetchProfileData={refetchProfileData}/>)
            }
            {
                showPlatformDeletionModal && (<PlatformDeletionModal setShowPlatformDeletionModal={setShowPlatformDeletionModal}
                                            deletePlatform={deletePlatform} removePlatform={removePlatform}/>)
            }
        </Grid>
    );
}
export default Platforms;