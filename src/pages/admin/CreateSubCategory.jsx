import React, { useState } from 'react';
import SubCategoryForm from '../../components/admin/SubCategoryForm';
import { useQuery } from 'react-query';
import ErrorPage from '../../global/ErrorPage'
import LoadingPage from '../../global/LoadingPage'
import env from '../../env'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'

const CreateSubCategory = () => {
    const [form, setForm] = useState({});
    const { data, status } = useQuery('user', async () => {
        const response = await fetch(`${env.API_URL}/category`)
        return response.json()
    })
    const [postStatus, setPostStatus] = useState({status: 'idle'});
    const auth = useSelector(state => state.auth)

    const handleSend = (e) => {
        e.preventDefault();

        e.preventDefault();
        const formData = new FormData();
        setPostStatus({status: 'loading'})

        if(!form.name || !form.description || !form.image || !form.category) return setPostStatus({status: 'error', message: 'Todos los campos son requeridos.'})

        formData.append('images', form.image);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category', form.category);

        axios.post(`${env.API_URL}/subCategory`, formData, {
            headers: {
                userid: auth._id
            }
        })
            .then((res) => {
                setPostStatus({
                    status: 'success',
                    message: 'Categoría creada correctamente.'
                })
                setForm({})
            })
            .catch((res) => setPostStatus({
                status: 'error',
                message: 'Error al crear su categoría.'
            }))
    }

    switch (status) {
        case 'loading':
            return <LoadingPage />
        case 'error':
            return <ErrorPage />
        default:
            if(postStatus.status === 'loading') return <LoadingPage />

            return (
                <main>
                    <h1>Crear subcategoría</h1>
        
                    <SubCategoryForm data={{}} buttonText='Crear subcategoría' form={form} setForm={setForm} action={handleSend} categories={data} />

                    {postStatus.status === 'success' && <motion.p className='success_text'>{postStatus.message}</motion.p>}
                    {postStatus.status === 'error' && <motion.p className='error_text'>{postStatus.message}</motion.p>}
                </main>
            )
    }
}

export default CreateSubCategory;