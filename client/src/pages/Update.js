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
    
    const setUsername = async (e) => {
		const { name, value } = e.target;
        const updated = { ...inputUsername, [name]: value };
		setInputUsername(updated);
	}

    const handleSubmit = async () => {
        console.log(inputUsername.name);
        const { data } = await UpdateUsername({variables: { id: user.id, name: inputUsername.name }});
		history.push({ pathname: '/'});
    }

    return (
        user ? <div>
            <MenuBar/>
            <div>
                Username:
            </div>
            <div>
                {user.username}
            </div>
            <div>
                New Username:
            </div>
            <Input 
                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                name='name' onBlur={setUsername} autoFocus={false} defaultValue={"New username..."}
                inputType="text"
            />
            <Button
                onClick={handleSubmit}
            >
                Confirm
            </Button>
            <Button
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