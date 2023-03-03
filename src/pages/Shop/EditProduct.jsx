import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import env from '../../env';
import { useQuery } from 'react-query';
import NotFoundItem from '../NotFoundItem'
import ErrorPage from '../../global/ErrorPage'
import ProductForm from '../../components/Shop/products/crud/ProductForm';
import {motion} from 'framer-motion';
import axios from 'axios';

const EditProduct = () => {
    const {id} = useParams();
    const { data: product, status } = useQuery('product', async () => {
        const response = await fetch(`${env.API_URL}/product/${id}`)
        return response.json()
    })
    const { data: categories, status: categoriesStatus } = useQuery('categories', async () => {
        const response = await fetch(`${env.API_URL}/category`)
        return response.json()
    })
    const [form, setForm] = useState(product);
    const [statusPut, setStatusPut] = useState({ status: 'idle' })
    
    useEffect(() => {
        setForm(product)
    }, [product]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)

        if(!form.name || !form.price || !form.category || !form.subCategory || !form.principalImage) return setStatusPut({
            status: 'error', message: 'Revisa los campos requeridos.'
        });

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('category', typeof form.category === 'object' ? form.category._id : form.category);
        formData.append('subCategory', typeof form.subCategory === 'object' ? form.subCategory._id : form.subCategory);
        formData.append('tradable', form.tradable);
        formData.append('salable', form.salable);
        formData.append('description', form.description);
        formData.append('principalImage', form.principalImage);

        if(typeof form.galleryImages === 'object') Object.keys(form.galleryImages).map(index => {
            formData.append('galleryImages', form.galleryImages[index])
        })

        axios.put(`${env.API_URL}/product/${id}`, formData)
            .then(res => setStatusPut({
                status: 'success',
                message: `Producto ${res.data.name} editado correctamente!`
            }))
            .catch(err => setStatusPut({
                status: 'error',
                message: err.response.data.message || `Error al editar el producto. Código de error: ${err.code}`
            }))

        setTimeout(() => {
            setStatusPut({ status: 'idle' })
        }
        , 5000)
    }

    if(status === 'loading' || statusPut.status === 'loading') return <ErrorPage />

    if(status === 'error' || product.kind) return <NotFoundItem title={'¡Ups! Parece que este producto no existe'} subtitle={'No se puede editar lo inexistente 🤯'}/>

    if(form && categories) return (
        <main>
            <h1>Edit product</h1>

            <ProductForm action={handleSubmit} data={product} form={form} setForm={setForm} categories={categories} buttonText={'Editar producto'} /> 

            {statusPut.status === 'success' && <motion.p className='success_text'>{status.message}</motion.p>}
            {statusPut.status === 'error' && <motion.p className='error_text'>{status.message}</motion.p>}
        </main>
    );
}

export default EditProduct;
