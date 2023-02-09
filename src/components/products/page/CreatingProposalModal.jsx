import React, { useState, useEffect } from 'react';
import './CreatingProposalModal.scss'
import '../../../sass/SimpleForm.scss'
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HashLoader } from 'react-spinners';
import axios from 'axios';
import env from '../../../env';
import { useSelector } from 'react-redux';

const CreatingProposalModal = ({setIsCreating, productId, setHaveProposal}) => {
    const [form, setForm] = useState({});
    const [status, setStatus] = useState({status: 'idle'});
    const auth = useSelector(state => state.auth);

    const handleChange = (e) => {
        if(e.target.type === 'file') return setForm({
            ...form,
            images: e.target.files
        })

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        setStatus({status: 'loading'})

        if(!form.comment) return setStatus({status: 'error', message: 'Asegurate de mandarle un comentario al vendedor.'})
        if(!form.amount && !form.images) return setStatus({status: 'error', message: 'Adjunta precio si quieres comprar o imágenes si quiere tradear (o ambas).'})

        formData.append('comment', form.comment);
        formData.append('amount', form.amount || 0);
        formData.append('product', productId);
        formData.append('user', auth._id);
        if(form.images) Object.keys(form.images).map(index => {
            formData.append('images', form.images[index])
        })

        axios.post(`${env.API_URL}/proposal`, formData)
            .then(res => {
                setStatus({status: 'success', message: '¡Propuesta enviada con éxito!'})
                setHaveProposal(true);
                setIsCreating(false);
            })
            .catch(err => {
                console.log(err);
                setStatus({status: 'error', message: 'Ha ocurrido un error al enviar su propuesta :( inténtelo más tarde.'});
            })
    }

    if(status.status === 'loading') return(
        <motion.div transition={{duration: .2}} animate={{transform: 'scale(1)'}} className='creating_proposal'>
            {status.status === 'loading' && <HashLoader size={150} color={'white'} />}
        </motion.div>
    )

    return (
        <motion.div transition={{duration: .2}} animate={{transform: 'scale(1)'}} className='creating_proposal'>
            <FontAwesomeIcon icon={faXmark} onClick={() => setIsCreating(false)}/>

            <div className="form_container">
                <form action="" className="simple_form">
                    <div className="form_group">
                        <label htmlFor="comment">Comentario</label>
                        <textarea onChange={(e) => handleChange(e)} name="comment" id="comment" cols="30" rows="10"></textarea>
                    </div>

                    <div className="form_group">
                        <label htmlFor="amount">Monto a pagar (si es necesario)</label>
                        <input onChange={(e) => handleChange(e)} type="number" name="amount" id="amount" />
                    </div>

                    <div className="form_group">
                        <label htmlFor="images" className='image_picker'>En cambio, si quiere intercambiar, adjunte imágenes de su producto</label>
                        <input onChange={(e) => handleChange(e)} type="file" name="images" id="images" multiple />
                    </div>

                    <button onClick={(e) => handleSubmit(e)} type="submit">Enviar propuesta</button>
                    {status.status === 'error' && <motion.p transition={{duration: .2}} animate={{transform: 'scale(1)'}} className='error_text'>{status.message}</motion.p>}
                    {status.status === 'success' && <motion.p transition={{duration: .2}} animate={{transform: 'scale(1)'}} className='success_text'>{status.message}</motion.p>}
                </form>
            </div>
        </motion.div>
    );
}

export default CreatingProposalModal;