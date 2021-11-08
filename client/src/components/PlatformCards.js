import React from 'react';

import PlatformCard from './PlatformCard';

function PlatformCards(props) {  
    return (
        <div className="ui very relaxed horizontal list medium">
            {
                props.platforms.map((entry, index) => (
                    <PlatformCard
                        platform={entry} key={index} 
                        profile={props.profile} activeTab={props.activeTab} editingMode={props.editingMode}
                        deletePlatform={props.deletePlatform} user={props.user}
                    />
                ))
            }
        </div>
    );
}

export default PlatformCards;