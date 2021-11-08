import React from 'react';

import PlatformCard from './PlatformCard';

function PlatformCards(props) {  
    return (
        <div className="ui very relaxed horizontal list medium">
            {
                props.platforms.map((entry, index) => (
                    <PlatformCard
                        platform={entry} key={index} user={props.user}
                        profile={props.profile} activeTab={props.activeTab} editingMode={props.editingMode}
                        setShowPlatformDeletionModal={props.setShowPlatformDeletionModal} setRemovePlatform={props.setRemovePlatform}
                    />
                ))
            }
        </div>
    );
}

export default PlatformCards;