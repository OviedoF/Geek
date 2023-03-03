import React from 'react'
import { Link } from 'react-router-dom'
import './PurchaseCard.scss'

export default function PurchaseCard({purchase}) {
  return (
    <div className="purchase_card" key={purchase._id}>
        <h3>Compra #{purchase._id}</h3>
        <p>Fecha: {purchase.date}</p>
        <p>Estado: {purchase.status}</p>
        <p>Tipo: {purchase.type}</p>

        <Link to={purchase.button.link}>
            <button>{purchase.button.text}</button>
        </Link>
    </div>
  )
}
