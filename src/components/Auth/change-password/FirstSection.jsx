import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import env from '../../../env'
import {HashLoader} from 'react-spinners';

const FirstSection = ({setEmail, textInput, email, setUserImage, setStatus, setUserId, setPostStatus, postStatus}) => {
    const dispatch = useDispatch();

    const handleSend = (e) => {
        e.preventDefault();
        setPostStatus({status: 'loading'});

        axios.post(`${env.API_URL}/changePassword`, {
            email: email
        })
            .then(res => {
                setStatus(1);
                setUserImage(res.data.image);
                setUserId(res.data.userId);
                setPostStatus({status: 'idle'})
            })
            .catch(err => {
                console.log(err);
                setPostStatus({status: 'error', message: err.response.data.message})
            });
    }


    if(postStatus.status === 'loading') return (
        <div className="" style={{display: 'flex', justifyContent: 'center'}}>
            <HashLoader color="white" size={100} />
        </div>
    )

    return (
        <div className='form_group'>
            <input type="email" name="email" placeholder='Ingrese su correo electrónico' onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit" value={textInput} onClick={(e) => handleSend(e)} style={{height: 50}}>Enviar código</button>
        </div>
    );
}

export default FirstSection;
