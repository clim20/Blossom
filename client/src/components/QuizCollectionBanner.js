import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from "react-router-dom";
import { Button, Input, Dropdown, Icon, Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const QuizCollectionBanner = (props) => {
    const { data: profileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.user ? props.user.profileId : []
        }
    });

    var profile = {};
    if (profileData) { 
		profile = profileData.findProfileById;
    }

    const { data: quizCollectionData } = useQuery(queries.FIND_QUIZ_COLLECTION_BY_IDS, {
        variables: {
            ids: profile ? profile.quizCollections : []
        }
    });

    var quizCollections = {};
    if (quizCollectionData) { 
		quizCollections = quizCollectionData.findQuizCollectionByIds;
    }

    const [quizCollectionImage, setQuizCollectionImage] = useState('');

    const uploadImage = async (type) => {
        const data = new FormData();
        data.append("file", quizCollectionImage);
        data.append("upload_preset", "blossom");
        data.append("cloud_name", "blossom-images");
        await fetch("https://api.cloudinary.com/v1_1/blossom-images/image/upload", {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (type === 'quizCollection') {
                props.setUpdatedQuizCollection({
                    img: data.secure_url,
                    name: props.updatedQuizCollection.name,
                    description: props.updatedQuizCollection.description,
                    quizzes: props.updatedQuizCollection.quizzes
                });
            }
            props.saveChanges();
            setTimeout(() => {
                props.refetchQuizCollectionData();
            }, 300);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleDescriptionEdit = (e) => {
        const newDescription = e.target.value ? e.target.value : props.updatedQuizCollection.description;
        props.setUpdatedQuizCollection({
            img: props.updatedQuizCollection.img,
            name: props.updatedQuizCollection.name,
            quizzes: props.updatedQuizCollection.quizzes,
            description: newDescription,
        });
        props.saveChanges();
    }

    const handleNameChange = (e) => {
        const newName = e.target.value ? e.target.value : props.quizCollection.name;
        var dup = false;
        for (let i = 0; i < quizCollections.length; i++) {
            if (newName === props.updatedQuizCollection.name){
                dup = true;
                break;
            }
            else if (quizCollections[i].name === newName) {
                dup = true;
                alert("Can't resuse an existing quizCollection name, old name will remain");
                break;
            }
        }
        if (!dup) {
            props.setUpdatedQuizCollection({
                img: props.updatedQuizCollection.img,
                name: newName,
                quizzes: props.updatedQuizCollection.quizzes,
                description: props.updatedQuizCollection.description,
            });
        }
    }

    const handleCancel = () => {
        props.toggleEditingMode(false);
        setQuizCollectionImage('');
        props.setUpdatedQuizCollection({
            img: props.updatedQuizCollection.img,
            name: props.updatedQuizCollection.name,
            description: props.updatedQuizCollection.description,
            quizzes: props.updatedQuizCollection.quizzes
        });
        props.refetchQuizCollectionData();
    }

    const handleSave = (e) => {
        if (quizCollectionImage) { 
            uploadImage('quizCollection');
        }
        props.saveChanges();
        handleCancel();
    }

    useEffect(() => {
        props.refetchQuizCollectionData();
    }, [props.user, props.updatedQuizCollection, props.refetchQuizCollectionData]);

    const isOwnQuizCollection = props.quizCollection && props.user && props.quizCollection.creator === props.user._id;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={6}>
                    <img width='360px' height='200px'
                        src={props.updatedQuizCollection && props.updatedQuizCollection.img}
                        alt="quizCollection"
                    />
                    {
                        props.editingMode &&
                        <label htmlFor="upload-banner-image">
                            <span className="dot" style={{ position: 'relative', float: 'right', opacity:'90%' }}/>
                            <i className="pencil alternate icon" style={{ position: 'absolute', top: '12px', right: '10px' }}/>
                            <input type="file" name="quizCollection" id="upload-banner-image" accept="image/png, image/jpeg"
                                onChange={(e) => {setQuizCollectionImage(e.target.files[0])}}
                            />
                        </label>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                    {
                        !props.editingMode && props.quizCollection && 
                        <div>
                            <h2>{props.updatedQuizCollection.name}</h2>
                            <h2>{props.updatedQuizCollection.description}</h2>
                        </div>
                    }
                    {
                        props.editingMode && props.updatedQuizCollection && 
                        <div>
                            <textarea
                                name='name'
                                defaultValue={props.updatedQuizCollection.name}
                                onBlur={handleNameChange}
                            />
                            <textarea  
                                name='description'
                                defaultValue={props.updatedQuizCollection.description}
                                onBlur={handleDescriptionEdit}
                            />
                        </div>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                {
                    props.user && isOwnQuizCollection && !props.editingMode &&
                    <button className="ui button qc-edit-button" onClick={() => props.toggleEditingMode(true)}>
                        Edit
                    </button>  
                }
                {
                    props.editingMode &&
                    <div className="editBannerButtons">
                        <button className="ui button qc-cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>  
                        <button className="ui button qc-save-button" onClick={handleSave}>
                            Save
                        </button>  
                    </div>
                }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
export default QuizCollectionBanner;