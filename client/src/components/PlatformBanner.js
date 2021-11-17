import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const PlatformBanner = ({ platform, user, refetchPlatformData }) => {
    const [followed, setFollowed ] = useState(false);
    const [editingMode, toggleEditingMode] = useState(false);
    const [platformImage, setPlatformImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');

    const [updatedPlatform, setUpdatedPlatform] = useState({ 
        platformImg: platform.platformImg,
        bannerImg: platform.bannerImg,
        description: platform.description,
        contact: platform.contact 
    });

    // User's own User and Profile
    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: platform ? platform.owner : ''
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

    useEffect(() => {
        if (userProfile && platform && platform._id && userProfile.following.find(id => id.toString() === platform._id.toString())) {
            setFollowed(true);
        } else {
            setFollowed(false);
        }
    }, [userProfile, platform]);
    
    const [followPlatform] = useMutation(mutations.FOLLOW_PLATFORM, {
        variables: {
            userId: user ? user._id : '',
            platformId: platform ? platform._id : ''
        }
    });

    const handleFollow = () => {
        followPlatform();
        setTimeout(() => {
            refetchPlatformData();
            refetchUserProfileData();
        }, 300);
    }

    useEffect(() => {
        refetchPlatformData();
    }, [user, platform, refetchPlatformData]);

    const uploadImage = async (type) => {
        const image = type === 'platform' ? platformImage : bannerImage;

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "blossom");
        data.append("cloud_name", "blossom-images");
        await fetch("https://api.cloudinary.com/v1_1/blossom-images/image/upload", {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (type === 'platform') { 
                setUpdatedPlatform({
                    platformImg: data.secure_url,
                });
            } 
            if (type === 'banner') {
                setUpdatedPlatform({
                    bannerImg: data.secure_url
                });
            }
            saveChanges();
            setTimeout(() => {
                refetchPlatformData();
            }, 300);
            handleCancel();
            setUpdatedPlatform({
                platformImg: updatedPlatform.platformImg,
                bannerImg: updatedPlatform.bannerImg
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleCancel = () => {
        toggleEditingMode(false);
        setPlatformImage('');
        setBannerImage('');
        setUpdatedPlatform({
            platformImg: platform.platformImg,
            bannerImg: platform.bannerImg
        });
    }

    var [saveChanges] = useMutation(mutations.EDIT_PLATFORM, {
        variables: {
            id: platform._id,
            updatedPlatform: updatedPlatform
        }
    });

    const handleSave = () => {
        if (platformImage) { 
            uploadImage('platform');
        }
        if (bannerImage) {
            uploadImage('banner');
        } 
        if (!platformImage && !bannerImage) {
            handleCancel();
        }
    }

    const isOwnPlatform = platform && user && platform.owner === user._id;

    return (
        <div>
            <div>
                {!editingMode ?
                    <img className="banner-header"
                        src={platform.bannerImg} alt="banner"
                    />
                    :
                    <div className="hover-image">
                        <label htmlFor="upload-banner-image" style={{ width: '100%' }}>
                            <img className="banner-header" style={{ cursor: 'pointer' }}
                                src={platform.bannerImg} alt="banner"
                            />
                            <i class="camera icon" style={{ top: '25%' }}/>
                            <input type="file" name="banner" id="upload-banner-image" accept="image/png, image/jpeg"
                                onChange={(e) => setBannerImage(e.target.files[0])}
                            />
                        </label>
                    </div>
                }
            </div>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <div className="banner-info" style={{ bottom: user ? '-2rem' : '-5rem' }}>
                            <div className="display-inline-block">
                                {!editingMode ?
                                    <img className="card-image platform-circle ui avatar image platform-image"
                                        src={platform.platformImg} alt="platform"
                                    />
                                    :
                                    <label htmlFor="upload-platform-image" className="hover-image" style={{ position: 'relative' }}>
                                        <img className="card-image platform-circle ui avatar image platform-image"
                                            src={platform.platformImg} alt="platform"
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <i class="camera icon"/>
                                        <input type="file" name="platform" id="upload-platform-image" accept="image/png, image/jpeg"
                                            onChange={(e) => setPlatformImage(e.target.files[0])}
                                        />
                                    </label>
                                }
                            </div>

                            {platform && platform.owner && 
                                <div className="banner-text">
                                    <h2 style={{ marginBottom: '0' }}>{platform.name}</h2>
                                    <div>{platform.followerCount} followers</div>
                                </div>
                            }
                        </div>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        {user && !isOwnPlatform &&
                            <button className="ui button follow-button" onClick={handleFollow}>
                                {followed ? 'Unfollow' : 'Follow'}
                            </button>
                        }

                        {user && isOwnPlatform && !editingMode &&
                            <button className="ui button follow-button" style={{ float: 'right' }} onClick={() => toggleEditingMode(!editingMode)}>
                                Edit
                            </button>
                        }

                        {editingMode &&
                            <div className="editBannerButtons">
                                <button className="ui button cancel-button" style={{ float: 'right' }} onClick={handleCancel}>
                                    Cancel
                                </button>  
                                <button className="ui button save-button" style={{ float: 'right' }} onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default PlatformBanner;