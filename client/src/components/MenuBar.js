import React, { useContext, useState } from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { useGoogleLogout } from 'react-google-login';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';

import Login from './Login';
import Blossom from '../Blossom.png';

const MenuBar = (props) => {
    /*TODO: Implementation of Search */
    const history = useHistory();
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.split('/')[1];
    const profileId = pathname.split('/')[2];
    const clientId = '509289158854-coj9gmcounfv962huma48rn4c6cgg278.apps.googleusercontent.com';
    const { user, logout } = useContext(AuthContext);

    const onLogoutSuccess = (res) => {
        alert('Logout successful');
        logout();
        history.push("/");
    }

    const onFailure = (res) => {
        alert('Logout failed for ', user);
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    });

    var userObject = {};
    const { data } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

	if(data) {
        userObject = data.findUserById;
    }

    const [activeItem, setActiveItem] = useState(path);

    const options = [
        { key: 1, text: 'Settings', value: 1 },
        { key: 2, text: 'Quests', value: 2 },
        { key: 3, text: 'Create', value: 3 },
        { key: 4, text: 'Logout', value: 4 }
    ]

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const handleDropdownClick = (e) => {
        switch(e.target.innerText){
            case "Settings":
                history.push('/update');
                break;
            case "Quests":
                history.push('/quests');
                break;
            case "Create":
                console.log('create clicked'); /*TODO: NEED TO ADD ROUTE TO QUIZ CREATE PAGE*/
                break;
            case "Logout":
                signOut();
                break;
            default:
                break;
        }
    }

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter'){
            history.push("/search");
        } else {
            props.setSearchQuery(e.target.value);
        }
    };

    const blossom = '\xa0\xa0\xa0Blossom';
    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="pink">
            <Menu.Menu position='left'>
                <Menu.Item style={{ height: "97%" }}>
                    <a href="/" className='logo'>
                        <img className="ui bottom aligned mini image" src={Blossom} alt="Blossom Logo"/>
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
                    name='random' /* TODO: Implementation of Random Button */
                    onClick={()=>{}}
                />
            </Menu.Menu>
            <Menu.Item className='search-bar'>
                <Input icon='search' placeholder='Search...' 
                    onKeyUp={handleSearchSubmit}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown text={userObject.username} options={options} onChange={handleDropdownClick} item/>
            </Menu.Menu>
        </Menu>
        ) : (
        <Menu pointing secondary size="massive" color="pink">
            <Menu.Menu position='left'>
                <Menu.Item style={{ height: "97%" }}>
                    <a href="/" className='logo'>
                        <img className="ui bottom aligned mini image" src={Blossom} alt="Blossom Logo"/>
                        {blossom}
                    </a>
                </Menu.Item>
                <Menu.Item
                    name='random'
                    onClick={()=>{}}
                />
            </Menu.Menu>
            <Menu.Item className='search-bar' style={{width: "70%"}}>
                <Input icon='search' placeholder='Search...' 
                    onKeyUp={handleSearchSubmit}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Login/>
            </Menu.Menu>
        </Menu>
    );

    return menuBar;
}

export default MenuBar;