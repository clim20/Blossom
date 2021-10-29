import React from 'react';

import PlatformCard from './PlatformCard';

function PlatformCards(props) {  
    return (
        <div className="ui very relaxed horizontal list big">
            {
                props.platforms.map((entry, index) => (
                    <PlatformCard
                        platform={entry} key={index}
                    />
                ))
            }
        </div>
    );
}

export default PlatformCards;