import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/Shop/products/crud/ProductForm';

const CreateProduct = () => {
    const [form, setForm] = useState({});

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(form);
    } 

    return (
        <main>
            <ProductForm data={{}} buttonText={'Crear producto'} form={form} setForm={setForm} action={handleSubmit} />
        </main>
    );
}

export default CreateProduct;
