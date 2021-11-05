import React, { useContext, useState } from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import Login from './Login';
import Logout from './Logout';
import Blossom from '../Blossom.png';

const MenuBar = () => {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.split('/')[1];
    const profileId = pathname.split('/')[2];
    const [activeItem, setActiveItem] = useState(path);

    var userObject = {};
    const { data } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

	if(data) {
        userObject = data.findUserById;
    }

    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
    ]

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const blossom = '\xa0\xa0\xa0'+ 'Blossom';
    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Menu position='left'>
                <Menu.Item style={{ height: "97%" }}>
                    <a href="/" className='logo'>
                        <img class="ui bottom aligned mini image" src={Blossom}/>
                        {blossom}
                    </a>
                </Menu.Item>
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile' && profileId === userObject.profileId}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/profile/' + userObject.profileId}
                />
                <Menu.Item
                    name='random'
                    onClick={()=>{}}
                />
            </Menu.Menu>
            <Menu.Item className='search-bar'>
                    <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Dropdown text={userObject.username} options={options} />
                </Menu.Item>
                {/* <Logout/> */}
            </Menu.Menu>
        </Menu>
        ) : (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Menu position='left'>
            </Menu.Menu>
            <Menu.Menu position='right'>
                <Login/>
            </Menu.Menu>
        </Menu>
    );

    return menuBar;
}

export default MenuBar;