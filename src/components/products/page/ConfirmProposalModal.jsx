import React, { useState } from 'react';
import './ConfirmProposalModal.scss';
import {motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import env from '../../../env';

export default function ConfirmProposalModal({proposal, product, setConfirmModal}) {
  const [state, setState] = useState({status: 'idle'})

  const handleSend = () => {
    setState({status: 'loading'})
    // send data to server

    axios.post(`${env.API_URL}/purchase`, {
      proposal: proposal._id,
      product: product._id,
    })
    .then(res => {
      setState({status: 'success'})
    })
    .catch(err => {
      setState({status: 'error'})
    })
  }

  if(state.status !== 'idle') return (
    <motion.div
      id="confirm_modal"
      transition={{ duration: 0.5 }}
      animate={{ transform: 'scale(1)' }}
      exit={{
        opacity: 0,
        transform: 'scale(0.8)',
        transition: { duration: 0.3 },
      }}>
        <div className="confirm_modal__content" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          {state.status === 'loading' && <HashLoader size={150} color={'white'} />}
          {state.status === 'success' && <>
            <h2 className="confirm_modal__title">¡Propuesta confirmada!</h2>
            <p className='disclaimer'>Ahora debes esperar a que el cliente deposite sus rupias para que puedas enviarle el producto.</p>
            <div className="confirm_modal__buttons">
              <button onClick={() => window.location.reload()} className="confirm_modal__button confirm_modal__button--confirm" >Confirmar</button>
            </div>
          </>}

          {state.status === 'error' && <>
            <h2 className="confirm_modal__title">¡Ha ocurrido un error!</h2>
            <p className='disclaimer'>Vuelve a intentar o intente más tarde.</p>
            <div className="confirm_modal__buttons">
              <button className="confirm_modal__button confirm_modal__button--cancel" onClick={() => setConfirmModal(false)}>Cancelar</button>
              <button onClick={(e) => handleSend(e)} className="confirm_modal__button confirm_modal__button--confirm" >Confirmar</button>
            </div>
          </>}
        </div>
    </motion.div>
  )

  return (
    // motion.div with animate and exit props
    <motion.div
      id="confirm_modal"
      transition={{ duration: 0.5 }}
      animate={{ transform: 'scale(1)' }}
      exit={{
        opacity: 0,
        transform: 'scale(0.8)',
        transition: { duration: 0.3 },
      }}
    >
      <FontAwesomeIcon icon={faTimes} className="confirm_modal__close" onClick={() => setConfirmModal(false)} />

      <div className="confirm_modal__content">
        <h2 className="confirm_modal__title">¿Estás seguro que deseas confirmar esta propuesta?</h2>
        <p className='disclaimer'>Esto deshabilitará tu publicación a menos que se cancele la propuesta, por lo que no podrás acepetar las otras propuestas. A su vez, una vez confirmes se esperará a que el cliente deposite 
          sus rupias para que puedas enviarle el producto (si es que hay rupias para transferir).
        </p>

        <div className="confirm_modal__buttons">
          <button className="confirm_modal__button confirm_modal__button--cancel" onClick={() => setConfirmModal(false)}>Cancelar</button>
          <button onClick={() => handleSend()} className="confirm_modal__button confirm_modal__button--confirm">Confirmar</button>
        </div>
      </div>  
    </motion.div>
  )
}
