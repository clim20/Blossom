import React from 'react';

import CreatorCard from './CreatorCard';

function CreatorCards(props) {  
    return (
        <div className="ui very relaxed horizontal list big">
            {
                props.users.map((entry, index) => (
                    <CreatorCard
                        user={entry} key={index}
                    />
                ))
            }
        </div>
    );
}

export default CreatorCards;