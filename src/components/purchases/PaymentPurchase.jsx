import React from 'react'
import { useState } from 'react'
import PaymentPurchaseModal from './PaymentPurchaseModal';
import './PaymentPurchaseSection.scss'

export default function PaymentPurchaseSection({purchase}) {
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <section id='payment_purchase_section'>
        {confirmModal && <PaymentPurchaseModal setConfirmModal={setConfirmModal} purchase={purchase} />}

        <h1>Pagar intercambio con id {purchase._id}</h1>

        <p>Este intercambio solicita <strong>{purchase.amount}</strong> rupias por parte de: <strong>{purchase.buyer.name}</strong> a la tienda: <strong>{purchase.seller.name}</strong></p>

        <p>Una vez depositadas las rupias, el proceso de envío empezará automáticamente, cada parte (vendedor y comprador) es la encargada de manejar su pedido. Esto no aplicada para el comprador que no quiera intercambiar y sóolo haya comprado.</p>

        <button className='button_payment' onClick={() => setConfirmModal(true)}>Depositar</button>
    </section>
  )
}
