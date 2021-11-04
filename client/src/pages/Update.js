import React, { useContext, useState } from 'react';
import { Button, Input } from 'semantic-ui-react'
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';

import MenuBar from '../components/MenuBar';

const Update = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [UpdateUsername] 			        = useMutation(mutations.UPDATE_USERNAME);
    const [inputUsername, setInputUsername] = useState({ name: user.username });

    const [disable, setDisable] = useState(false);
    
    const setUsername = async (e) => {
		const { name, value } = e.target;
        const updated = { ...inputUsername, [name]: value };
		setInputUsername(updated);
	}

    const handleSubmit = async () => {
        console.log(inputUsername.name);
        const { data } = await UpdateUsername({variables: { id: user.id, name: inputUsername.name }});
        if (data === user){
            setDisable(false);
            //error message
        }else{
            setDisable(true);
           //let user know the username has been changed and go back to homepage
        }
		history.push({ pathname: '/'});
    }

    return (
        user ? <div className="update">
            <MenuBar/>
            <div className="update-account">
                Update Account 
            </div>
            <div className="update-username-placeholder1">
                Username:
            </div>
            <div className="update-username">
                {user.username}
            </div>
            <div className="update-username-placeholder2">
                New Username:
            </div>
            <Input 
                className="input-box"
                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                name='name' onBlur={setUsername} autoFocus={false} defaultValue={"New username..."}
                inputType="text"
            />

            <Button 
                className="save-button"
                onClick={handleSubmit}
                disable={disable}
                //labelStyle={{ color: disable ? 'red' : 'gray'}}
            >
                Save
            </Button>

            {Boolean(disable)} ? <div className="suc-msg">
                Successfully updated!
            </div>
            :
            <div className="err-msg">
                *The username is already taken
            </div>

            <Button
                className="cancel-button"
                onClick={() => history.push({ pathname: '/'})}
            >
                Cancel
            </Button>
        </div>
        :
        <div>
            <MenuBar/>
        </div>
    );
}
export default Update;