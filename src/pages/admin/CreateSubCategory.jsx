import React, { useState } from 'react';
import SubCategoryForm from '../../components/admin/SubCategoryForm';

const CreateSubCategory = () => {
    const [form, setForm] = useState({});

    const handleSend = (e) => {
        e.preventDefault();
        console.log(form);
    }

    return (
        <main>
            <h1>Crear subcategoría</h1>

            <SubCategoryForm data={{}} buttonText='Crear subcategoría' form={form} setForm={setForm} action={handleSend} />
        </main>
    );
}

export default CreateSubCategory;
