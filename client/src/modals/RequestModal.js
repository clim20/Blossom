import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Modal } from 'semantic-ui-react'

import RequestCard from '../components/cards/RequestCard';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

const RequestModal = (props) => {
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
        size="tiny"
        open={true}
        >
            <i aria-hidden="true" class="close icon modal-close" onClick={() => props.setShowCollaboratorRequests(false)}/>
            <Modal.Header>REQUESTS</Modal.Header>
            <Modal.Content scrolling>
            <p>These users wish to join your platform:</p>
            <br/>
            { requests && <div className="ui two cards">
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