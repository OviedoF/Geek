import React, { useState } from 'react'
import './PaymentPurchaseModal.scss'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import env from '../../env'
import { useSelector } from 'react-redux'

export default function PaymentPurchaseModal({ setConfirmModal, purchase }) {
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const auth = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    const token = localStorage.getItem('token');

    axios.put(`${env.API_URL}/purchase/pay-amount/${purchase._id}/${auth._id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setStatus('success');
      })
      .catch(err => {
        setStatus('error');
        setErrorMessage(err.response.data.message);
      })
  };

  if (status === 'loading') return (
    <motion.div animate={{ transform: 'scale(1)' }} className='payment_purchase_modal'>
      <HashLoader color={'white'} loading={true} size={100} />
    </motion.div>
  )

  if (status === 'success') return (
    <motion.div animate={{ transform: 'scale(1)' }} className='payment_purchase_modal'>
      <FontAwesomeIcon icon={faXmark} className='close_modal' onClick={() => setConfirmModal(false)} />

      <div className="confirm_purchase_card">
        <h1>¡Pago realizado!</h1>
        <p className="disclaimer">El pago se ha realizado correctamente. El proceso de envío ha comenzado.</p>
      </div>
    </motion.div>
  )

  if (status === 'error') return (
    <motion.div animate={{ transform: 'scale(1)' }} className='payment_purchase_modal'>
      <FontAwesomeIcon icon={faXmark} className='close_modal' onClick={() => setConfirmModal(false)} />

      <div className="confirm_purchase_card">
        <h1>¡Ha ocurrido un error!</h1>
        <p className="disclaimer">{errorMessage}</p>
      </div>
    </motion.div>
  )

  return (
    <motion.div animate={{ transform: 'scale(1)' }} className='payment_purchase_modal'>
      <FontAwesomeIcon icon={faXmark} className='close_modal' onClick={() => setConfirmModal(false)} />

      <div className="confirm_purchase_card">
        <h1>Confirmar pago</h1>
        <p className="disclaimer">Una vez completado el pago, se activará el proceso de envío al vendedor. Si ústed ha ofrecido un objeto a cambio, se activará también para usted.</p>

        <p>¿Estás seguro de que quieres depositar las {purchase.amount} rupias de este intercambio?</p>
        <p>El usuario destino es: {purchase.seller.name}</p>

        <div className="confirm_purchase_buttons">
          <button className='button_payment cancel' style={{ backgroundColor: 'var(--color-danger)' }} onClick={() => setConfirmModal(false)}>Cancelar</button>
          <button className='button_payment confirm' style={{ backgroundColor: 'var(--color-success)' }} onClick={(e) => handleSubmit(e)}>Confirmar</button>
        </div>
      </div>
    </motion.div>
  )
}
