import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import Login from './Login';
import Logout from './Logout';

const MenuBar = () => {
    const { user } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name={user.username}
                active
                as={Link}
                to='/'>
                    {user.username}
            </Menu.Item>
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
            <Menu.Menu position='right'>
                <Login/>
            </Menu.Menu>
        </Menu>
    );

    return menuBar;
}

export default MenuBar;