import React from 'react';

import PlatformCard from './PlatformCard';

function PlatformCards(props) {  
    const platformCardClass = props.activeTab ? "ui very relaxed horizontal list medium" : "ui five cards";

    return (
        <div>
            <br/>
            <div className={platformCardClass}>
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
        </div>
    );
}

export default PlatformCards;