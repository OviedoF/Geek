import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const ProductForm = ({ data, buttonText, action, categories, form, setForm }) => {
    const [principalImage, setPrincipalImage] = useState(!data || !form.fakeImage ? '' : data && data.principalImage || form.fakeImage);
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({subCategories: []});

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
    }

    const handleChecks = (e) => {
        if(!form[e.target.name]) {
            setForm({
                ...form,
                [e.target.name]: true
            })
        } else {
            setForm({
                ...form,
                [e.target.name]: false
            })
        }
    }

    useEffect(() => {
        if(form.category) {
            setSelectedCategory(categories.find(el => el._id === form.category))
        }
    }, [form]);

    return (
        <form action="" className='form_container first_design'>
            <div className="form-group required">
                <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre del producto'  />
            </div>

            <div className="form-group required">
                <input onChange={(e) => handleChanges(e)} type="number" name='price' defaultValue={data && data.price} placeholder='Precio en rupias (si es que lo tiene)'  />
            </div>


            <div className="form-group required">
                <select onChange={(e) => {handleChanges(e)}} name='category' placeholder="Seleccione categoría" defaultValue={data && data.category}>
                    {data && data.category ? <option value={data.category._id}>{data.category.name}</option> : <option value={null}>Selecciona una categoría</option>}
                    
                    {categories.map(el => (
                        <option value={el._id}>{el.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group required">
                <select onChange={(e) => handleChanges(e)} name='subCategory' placeholder="Seleccione subcategoría">
                    {data && data.subcategory ? <option>{data && data.subcategory}</option> : <option>Selecciona una sub-categoría</option>}

                    {selectedCategory.subCategories.map(el => (
                        <option value={el._id}>{el.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className='select-changer' htmlFor="tradable">¿Acepta tradeos? {!form.tradable ? <FontAwesomeIcon className='error' icon={faXmark} /> : <FontAwesomeIcon className='success' icon={faCheck} />}</label>
                <input onChange={(e) => handleChecks(e)} type="checkbox" name="tradable" id="tradable" />       
            </div>

            <div className="form-group">
                <label className='select-changer' htmlFor="salable">¿Acepta ventas por dinero? {!form.salable ? <FontAwesomeIcon className='error' icon={faXmark} /> : <FontAwesomeIcon className='success' icon={faCheck} />}</label>
                <input onChange={(e) => handleChecks(e)} type="checkbox" name="salable" id="salable" />  
            </div>

            <div className="form-group full">
                <textarea name='description' onChange={(e) => handleChanges(e)} placeholder='Descripción de su producto' defaultValue={data && data.description}/>
            </div>

            <div className="form-group required" style={{background: `url(${principalImage}) center/cover no-repeat`}}>
                <label className="image-picker" htmlFor="principalImage">Seleccionar imágen principal</label>
                <input onChange={(e) => {
                     setForm({
                        ...form,
                        [e.target.name]: e.target.files[0],
                        fakeImage: URL.createObjectURL(e.target.files[0])
                     });
                     setPrincipalImage(URL.createObjectURL(e.target.files[0]))
                }} type="file" name="principalImage" id="principalImage"/>
            </div>

            <div className="form-group">
                <label className="image-picker" htmlFor="galleryImages">
                    {!form.galleryImages && 'Seleccione imágenes de galería'}
                    <br></br>
                    {form.galleryImages && <p style={{color: 'var(--color-success)'}}>{form.galleryImages.length} imágenes de galería seleccionadas.</p>}
                </label>
                
                <input onChange={(e) => handleImages(e)} type="file" name="galleryImages" id="galleryImages" multiple  />
            </div>

            <button type="submit" onClick={(e) => action(e)}>
                {buttonText}
            </button>
        </form>
    );
}

export default ProductForm;
