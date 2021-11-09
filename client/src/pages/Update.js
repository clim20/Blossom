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

    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

    var userObject = {};
    if (userData) { 
		userObject = userData.findUserById;
    }
    console.log(userObject);

    const [UpdateUsername] = useMutation(mutations.UPDATE_USERNAME);
    const [inputUsername, setInputUsername] = useState({ name: '' });

    const [disabled, setDisable] = useState(false);
    const [submitted, setSubmit] = useState(false);
    
    const setUsername = async (e) => {
		const { name, value } = e.target;
        const updated = { ...inputUsername, [name]: value };
		setInputUsername(updated);
	}

    const handleSubmit = async () => {
        if (inputUsername.name !== '') {
            setSubmit(true);
            const { data } = await UpdateUsername({
                variables: { 
                    id: user ? user._id : '', 
                    name: inputUsername.name
                }
            });
            
            var returnedUser = {};
            if (data) { 
                returnedUser = data.updateUsername;
            }

            console.log(returnedUser.username, user.username);

            if (returnedUser.username === userObject.username) {
                console.log("disable false")
                setDisable(false);
                // error message
            } else{
                console.log("disable true")
                setDisable(true);

                setTimeout(() => {
                    history.push({ pathname: '/'});
                }, 300);
            // let user know the username has been changed and go back to homepage
            } 
        }
    }

    const message = disabled ? 
        <div className="suc-msg">
            Successfully updated!
        </div>
    :
        <div className="err-msg">
            *The username is already taken
        </div>
    ;

    return (
        user ? <div>
            <MenuBar/>
            <div className="update-account">
                Update Account 
            </div>
            <div className="update-username-placeholder1">
                Username:
            </div>
            <div className="update-username">
                {userObject.username}
            </div>
            <div className="update-username-placeholder2">
                New Username:
            </div>
            <br />
            <Input 
                className="input-box"
                name='name' onBlur={setUsername} autoFocus={false} placeholder={"New username..."}
                inputtype="text"
            />

            {submitted && message}

            <div style={{ marginTop: '30px' , marginLeft: '450px'}}>
                <Button 
                    className="save-button"
                    onClick={handleSubmit}
                    disable={inputUsername.name === userObject.username || inputUsername.name === ''}
                >
                    Save
                </Button>

                <Button
                    className="cancel-button"
                    onClick={() => history.push({ pathname: '/'})}
                >
                    Cancel
                </Button>
            </div>
        </div>
        :
        <div>
            <MenuBar/>
        </div>
    );
}
export default Update;