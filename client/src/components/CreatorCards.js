import React from 'react';

import CreatorCard from './CreatorCard';

const CreatorCards = (props) => {  
    return (
        <div className="ui very relaxed horizontal list medium">
            {
                props.users.map((entry, index) => (
                    <CreatorCard
                        user={entry} key={index} activeTab={props.activeTab} platform={props.platform}
                        editingMode={props.editingMode} removeCollaborator={props.removeCollaborator}
                    />
                ))
            }
        </div>
    );
}

export default CreatorCards;