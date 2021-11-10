import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const ProfileBanner = ({ profile, user, refetchProfileData }) => {
    const [followed, setFollowed ] = useState(false);
    const [editingMode, toggleEditingMode] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');

    const [updatedProfile, setUpdatedProfile] = useState({ 
        profileImg: profile.profileImg,
        bannerImg: profile.bannerImg,
        description: profile.description,
        contact: profile.contact 
    });

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

    useEffect(() => {
        if (userProfile && profile && profile.user && userProfile.following.find(id => id.toString() === profile.user.toString())) {
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
    }, [user, profile, refetchProfileData]);

    const uploadImage = async (type) => {
        const image = type === 'profile' ? profileImage : bannerImage;

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
            if (type === 'profile') { 
                setUpdatedProfile({
                    profileImg: data.secure_url,
                });
            } 
            if (type === 'banner') {
                setUpdatedProfile({
                    bannerImg: data.secure_url
                });
            }
            saveChanges();
            setTimeout(() => {
                refetchProfileData();
            }, 300);
            handleCancel();
            setUpdatedProfile({
                profileImg: updatedProfile.profileImg,
                bannerImg: updatedProfile.bannerImg
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleCancel = () => {
        toggleEditingMode(false);
        setProfileImage('');
        setBannerImage('');
        setUpdatedProfile({
            profileImg: profile.profileImg,
            bannerImg: profile.bannerImg
        });
    }

    var [saveChanges] = useMutation(mutations.EDIT_PROFILE, {
        variables: {
            id: profile._id,
            updatedProfile: updatedProfile
        }
    });

    const handleSave = () => {
        if (profileImage) { 
            uploadImage('profile');
        }
        if (bannerImage) {
            uploadImage('banner');
        } 
        if (!profileImage && !bannerImage) {
            handleCancel();
        }
    }

    const isOwnProfile = profile && user && profile.user === user._id;

    return (
        <div className="ui container banner-header"
                style={{ backgroundImage: `url(${profile.bannerImg})` }}
            >
            {editingMode &&
                <label htmlFor="upload-banner-image">
                    <span className="dot" style={{ position: 'absolute', top: '9px', right: '10px', opacity:'90%' }}/>
                    <i className="pencil alternate icon" style={{ position: 'absolute', top: '12px', right: '10px' }}/>
                    <input type="file" name="banner" id="upload-banner-image" accept="image/png, image/jpeg"
                        onChange={(e) => setBannerImage(e.target.files[0])}
                    />
                </label>
            }

                <div className="banner-info">
                    <div className="display-inline-block">
                        <img className="card-image creator-circle ui avatar image"
                            src={profile.profileImg}
                            alt="creator profile"
                        />
                        {editingMode &&
                            <label htmlFor="upload-profile-image">
                                <span className="dot" style={{ position: 'absolute', top: '7px', right: '10px', opacity:'90%' }}/>
                                <i className="pencil alternate icon" style={{ position: 'absolute', top: '10px', right: '10px' }}/>
                                <input type="file" name="profile" id="upload-profile-image" accept="image/png, image/jpeg"
                                    onChange={(e) => setProfileImage(e.target.files[0])}
                                />
                            </label>
                        }
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

                {user && isOwnProfile && !editingMode &&
                    <button className="ui button follow-button" onClick={() => toggleEditingMode(!editingMode)}>
                        Edit
                    </button>  
                }

                {editingMode && 
                    <div className="editBannerButtons">
                        <button className="ui button save-button" onClick={handleSave}>
                            Save
                        </button>  
                        <button className="ui button cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>  
                    </div>
                }

            </div>
    );
}

export default ProfileBanner;