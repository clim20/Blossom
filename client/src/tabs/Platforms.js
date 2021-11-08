import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";

import PlatformCards from '../components/PlatformCards';
import PlatformCreationModal from '../modals/PlatformCreationModal';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Platforms = (props) => {
    const { user } = useContext(AuthContext);

    var platforms;
    const { data: platformsData } = useQuery(queries.FIND_PLATFORMS_BY_IDS, {
        variables: {
            ids: props.profile.platforms
        }
    });

    if(platformsData) { 
        platforms = platformsData.findPlatformsByIds; 
    }

    var isOwner;
    if(props.profile && user) {
        isOwner = props.profile.user === user._id;
    }

    const [showCreationMenu, setShowCreationMenu] = useState(false);
    const [editingMode, toggleEditingMode] = useState(false);
  
    return (
        <div>
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
                    <button className="ui button request-button" style={{ float: 'right' }} onClick={() => {setShowCreationMenu(true)}}>
                        Create
                    </button>
                </div>
            }
            {platforms && <PlatformCards platforms={platforms} profile={props.profile} activeTab={props.activeTab}/>}
            {
                showCreationMenu && (<PlatformCreationModal setShowCreationMenu={setShowCreationMenu} refetchProfileData={props.refetchProfileData}/>)
            }
        </div>
    );
}
export default Platforms;