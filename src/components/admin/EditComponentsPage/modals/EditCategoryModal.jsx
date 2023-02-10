import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import CategoryForm from '../../CategoryForm'
import { useSelector } from 'react-redux';
import axios from 'axios';
import env from '../../../../env';
import './EditCategoryModal.scss';
import {motion} from 'framer-motion';
import { HashLoader } from 'react-spinners';

export default function EditCategoryModal({setIsEditing, data}) {
  const [principalImage, setPrincipalImage] = useState(null);
  const [form, setForm] = useState(data);
  const [backgroundImage, setBackgroundImage] = useState(data ? data.imageUrl : form.fakeImage);
  const [status, setStatus] = useState({status: 'idle'});
  const auth = useSelector(state => state.auth);

  const handleChanges = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  }

  const handleSend = (e) => {
    e.preventDefault();
    const formData = new FormData();
    setStatus({status: 'loading'})

    if(!form.name || !form.description ) return setStatus({status: 'error', message: 'No puede dejar a su categoría sin nombre o descripción.'})

    form.image && formData.append('images', form.image)
    formData.append('name', form.name);
    formData.append('description', form.description);

    axios.put(`${env.API_URL}/category/${data._id}`, formData, {
        headers: {
            userid: auth._id
        }
    })
        .then((res) => {
            setStatus({
                status: 'success',
                message: 'Categoría actualizada correctamente.'
            })
            setForm({})
        })
        .catch((res) => setStatus({
            status: 'error',
            message: 'Error al actualizar su categoría.'
        }))
}

  if(status.status === 'loading') return(
    <div className="edit_modal">
      <HashLoader color='white' size={150}/>
    </div>
  )

  return (
    <motion.div className='edit_modal' style={{width: '100%'}} animate={{transform: 'scale(1)'}} transition={{duration: 0.5}}>
       <FontAwesomeIcon icon={faXmark} onClick={() => setIsEditing(false)} /> 
        
        <div className="form_edit_container edit_item">
          <form action="" className='form_container first_design'>
              <div className="form-group required full">
                  <input onChange={(e) => handleChanges(e)} type="text" name='name' defaultValue={data && data.name} placeholder='Nombre de la categoría'  />
              </div>

              <div className="form-group required full">
                  <textarea onChange={(e) => handleChanges(e)} name='description' placeholder='Descripción de su categoría' defaultValue={data && data.description}/>
              </div>

              <div className="form-group required full" style={{background: `url(${backgroundImage}) center/cover no-repeat`}}>
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

              {status.status === 'success' && <motion.p animate={{transform: 'scale(1)'}} transition={{duration: 0.5}} className='success_text'>{status.message}</motion.p>}
              {status.status === 'error' && <motion.p animate={{transform: 'scale(1)'}} transition={{duration: 0.5}} className='error_text'>{status.message}</motion.p>} 

              <button style={{margin: 0}} type='submit' onClick={(e ) => handleSend(e)}>Actualizar {data.name}</button>
          </form>
        </div>
    </motion.div>
  )
}
