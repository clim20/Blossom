import React, { useContext, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { REGISTER_USER } from '../cache/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { refreshTokenSetup } from '../util/refreshToken';

const clientId = '509289158854-coj9gmcounfv962huma48rn4c6cgg278.apps.googleusercontent.com';

const Register = () => {
    const context = useContext(AuthContext);

    const [values, setValues] = useState({
        username: '',
        email: ''
    });

    const [addUser] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
        },
        variables: values
    });

    function registerUserCallback() {
        addUser();
    }

    const onSuccess = (res) => {
        console.log('[Register Success] currentUser:', res.profileObj)
        const user = res.profileObj;
        setValues({
            username: user.name,
            email: user.email
        });
        registerUserCallback();
        // Initializing the setup
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('[Register failed] res:', res.profileObj);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <div>
            <Menu.Item onClick={signIn} className="button">
                <span className="buttonText">Register</span>
            </Menu.Item>
        </div>
    );
};

export default Register;