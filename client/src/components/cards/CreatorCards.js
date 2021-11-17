import React from 'react';

import CreatorCard from './CreatorCard';

const CreatorCards = (props) => {  
    const creatorCardClass = props.activeTab ? "ui three cards doubling stackable grid container" : "ui four cards doubling stackable grid container";

    return (
        <div>
            <br/>
            <div className={creatorCardClass}>
                {
                    props.users.map((entry, index) => (
                        <CreatorCard
                            user={entry} key={index} activeTab={props.activeTab} platform={props.platform}
                            editingMode={props.editingMode} 
                            setShowCollaboratorRemovalModal={props.setShowCollaboratorRemovalModal} setRemoveUser={props.setRemoveUser}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default CreatorCards;