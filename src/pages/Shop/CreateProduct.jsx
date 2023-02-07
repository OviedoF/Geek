import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/Shop/products/crud/ProductForm';
import axios from 'axios';
import env from '../../env';
import { useQuery } from 'react-query';
import ErrorPage from '../../global/ErrorPage'
import LoadingPage from '../../global/LoadingPage'
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';

const fetchCategories = async () => {
    const response = await axios.get(`${env.API_URL}/category`)
    return response.data
}

const CreateProduct = () => {
    const [form, setForm] = useState({});
    const { data: categories, status: statusCategories } = useQuery('get categories', fetchCategories);
    const [status, setStatus] = useState({ status: 'idle' });
    const auth = useSelector(state => state.auth);

    const handleSubmit= (e) => {
        e.preventDefault();
        setStatus({status: 'loading'});

        if(!form.name || !form.price || !form.category || !form.subCategory || !form.principalImage) return setStatus({
            status: 'error', message: 'Revisa los campos requeridos.'
        });

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('subCategory', form.subCategory);
        formData.append('tradable', form.tradable);
        formData.append('salable', form.salable);
        formData.append('description', form.description);
        formData.append('principalImage', form.principalImage);

        if(form.galleryImages) Object.keys(form.galleryImages).map(index => {
            formData.append('galleryImages', form.galleryImages[index])
        })

        axios.post(`${env.API_URL}/product`, formData, {
            headers: {
                shopid: auth.shop._id
            }
        })
            .then(res => setStatus({
                status: 'success',
                message: `Producto ${res.data.name} creado correctamente!`
            }))
            .catch(err => setStatus({
                status: 'error',
                message: err.response.data.message || `Error al crear el producto. Código de error: ${err.code}`
            }))
    } 

    if(!categories) return <ErrorPage />

    if(status.status === 'loading') return <LoadingPage />

    if(categories) return (
        <main>
            {status.status === 'success' && <motion.p className='success_text'>{status.message}</motion.p>}

            {status.status === 'error' && <motion.p className='error_text'>{status.message}</motion.p>}

            <ProductForm data={{}} buttonText={'Crear producto'} form={form} setForm={setForm} action={handleSubmit} 
            categories={categories}/>
        </main>
    );
}

export default CreateProduct;
