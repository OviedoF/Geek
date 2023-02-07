import React, { useState } from 'react';

const SubCategoryForm = ({data, buttonText, action, form, setForm, categories}) => {
    const [principalImage, setPrincipalImage] = useState();
    const [backgroundImage, setBackgroundImage] = useState(!data || !form.fakeImage ? '' : data && data.principalImage || form.fakeImage);

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    } 

    return (
        <form action="" className='form_container first_design'>
            <div className="form-group required">
                <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre de la sub-categoría'  />
            </div>

            <div className="form-group required">
                <select onChange={(e) => handleChanges(e)} name='category' placeholder="Seleccione categoría a la que pertenece" defaultValue={data && data.category}>
                    {data && data.category ? <option>{data.category}</option> : <option value={undefined}>Selecciona una categoría</option>}

                    {categories.map(el => (
                        <option value={el._id}>{el.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group required">
                <textarea name='description' onChange={(e) => handleChanges(e)} placeholder='Descripción de la sub-categoría' defaultValue={data && data.description}/>
            </div>

            <div className="form-group required" style={{background: `url(${backgroundImage}) center/cover no-repeat`}}>
                <label className="image-picker" htmlFor="image">Seleccionar imágen principal</label>
                <input onChange={(e) => {
                    setForm({
                        ...form,
                        [e.target.name]: e.target.files[0],
                        fakeImage: URL.createObjectURL(e.target.files[0])
                    });
                    setBackgroundImage(URL.createObjectURL(e.target.files[0]))
                }} type="file" name="image" id="image" />
            </div>

            <button type='submit' onClick={(e) => action(e)}>{buttonText}</button>
        </form>
    );
}

export default SubCategoryForm;
