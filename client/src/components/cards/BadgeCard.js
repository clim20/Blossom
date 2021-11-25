import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../../cache/queries';

const BadgeCard = (props) => {
    
    return (
        <div className="item text-align-center cursor-pointer ui card">
            <div className="content">
                <div className="description card-text">
                    <img 
                        src={props.badge && props.badge.image}
                        alt="badge image"
                        width="200"
                        height="150"
                    />
                    <br/>
                    <br/>
                    <div style={{ fontWeight: 'bold' }}> {props.badge && props.badge.description} </div>
                </div>
            </div>
        </div>    
    );
}

export default BadgeCard;