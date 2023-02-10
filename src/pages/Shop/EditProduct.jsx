import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import env from '../../env';
import { useQuery } from 'react-query';
import NotFoundItem from '../NotFoundItem'
import ErrorPage from '../../global/ErrorPage'
import ProductForm from '../../components/Shop/products/crud/ProductForm';

const EditProduct = () => {
    const {id} = useParams();
    const { data: product, status } = useQuery('user', async () => {
        const response = await fetch(`${env.API_URL}/product/${id}`)
        return response.json()
    })
    const { data: categories, status: categoriesStatus } = useQuery('categories', async () => {
        const response = await fetch(`${env.API_URL}/category`)
        return response.json()
    })
    const [form, setForm] = useState(product);
    console.log(product)
    
    useEffect(() => {
        setForm(product)
    }, [product]);

    if(status === 'loading') return <ErrorPage />

    if(status === 'error' || product.kind) return <NotFoundItem title={'¡Ups! Parece que este producto no existe'} subtitle={'No se puede editar lo inexistente 🤯'}/>

    if(form && categories) return (
        <main>
            <h1>Edit product</h1>

            <ProductForm data={product} form={form} setForm={setForm} categories={categories} buttonText={'Editar producto'} /> 
        </main>
    );
}

export default EditProduct;
