import React, { useState, useEffect } from 'react';

const CreateCategoryForm = ({data, buttonText, action, form, setForm}) => {
    const [principalImage, setPrincipalImage] = useState(null);

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form action="" className='form_container first_design'>
            <div className="form-group full">
                <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre de la categoría'  />
            </div>

            <div className="form-group full">
                <textarea onChange={(e) => handleChanges(e)} name='description' placeholder='Descripción de su categoría' defaultValue={data && data.description}/>
            </div>

            <div className="form-group full" >
                {data && data.principalImage || principalImage &&
                    <img className='background_image' src={data && data.principalImage || principalImage } alt="" />
                }

                <label className="image-picker" htmlFor="image">Seleccionar imágen principal</label>
                <input onChange={(e) => {
                    setForm({
                        ...form,
                        [e.target.name]: e.target.files[0]
                    });
                    setPrincipalImage(URL.createObjectURL(e.target.files[0]))
                }} type="file" name="image" id="image" />
            </div>

            <button type='submit' onClick={(e ) => action(e)}>{buttonText}</button>
        </form>
    );
}

export default CreateCategoryForm;
