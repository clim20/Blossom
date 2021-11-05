import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useGoogleLogout } from 'react-google-login';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const Logout = () => {
    const history = useHistory();
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

    return (
        <div>
            <Menu.Item onClick={signOut} className="button">
                <span className="buttonText">Logout</span>
            </Menu.Item>
        </div>
    )
}

export default Logout;