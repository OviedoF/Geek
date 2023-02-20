import React, { useState, useEffect } from 'react';
import './EditShopForm.scss';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import env from '../../../env';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import regions from './regions'
import { login } from '../../../redux/actions/auth.actions';

const EditShopForm = ({shop}) => {
    const [shopImage, setShopImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [form, setForm] = useState(shop);
    const [status, setStatus] = useState({
        status: 'idle',
        message: ''
    });
    const [comunnes, setComunnes] = useState([])
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (form.region) {
            const region = regions.find(region => region.region === form.region);
            setComunnes(region.comunas);
        }
    }, [form])

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSocialMedia = (e) => {
        setForm({
            ...form,
            social_media: {
                ...form.social_media,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', shopImage);
        formData.append('bannerImage', coverImage);
        formData.append('form', JSON.stringify(form));

        axios.put(`${env.API_URL}/shop/${shop._id}`, formData, {headers: {userid: auth._id}})
            .then(res => {
                setStatus({
                    status: 'success',
                    message: '¡Tu tienda se ha editado correctamente!'
                });
                dispatch(login({
                    token: localStorage.getItem('token'),
                    ...res.data
                }));
            })
            .catch(err => {
                setStatus({
                    status: 'error',
                    message: err.response.data.message || 'Ha ocurrido un error, por favor intente más tarde.'
                });
            }
        );
    }

    if (status.status === 'loading') {
        return (
            <div className='loading' style={{width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <HashLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'white'}
                    loading={true}
                />
            </div>
        );
    }
    
    return (
        <form id='request_shop_form'>
            <div className="form-group file">
                <label className='required' htmlFor="profileImage">Imágen de la tienda</label>
                <label htmlFor="profileImage" className='image_picker'>Seleccionar imágen</label>
                <input type="file" onChange={(e) => setShopImage(e.target.files[0])} className="form-control" id="profileImage" />
            </div>

            <div className="form-group file">
                <label className='required' htmlFor="bannerImage" >Imágen de portada de la tienda</label>
                <label htmlFor="bannerImage" className='image_picker'>Seleccionar imágen</label>
                <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} className="form-control" id="bannerImage" />
            </div>

            <div className="form-group">
                <label className='required' htmlFor="name">Nombre de la tienda</label>
                <input defaultValue={shop.name || ''} type="text" name='name' className="form-control" onChange={(e) => handleChanges(e)} id="name" />
            </div>

            <div className="form-group">
                <label className='required' htmlFor="name">Descripción de la tienda</label>
                <textarea defaultValue={shop.description || ''} className="form-control" name='description' onChange={(e) => handleChanges(e)} id="name" rows="3"></textarea>
            </div>

            <div className="form-group">
                <label className='required' htmlFor="region">Región de la tienda</label>
                <select className="form-control" defaultValue={shop.region} name='region' onChange={(e) => handleChanges(e)} id="region">
                    {!form.region && <option value=''>Selecciona una región</option>}
                    {regions.map((region, index) => {
                        return (
                            <option key={index} value={region.region}>{region.region}</option>
                        );
                    })}
                </select>
            </div>

            <div className="form-group">
                <label className='required' htmlFor="city">Comuna de la tienda</label>
                <select className="form-control" defaultValue={shop.city} name='city' onChange={(e) => handleChanges(e)} id="city">
                    {!form.region && <option value=''>Selecciona una región para elegir comuna</option>}
                    {comunnes.map((region, index) => {
                        return (
                            <option key={index} value={region}>{region}</option>
                        );
                    })}
                </select>
            </div>

            <div className="form-group">
                <label className='required' htmlFor="direction">Dirección de la tienda</label>
                <input type="text" defaultValue={shop.direction || ''} className="form-control" name='direction' onChange={(e) => handleChanges(e)} id="direction" />
            </div>

            <div className="form-group">
                <label className='required' htmlFor="cellPhone">Teléfono de la tienda</label>
                <input type="text" defaultValue={shop.cellPhone || ''} className="form-control" name='cellPhone' onChange={(e) => handleChanges(e)} id="cellPhone" />
            </div>

            <div className="form-group">
                <label className='required' htmlFor="email">Correo electrónico de la tienda</label>
                <input type="email" defaultValue={shop.email || ''} className="form-control" name='email' onChange={(e) => handleChanges(e)} id="email" />
            </div>

            <div className="form-group">
                <label htmlFor="facebook">Facebook de la tienda</label>
                <input type="text" defaultValue={shop.social_media && shop.social_media.facebook} className="form-control" name='facebook' onChange={(e) => handleSocialMedia(e)} id="facebook" />
            </div>

            <div className="form-group">
                <label htmlFor="instagram">Instagram de la tienda</label>
                <input type="text" defaultValue={shop.social_media && shop.social_media.instagram} className="form-control" name='instagram' onChange={(e) => handleSocialMedia(e)} id="instagram" />
            </div>

            <div className="form-group">
                <label htmlFor="twitter">Twitter de la tienda</label>
                <input type="text" defaultValue={shop.social_media && shop.social_media.twitter} className="form-control" name='twitter' onChange={(e) => handleSocialMedia(e)} id="twitter" />
            </div>

            <div className="form-group">
                <label htmlFor="youtube">Youtube de la tienda</label>
                <input type="text" defaultValue={shop.social_media && shop.social_media.youtube} className="form-control" name='youtube' onChange={(e) => handleSocialMedia(e)} id="youtube" />
            </div>

            <div className="form-group">
                <label htmlFor="website">Sitio web de la tienda</label>
                <input type="text" defaultValue={shop.social_media && shop.social_media.website} className="form-control" name='website' onChange={(e) => handleSocialMedia(e)} id="website" />
            </div>

            {status.status === 'success' && <p className='form_success'>{status.message}</p>}

            {status.status === 'error' && <p className='form_error'>{status.message}</p>}

            <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Enviar solicitud</button>
        </form>
    );
}

export default EditShopForm;
