import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Icon, Modal } from 'semantic-ui-react'

import RequestCard from '../components/RequestCard';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const RequestModal = (props) => {

    const { user } = useContext(AuthContext);

    var requests;
    const { data, refetch: refetchRequestData } = useQuery(queries.FIND_COLLABORATORS_BY_IDS, {
        variables: {
            ids: props.platform.requests 
        }
    });

	if(data) {
        requests = data.findCollaboratorsByIds;
    }

    return (
        <Modal
        closeIcon
        size="tiny"
        open={true}
        onClose={() => props.setShowCollaboratorRequests(false)}
        >
            <Modal.Header>REQUESTS</Modal.Header>
            <Modal.Content>
            <p>These users wish to join your platform:</p>
            { requests && <div className="ui very relaxed horizontal list medium">
                {
                    requests.map((entry, index) => (
                        <RequestCard
                            user={entry} key={index} activeTab={props.activeTab} platform={props.platform}
                            setButtonText={props.setButtonText} refetchRequestData={refetchRequestData} refetchPlatformData={props.refetchPlatformData}
                        />
                    ))
                }
            </div>}
            </Modal.Content>
        </Modal>
    );
}
export default RequestModal;