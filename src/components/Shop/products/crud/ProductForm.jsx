import React, { useState, useEffect } from 'react';

const ProductForm = ({ data, buttonText, action, categories, form, setForm }) => {
    const [principalImage, setPrincipalImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleImages = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.files
        })

        e.target.files.map(el => {
            const fakeUrl = URL.createObjectURL(el);
            setGalleryImages([...galleryImages, fakeUrl])
        })
    }

    return (
        <form action="" className='form_container first_design'>
            <div className="form-group">
                <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre del producto'  />
            </div>

            <div className="form-group">
                <input onChange={(e) => handleChanges(e)} type="number" name='price' defaultValue={data && data.price} placeholder='Precio del producto'  />
            </div>


            <div className="form-group">
                <select onChange={(e) => handleChanges(e)} name='category' placeholder="Seleccione categoría" defaultValue={data && data.category}>
                    {data && data.category ? <option>{data.category}</option> : <option>Selecciona una categoría</option>}
                </select>
            </div>

            <div className="form-group">
                <select onChange={(e) => handleChanges(e)} name='subcategories' placeholder="Seleccione subcategoría">
                    {data && data.subcategory ? <option>{data && data.subcategory}</option> : <option>Selecciona una sub-categoría</option>}
                </select>
            </div>

            <div className="form-group full">
                <textarea name='description' placeholder='Descripción de su producto' defaultValue={data && data.description}/>
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

            <div className="form-group">
                {data && 
                <div className="images_container">
                    {data.galleryImages && data.galleryImages.map(el => (
                        <img src='el' alt='imágen de galería' />
                    ))}
                </div>} 

                <label className="image-picker" htmlFor="galeryImages">Seleccionar imagenes de galería</label>
                <input onChange={(e) => handleImages(e)} type="file" name="galeryImages" id="galeryImages" />
            </div>

            <button type="submit" onClick={(e) => action(e)}>
                {buttonText}
            </button>
        </form>
    );
}

export default ProductForm;
