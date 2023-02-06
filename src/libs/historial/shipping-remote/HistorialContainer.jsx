import React, { useState, useContext, useEffect } from 'react';
import HistorialCard from "./HistorialCard";
import { useSelector } from "react-redux";
import styles from './HistorialContainer.module.scss';
import ShippingBuysContext from './ShippingRemote.context';


export default function HistorialContainer({ history, shipping }) {
  const auth = useSelector(state => state.auth);
  const {shippingBuysData, handleContext} = useContext(ShippingBuysContext);

  useEffect(() => {
    handleContext('products', history.filter(el => el.state === shippingBuysData.stateOfProduct))
  }, [shippingBuysData.stateOfProduct]);

  const grid_template = {
    display: "grid",
    gridTemplateColumns: history.length > 0 && auth.duvi === history[0].seller ? "repeat(6, 1fr)" : "repeat(5, 1fr)",
    justifyItems: "center"
  }

  return (
    <section style={{ marginTop: "40px" }}>
      <div className={styles.buttons_state}>
        <button onClick={() => handleContext('stateOfProduct', 'Esperando afirmación')} style={{color: shippingBuysData.stateOfProduct === 'Esperando afirmación' ? 'white' : '#FFFFFF60'}}>
          Esperando afirmación
        </button>

        <button onClick={() => handleContext('stateOfProduct', 'Esperando pago')} style={{color: shippingBuysData.stateOfProduct === 'Esperando pago' ? 'white' : '#FFFFFF60'}}>
          Esperando pago
        </button>

        <button onClick={() => handleContext('stateOfProduct', 'Esperando envío')} style={{color: shippingBuysData.stateOfProduct === 'Esperando envío' ? 'white' : '#FFFFFF60'}}>
          Esperando envío
        </button>

        <button onClick={() => handleContext('stateOfProduct', 'Esperando recepción')} style={{color: shippingBuysData.stateOfProduct === 'Esperando recepción' ? 'white' : '#FFFFFF60'}}>
          Esperando recepción
        </button>

        <button onClick={() => handleContext('stateOfProduct', 'Completados')} style={{color: shippingBuysData.stateOfProduct === 'Completados' ? 'white' : '#FFFFFF60'}}>
          Completados
        </button>
      </div>

      <ul style={grid_template}>
        <li>Imágen</li>
        <li>Nombre</li>
        <li>Estado</li>
        <li>Factura</li>
        {history[0] && auth.duvi === history[0].seller && <li>Autorizar compra</li>}
        <li>Presentar un comentario</li>
      </ul>

      <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
        {shippingBuysData.products.map((el) => (
          <HistorialCard
            shipping={shipping}
            isSeller={auth.duvi === el.seller}
            images={el.images}
            name={`Compra`}
            state={el.state}
            products={el.products.length}
            invoice={el.invoice}
          />
        ))}
      </div>
    </section>
  )
}
