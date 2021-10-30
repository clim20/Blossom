import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';
import { AuthContext } from '../context/auth';

import MenuBar from '../components/MenuBar';

const Update = () => {
    let userRef = React.useRef();
    let inputRef = React.useRef('');

    const { user } = useContext(AuthContext);
    const params = useParams();
    const userId = params ? params.userId : 'could not get params';

    const { data } = useQuery(queries.GET_USERS);

    var user = {};
    if (data) {
        user = data.findUserById;
    }
    
    const handleChange = (newUsername) => {
        if(data.includes(user.id)){
            console.log('The username is already taken')
        }else{
            useMutation(mutations.UPDATE_USERNAME(user.id, newUsername));
        }
    }

    return (
        <div>
            <MenuBar/>
            <div className="update-account">Update Account</div>
            <div className="username">Username</div>
            <div className="username-1"></div>
            <div className="new-username">New Username</div>
            <input type="text" ref={inputRef}/>
            <button onClick={() => handleChange}>Update Username</button>
            <Username ref={userRef}/>
        </div>
    );
}
export default Update;