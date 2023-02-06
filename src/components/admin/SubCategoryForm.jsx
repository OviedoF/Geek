import React, { useState } from 'react';

const SubCategoryForm = ({data, buttonText, action, form, setForm}) => {
    const [principalImage, setPrincipalImage] = useState();

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form action="" className='form_container first_design'>
            <div className="form-group">
                <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre de la sub-categoría'  />
            </div>

            <div className="form-group">
                <select onChange={(e) => handleChanges(e)} name='category' placeholder="Seleccione categoría a la que pertenece" defaultValue={data && data.category}>
                    {data && data.category ? <option>{data.category}</option> : <option>Selecciona una categoría</option>}
                </select>
            </div>

            <div className="form-group">
                <textarea name='description' placeholder='Descripción de la sub-categoría' defaultValue={data && data.description}/>
            </div>

            <div className="form-group">
                {data && data.principalImage || principalImage &&
                    <img className='background_image' src={data && data.principalImage || principalImage } alt="" />
                }
                <label className="image-picker" htmlFor="principalImage">Seleccionar imágen principal</label>
                <input onChange={(e) => {
                    setForm({
                        ...form,
                        [e.target.name]: e.target.files[0]
                    });
                    setPrincipalImage(URL.createObjectURL(e.target.files[0]))
                }} type="file" name="principalImage" id="principalImage" />
            </div>

            <button type='submit' onClick={(e) => action(e)}>{buttonText}</button>
        </form>
    );
}

export default SubCategoryForm;
