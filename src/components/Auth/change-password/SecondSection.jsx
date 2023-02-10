import React, { useState, useRef } from 'react';
import styles from './ChangePasswordSection.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { activeScreen, resetAllScreens } from '../../../redux/actions/screensActive.actions';
import env from '../../../env'

const SecondSection = ({textInput, setStatus, email}) => {
    const form = {
        0: useRef(),
        1: useRef(),
        2: useRef(),
        3: useRef(),
        4: useRef(),
        5: useRef()
    };
    const dispatch = useDispatch();

    const handleVerificate = (e) => {
        e.preventDefault();
        const code = [];
        dispatch( resetAllScreens() );
        
        for (let index = 0; index <= 5; index++) {
            const element = form[index].current.value;
            code.push(element);
        }

        axios.post(`${env.API_URL}/changePassword/verifyCode`, {email: email, code: code.join('')})
            .then(res => {
                setStatus(2);
            })
            .catch(err => {
                dispatch( activeScreen({screen: 'error', message: err.response.data}) );
                console.log(err);
            })
    }

    return (
        <>
            <ol className={styles.password_code}>
                <input maxLength={1} type="text" name="" id="0" ref={form[0]} />
                <input maxLength={1} type="text" name="" id="1" ref={form[1]} />
                <input maxLength={1} type="text" name="" id="2" ref={form[2]} />
                <input maxLength={1} type="text" name="" id="3" ref={form[3]} />
                <input maxLength={1} type="text" name="" id="4" ref={form[4]} />
                <input maxLength={1} type="text" name="" id="5" ref={form[5]} />
            </ol>

            <input type="submit" value={textInput} onClick={(e) => handleVerificate(e)}/>
        </>
    );
}

export default SecondSection;
