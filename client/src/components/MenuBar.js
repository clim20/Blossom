import React, { useContext, useState } from 'react';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { useGoogleLogout } from 'react-google-login';

import { AuthContext } from '../context/auth';
import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

import Login from './Login';
import Blossom from '../Blossom.png';

const MenuBar = (props) => {
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
    const { data: userData } = useQuery(queries.FIND_USER_BY_ID, {
        variables: {
            id: user ? user._id : ''
        }
    });

	if(userData) {
        userObject = userData.findUserById;
    }

    const { data: randomQuizData, refetch: getRandomQuiz } = useQuery(queries.GET_RANDOM_QUIZ, {
        enabled: false
    });

    const handleRandomClick = async () => {
        getRandomQuiz();
        history.push("/quiz/" + randomQuizData.getRandomQuiz)
    }

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' || e.type === 'click'){
            history.push("/search");
        } else {
            props.setSearchQuery(e.target.value);
        }
    };

    const [CreateQuiz] = useMutation(mutations.CREATE_QUIZ);
    const handleQuizCreate = async () => {
        const { data } = await CreateQuiz({
            variables: { 
                owner: user._id, 
                title: "test"
            }
        });

        var returnedQuiz = {};
        if (data) { 
            returnedQuiz = data.createQuiz;
        }

        history.push("/quiz/edit/" + returnedQuiz._id);
    }

    const [activeItem, setActiveItem] = useState(path);

    const options = [
        { key: 1, text: 'Settings', value: 1 },
        { key: 2, text: 'Quests', value: 2 },
        { key: 3, text: 'Create', value: 3 },
        { key: 4, text: 'Logout', value: 4 }
    ];

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
                handleQuizCreate();
                break;
            case "Logout":
                signOut();
                break;
            default:
                break;
        }
    }

    const blossom = '\xa0\xa0\xa0Blossom';
    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="pink" stackable>
            <Menu.Menu position='left'>
                <Menu.Item style={{ height: "97%" }}>
                    <a href="/" className='logo' style={{ color: '#000000DE' }}>
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
                    name='random'
                    onClick={handleRandomClick}
                />
            </Menu.Menu>
            <Menu.Item className='search-bar'>
                <Input icon={{ name: 'search', link: true, onClick: handleSearchSubmit }} placeholder='Search...' 
                    onKeyUp={handleSearchSubmit}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown text={userObject.username} options={options} onChange={handleDropdownClick} item/>
            </Menu.Menu>
        </Menu>
        ) : (
        <Menu pointing secondary size="massive" color="pink" stackable>
            <Menu.Menu position='left'>
                <Menu.Item style={{ height: "97%" }}>
                    <a href="/" className='logo'>
                        <img className="ui bottom aligned mini image" src={Blossom} alt="Blossom Logo"/>
                        {blossom}
                    </a>
                </Menu.Item>
                <Menu.Item
                    name='random'
                    onClick={handleRandomClick}
                />
            </Menu.Menu>
            <Menu.Item className='search-bar' style={{width: "70%"}}>
                <Input icon={{ name: 'search', link: true, onClick: handleSearchSubmit }} placeholder='Search...' 
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