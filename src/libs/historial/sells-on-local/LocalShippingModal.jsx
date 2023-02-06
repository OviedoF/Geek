import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import styles from './LocalShippingModal.module.scss';
import socketio from '../../../../helpers/socketio.connect';

const LocalShippingModal = ({setAuthorizeModal, buy}) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_ROOT_API}/api/shop/confirm/local/${buy._id}`)
            .then(res => {
                socketio.emit('purchase-local-confirm', {idBuyer: buy.buyer})
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.modal}>
            <form className={styles.card} onSubmit={(e) => handleSubmit(e)}>
                <FontAwesomeIcon icon={faXmark} onClick={() => setAuthorizeModal(false)} style={{cursor: 'pointer'}}/>

                <h2>¿Está seguro que quiere autorizar la compra?</h2>
                <p>
                    Esto le avisará al usuario que su compra ya está disponible, asegúrese de tener sus productos separados y listos para la compra.
                </p>
                
                <p style={{marginTop: '10px', fontSize: '20px', color: 'yellow'}}>Al finalizar la compra, es decir, cuando el usuario retire de su local, por favor asegúrese de actualizar los stocks de los productos.</p>

                <input type="submit" value="Sì, quiero autorizar la compra." />
            </form>
        </div>
    );
}

export default LocalShippingModal;
