import React from 'react';

import BadgeCard from './BadgeCard';

const BadgeCards = (props) => {  
    const badgeCardClass = "ui three cards doubling stackable grid container";
    const uniq = [...new Set(props.badges)];
    return (
        <div>
            <br/>
            <div className={badgeCardClass}>
                {
                    uniq.map((entry, index) => (
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