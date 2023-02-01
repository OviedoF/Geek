import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { activeScreen, resetAllScreens, desactiveScreen } from '../../../redux/actions/screensActive.actions';


const FirstSection = ({setEmail, textInput, email, setUserImage, setStatus, setUserId}) => {
    const dispatch = useDispatch();

    const handleSend = (e) => {
        e.preventDefault();
        dispatch( resetAllScreens() );
        dispatch( activeScreen({screen: 'isLoading', message: ''}) )

        axios.post(`${process.env.REACT_APP_ROOT_API}/api/change-password`, {
            email: email
        })
            .then(res => {
                setStatus(1);
                setUserImage(res.data.image);
                setUserId(res.data.userId);
                console.log(res);
                dispatch( desactiveScreen('isLoading') );
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='form_group'>
            <input type="email" name="email" placeholder='Ingrese su correo electrónico' onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit" value={textInput} onClick={(e) => handleSend(e)} style={{height: 50}}/>
        </div>
    );
}

export default FirstSection;
