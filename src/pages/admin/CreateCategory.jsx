import axios from 'axios';
import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import CategoryForm from '../../components/admin/CategoryForm';
import env from '../../env';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';

const CreateCategory = () => {
    const [form, setForm] = useState({});
    const [status, setStatus] = useState({
        status: 'idle'
    });
    const auth = useSelector(state => state.auth);

    const handleSend = (e) => {
        e.preventDefault();
        const formData = new FormData();
        setStatus({status: 'loading'})

        if(!form.name || !form.description || !form.image) return setStatus({status: 'error', message: 'Todos los campos son requeridos.'})

        formData.append('images', form.image);
        formData.append('name', form.name);
        formData.append('description', form.description);

        axios.post(`${env.API_URL}/category`, formData, {
            headers: {
                userid: auth._id
            }
        })
            .then((res) => {
                setStatus({
                    status: 'success',
                    message: 'Categoría creada correctamente.'
                })
                setForm({})
            })
            .catch((res) => setStatus({
                status: 'error',
                message: 'Error al crear su categoría.'
            }))
    }

    if(status.status === 'loading') return (
        <main className='loading_container'>
            <HashLoader size={150} color={'white'} />
        </main>
    )

    return (
        <main>
            <h1>Crear categoría</h1>

            <CategoryForm data={form} buttonText='Crear categoría' form={form} setForm={setForm} action={handleSend} />

            {status.status === 'success' && <motion.p className='success_text'>{status.message}</motion.p>}
            {status.status === 'error' && <motion.p className='error_text'>{status.message}</motion.p>}
        </main>
    );
}

export default CreateCategory;
