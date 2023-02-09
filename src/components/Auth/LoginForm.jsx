import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import './LoginForm.scss';
import env from '../../env';
import axios from 'axios';
import {HashLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import {login} from '../../redux/actions/auth.actions';
import routes from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.webp';

const LoginForm = ({setIsRegistering, setIsForgottenPassword}) => {
    const [form, setForm] = useState({});
    const [status, setStatus] = useState({
        status: 'idle',
        message: null
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserInfo = (token) => {
        axios.post(`${env.API_URL}/auth/login/identifyUser`, {token})
            .then(res => {
                localStorage.setItem('token', token);
                dispatch(login({
                    token,
                    ...res.data
                }));
                navigate(routes.home);
            })
            .catch(err => setStatus({
                status: 'error',
                message: err.response.data.message
            }));
    }             

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus({status: 'loading'})

        axios.post(`${env.API_URL}/auth/login`, form)
            .then(res => getUserInfo(res.data.token))
            .catch(err => setStatus({
                    status: 'error',
                    message: err.response.data.message
                })
            );
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            getUserInfo(token);
        }

    }, []);

    if(status.status === 'loading') return (
        <div className='login_container'>
|           <HashLoader color='white' size={100}  />
        </div>
    )

    return (
        <div className='login_container'> 
            <motion.img src={logo} alt="Logéate" />

            <form className='login_form'>
                <motion.div className='form_group'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" />
                </motion.div>

                <motion.div className='form_group'>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="password" id="password" />
                </motion.div>

                {status.status === 'error' && <motion.p className='form_error'>{status.message}</motion.p>}

                <motion.div className='form_group'>
                    <button onClick={(e) => handleSubmit(e)} type="submit">Login</button>
                </motion.div>
                
                <motion.p onClick={() => setIsRegistering(true)}>¿No tienes cuenta?
                    <motion.span className='form_group'>Registrate</motion.span>
                </motion.p>

                <motion.p onClick={() => setIsForgottenPassword(true)}>¿Olvidaste tu contraseña?
                    <motion.span className='form_group'>Recuperar</motion.span>
                </motion.p>
            </form>
        </div>
    );
}

export default LoginForm;
