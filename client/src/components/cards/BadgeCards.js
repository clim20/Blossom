import React from 'react';

import BadgeCard from './BadgeCard';

const BadgeCards = (props) => {  
    const badgeCardClass = "ui three cards doubling stackable grid container";

    return (
        <div>
            <br/>
            <div className={badgeCardClass}>
                {
                    props.badges.map((entry, index) => (
                        <BadgeCard
                            badge={entry} key={index} activeTab={props.activeTab}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default BadgeCards;