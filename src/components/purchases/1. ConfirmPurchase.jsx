import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../router/routes'
import './1. ConfirmPurchase.scss'
import env from '../../env'

export default function ConfirmPurchase({purchase, setPostStatus}) {

    const handleSend = async (e) => {
        e.preventDefault();
        setPostStatus({status: 'loading'})

        axios.put(`${env.API_URL}/purchase/confirm/${purchase._id}`)
        .then(res => {
            setPostStatus({status: 'success'})
        })
        .catch(err => {
            setPostStatus({status: 'error'})
        })
    }

  return (
    <form action="" id='confirm_purchase_form'>
        <h2>Confirmar intercambio/compra</h2>
        <p className="disclaimer">
            <strong>Importante:</strong> Al confirmar el intercambio/compra, el vendedor recibirá un correo electrónico con sus datos de contacto, se recomienda hacer transacciones con rupias para Geek4Dummies poder ayudarlo en cualquier caso.
        </p>

        <p>Usted ha ofertado para el producto: {purchase.product.name}</p>

        <Link to={`${routes.product}/${purchase.product._id}`}>
            <button type='button'>Ver producto</button>
        </Link>

        <p>El vendedor es: {purchase.seller.name}</p>

        <button id='confirm_purchase_button' onClick={(e) => handleSend(e)}>
            Confirmar
        </button>
        <p className="disclaimer">
            <strong>Importante:</strong> Una vez confirmada la compra, el proceso de envío queda pendiente hasta que se depositen las rupias necesarias. Dicho proceso de envío puede ser para ambas partes o sólo para el vendedor según sea intercambio o venta.
        </p>
    </form>
  )
}
