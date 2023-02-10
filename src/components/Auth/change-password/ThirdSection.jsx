import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { activeScreen } from '../../../redux/actions/screensActive.actions';
import axios from 'axios';
import env from '../../../env'

const ThirdSection = ({textInput, userId, setStatus}) => {
    const password = useRef();
    const validatePassword = useRef();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault(e);
        
        if(password.current.value !== validatePassword.current.value) return dispatch( activeScreen({screen: 'error', message: 'Las contraseñas no coinciden'}) )

        axios.put(`${env.API_URL}/changePassword/${userId}`, {
            newPassword: password.current.value
        })
            .then(res => setStatus(3))
            .catch( err => dispatch( activeScreen({screen: 'error', message: 'Ha ocurrido un error, inténtelo de nuevo.'}) ) )
      };

    return (
        <>
            <input type="password" placeHolder="Ingresa nueva contraseña" ref={password}/>
            <input type="password" placeHolder="Repetir contraseña" ref={validatePassword}/>
            
            <input
            type="submit"
            value={textInput}
            onClick={(e) => handleChange(e)}
            />
        </>
    );
}

export default ThirdSection;
