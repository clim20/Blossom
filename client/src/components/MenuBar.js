import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import Login from './Login';
import Logout from './Logout';

const MenuBar = () => {
    const { user } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.split('/')[1];
    const profileId = pathname.split('/')[2];
    const [activeItem, setActiveItem] = useState(path);

    // var users = [];
    // const { data } = useQuery(queries.FIND_USER_BY_ID);
	// if(data) { users = data.findUserById; }

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name={user.username}
                active={activeItem === 'home'}
                onClick={() => setActiveItem('home')}
                as={Link}
                to='/'>
                    {user.username}
            </Menu.Item>

            <Menu.Menu position='left'>
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile' && profileId === user.profileId}
                    onClick={handleItemClick}
                    as={Link}
                    to={'/profile/' + user.profileId}
                />
            </Menu.Menu>

            <Menu.Menu position='right'>
                <Logout/>
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