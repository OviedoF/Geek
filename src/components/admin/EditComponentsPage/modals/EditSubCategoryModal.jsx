import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SubCategoryForm from '../../SubCategoryForm'
import axios from 'axios';
import env from '../../../../env';
import { HashLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion';

const EditSubCategoryModal = ({setIsEditing, isEditing: data, categories}) => {
    const [form, setForm] = useState(data);
    const [status, setStatus] = useState({status: 'idle'});
    const auth = useSelector(state => state.auth)

    const handleSend = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        setStatus({status: 'loading'})

        console.log(form);

        if(!form.name || !form.description || !form.category ) return setStatus({status: 'error', message: 'No puede dejar a su sub-categoría sin nombre, descripción o categoría.'})

        typeof form.category !== 'object' && formData.append('category', form.category)
        form.image && formData.append('images', form.image)
        formData.append('name', form.name);
        formData.append('description', form.description);

        axios.put(`${env.API_URL}/subCategory/${data._id}`, formData, {
            headers: {
                userid: auth._id
            }
        })
            .then((res) => {
                setStatus({
                    status: 'success',
                    message: 'Sub-Categoría actualizada correctamente.'
                })
                setForm(res.data)
                setIsEditing(res.data)
            })
            .catch((res) => setStatus({
                status: 'error',
                message: 'Error al actualizar su Sub-Categoría.'
            }))
    }

    if(status.status === 'loading') return(
        <div className="edit_modal">
          <HashLoader color='white' size={150}/>
        </div>
    )

    return (
        <motion.div className='edit_modal' animate={{transform: 'scale(1)'}} transition={{duration: 0.5}}>
            <FontAwesomeIcon icon={faXmark} onClick={() => setIsEditing(false)} /> 
         
            <div className="form_edit_container edit_item">
                <SubCategoryForm data={data} form={form} categories={categories} setForm={setForm} buttonText={`Actualizar sub-categoria ${data.name}`} action={handleSend} />

                {status.status === 'success' && <motion.p animate={{transform: 'scale(1)'}} transition={{duration: 0.5}} className='success_text'>{status.message}</motion.p>}
                {status.status === 'error' && <motion.p animate={{transform: 'scale(1)'}} transition={{duration: 0.5}} className='error_text'>{status.message}</motion.p>} 
            </div>
        </motion.div>
    );
}

export default EditSubCategoryModal;
