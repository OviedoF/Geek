import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserPage.scss';
import LoadingPage from '../../global/LoadingPage';
import ErrorPage from '../../global/ErrorPage';
import axios from 'axios';
import env from '../../env';
import { login } from '../../redux/actions/auth.actions';

const UserPage = () => {
    const auth = useSelector(state => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(auth);
    const [status, setStatus] = useState({status: 'idle'});
    const [fakeImage, setFakeImage] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSend = (e) => {
        e.preventDefault();
        setStatus({status: 'loading'})

        const formData = new FormData();

        if(form.name !== auth.name) formData.append('name', form.name)
        if(form.username !== auth.username) formData.append('username', form.username)
        if(form.cellphone !== auth.cellphone) formData.append('cellphone', form.cellphone)
        if(form.email !== auth.email) formData.append('email', form.email)
        if(form.profileImage) formData.append('profileImage', form.profileImage)

         axios.put(`${env.API_URL}/user/${auth._id}`, formData)
            .then(res => {
                dispatch(login({
                    ...res.data,
                    token: auth.token
                }))
                setIsEditing(false)
                setStatus({status: 'success'})
            })
            .catch(err => {
                setStatus({status: 'error', message: err.response.data.message})
            })
    }

    if(status.status === 'loading') return <LoadingPage />

    if(status.status === 'error') return <ErrorPage />

    return (
        <main id='userpage_main'>
            <div className="user">
                <img src={fakeImage || auth.userImage} alt="imágen de usuario" />

                {isEditing && <>
                    <label htmlFor="profileImage" style={{marginBottom: 20, cursor: 'pointer'}}>Cambiar Imágen</label>
                    <input type="file" onChange={(e) => {
                        setForm({...form, profileImage: e.target.files[0]})
                        setFakeImage(URL.createObjectURL(e.target.files[0]))
                    }} style={{display: 'none'}} name="profileImage" id="profileImage" />
                </>}

                <div className="group">
                    <h2 style={isEditing ? {margin: 0} : {}}>Nombre:</h2>
                    {isEditing ? <input type='text' name='name' onChange={(e) => handleChange(e)} defaultValue={auth.name} /> : <h3>{auth.name}</h3>}
                </div>

                <div className="group" style={isEditing ? {margin: '20px 0'} : {}}>
                    <h2 style={isEditing ? {margin: 0} : {}}>Nombre de usuario:</h2>
                    {isEditing ? <input type='text' name='username' onChange={(e) => handleChange(e)} defaultValue={auth.username} /> : <h3>{auth.username}</h3>}
                </div>

                <div className="group" style={isEditing ? {margin: '20px 0'} : {}}>
                    <h2 style={isEditing ? {margin: 0} : {}}>Celular:</h2>
                    {isEditing ? <input type='text' name='cellphone' onChange={(e) => handleChange(e)} defaultValue={auth.cellphone} /> : <h3>+{auth.cellphone}</h3>}
                </div>

                <div className="group" style={isEditing ? {margin: '20px 0'} : {}}>
                    <h2 style={isEditing ? {margin: 0} : {}}>Email:</h2>
                    {isEditing ? <input type='email' name='email' onChange={(e) => handleChange(e)} defaultValue={auth.email} /> : <h3>{auth.email}</h3>}
                </div>

                <div className="group" style={isEditing ? {margin: '20px 0'} : {}}>
                    <h2>Fecha de registro:</h2>
                    <h3>{auth.createdAt}</h3>
                </div>

                {isEditing && <button style={{marginBottom: 20}} onClick={(e) => handleSend(e)}>Enviar</button>}

                <button onClick={() => {
                    setIsEditing(!isEditing);
                    isEditing && setFakeImage(auth.profileImage)
                }}>{isEditing ? 'Cancelar' : 'Editar perfil' } </button>
            </div>
        </main>
    );
}

export default UserPage;
