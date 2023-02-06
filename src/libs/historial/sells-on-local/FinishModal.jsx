import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './LocalShippingModal.module.scss';

const FinishModal = ({setFinishModal, purchase, stateSelected, setFilteredByState, perfil}) => {
    const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_ROOT_API}/api/shop/end/local`, {purchase})
            .then(res => 
                axios.get(`${process.env.REACT_APP_ROOT_API}/api/history/${perfil}/${id}`)
                    .then(res => setFilteredByState(res.data.filter(el => el.state === stateSelected)))
                    .catch(err => console.log(err))
            )
            .catch(err => console.error(err));
    }

    return (
        <div className={styles.modal}>
            <form className={styles.card} onSubmit={(e) => handleSubmit(e)}>
                <FontAwesomeIcon icon={faXmark} onClick={() => setFinishModal(false)} style={{cursor: 'pointer'}}/>

                <h2>Finalizar compra</h2>
                <p>Si el comprador ya fue al local y recibió su producto, esta ventana le permitirá actualizar automáticamente el stock de todos los productos que el usuario compró.</p>
                
                <p style={{marginTop: '10px', fontSize: '20px', color: 'yellow'}}>Aún así, por favor, revise los stocks de sus productos para evitar conflictos con los clientes.</p>

                <input type="submit" value="Finalizar la compra" />
            </form>
        </div>
    );
}

export default FinishModal;
