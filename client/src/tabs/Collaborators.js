import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';

import CreatorCards from '../components/CreatorCards';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const Collaborators = () => {
    const { user } = useContext(AuthContext);
    const [showCollaboratorRequests, setShowCollaboratorRequests] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const params = useParams();
    const platformId = params ? params.platformId : 'could not get params';

    var platform;
    const { data } = useQuery(queries.FIND_PLATFORM_BY_ID, {
        variables: {
            id: platformId
        }
    });

	if(data) {
        platform = data.findPlatformById;
    }

    var collaborators;
    const { data: collaboratorData } = useQuery(queries.FIND_COLLABORATORS_BY_IDS, {
        variables: {
            ids: platform.collaborators 
        }
    });

	if(collaboratorData) {
        collaborators = collaboratorData.findCollaboratorsByIds;
    }

    return (
        <div>
            {user && 
                    <button className="ui button request-button">
                        Join
                    </button>
                }
            {collaborators && <CreatorCards users={collaborators} />}
        </div>
    );
}
export default Collaborators;