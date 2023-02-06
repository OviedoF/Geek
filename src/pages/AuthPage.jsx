import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ChangePassword from '../components/Auth/change-password/ChangePassword';

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isForgottenPassword, setIsForgottenPassword] = useState(false);

    return (
        <main id="not_padding">
            {isForgottenPassword && <ChangePassword setIsModal={setIsForgottenPassword} />}
            {isRegistering && <RegisterForm setIsRegistering={setIsRegistering} />}
            {!isRegistering && <LoginForm setIsRegistering={setIsRegistering} setIsForgottenPassword={setIsForgottenPassword} /> }
        </main>
    );
}

export default AuthPage;
