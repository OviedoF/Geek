import { useState } from 'react';
import {motion} from 'framer-motion';
import env from '../../env';
import axios from 'axios';
import {HashLoader} from 'react-spinners'

const RegisterForm = ({setIsRegistering}) => {
    const [userImage, setUserImage] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!userImage)  return setError('Debes subir una imágen de perfil');

        if(form.password !== form.confirmPassword) return setError('Las contraseñas no coinciden');

        if(!form.name || !form.username || !form.email || !form.password || !form.confirmPassword) return setError('Debes completar todos los campos');

        setLoading(true);

        const formData = new FormData();
        formData.append('userImage', userImage);
        formData.append('name', form.name);
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('confirmPassword', form.confirmPassword);
    
        axios.post(`${env.API_URL}/auth/register`, formData)
            .then(res => {
                setLoading(false);
                setSuccess(true);
            })
            .catch(err => {
                setLoading(false);
                console.log(err.response.data.message)
                setError('Error al registrarse, inténtalo de nuevo.');
            })
    }

    if(loading) return (
        <motion.div className='login_container' animation={{width: '30%'}}>
            <HashLoader color='white' size={100}  />
        </motion.div>
    )
    if(success) return (
        <motion.div className='login_container' animation={{width: '30%'}}>
            <motion.h1>Te has registrado correctamente</motion.h1>
            <motion.button onClick={() => setIsRegistering(false)}>Iniciar sesión</motion.button>
        </motion.div>
    )

    return (
        <motion.div className='login_container' animation={{width: '30%'}}>
            <form className='login_form'>

                <motion.div  className='form_group'>
                    <label htmlFor="userImage">Imágen de perfil</label>
                    <input onChange={(e) => setUserImage(e.target.files[0])} type="file" name="userImage" id="userImage" />
                </motion.div>

                <motion.div  className='form_group'>
                    <label htmlFor="name">Nombre</label>
                    <input onChange={(e) => handleChange(e)} type="text" name="name" id="name" />
                </motion.div>

                <motion.div  className='form_group'>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input onChange={(e) => handleChange(e)} type="text" name="username" id="username" />
                </motion.div>

                <motion.div  className='form_group'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" />
                </motion.div>

                <motion.div  className='form_group'>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="password" id="password" />
                </motion.div>

                <motion.div  className='form_group'>
                    <label htmlFor="confirmPassword">Confirmar password</label>
                    <input onChange={(e) => handleChange(e)} type="password" name="confirmPassword" id="confirmPassword" />
                </motion.div>

                <motion.div  className='form_group'>
                    <button onClick={(e) => handleSubmit(e)} type="submit">Registrarse</button>
                </motion.div>

                <motion.p onClick={() => setIsRegistering(false)}>¿Ya tienes cuenta?
                    <motion.span className='form_group'>Inicia sesión</motion.span>
                </motion.p>

                {error && <p className='form_error'>{error}</p>}
            </form>
        </motion.div>
    );
}

export default RegisterForm;
