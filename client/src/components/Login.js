import React, { useContext, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { LOGIN_USER } from '../cache/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { refreshTokenSetup } from '../util/refreshToken';

const clientId = '509289158854-coj9gmcounfv962huma48rn4c6cgg278.apps.googleusercontent.com';

const Login = () => {
    const context = useContext(AuthContext);

    const [values, setValues] = useState({
        username: '',
        email: '',
        profileImg: ''
    });

    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}) {
            context.login(userData);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        alert(`Logged in as ${res.profileObj.name}`);
        const user = res.profileObj;
        setValues({
            username: user.email,
            email: user.email,
            profileImg: user.imageUrl
        });
        loginUserCallback();
        // Initializing the setup
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res.profileObj);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <Menu.Item onClick={signIn} className="button">
            <span className="buttonText">Login</span>
        </Menu.Item>
    );
}

export default Login;