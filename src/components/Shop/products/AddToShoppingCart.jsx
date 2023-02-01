import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './AddToShoppingCart.module.scss';

const AddToShoppingCart = ({productId}) => {
    const auth = useSelector(state => state.auth);
    const [adding, setAdding] = useState(false);
    const [isAlreadyOnCart, setIsAlreadyOnCart] = useState(auth.shoppingCart.includes(productId));

    const handleShoppingCart = (e) => {
        axios.put(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/shopping-cart`, { productId })
            .then(res => {
                setAdding(true);

                setTimeout(() => {
                    setAdding(false);
                }, 900);
                setIsAlreadyOnCart(res.data.includes(productId));
            })
            .catch(err => console.log(err));
    }  

    return (
        <button onClick={(e) => handleShoppingCart(e)} className={styles.button}>
            {!isAlreadyOnCart ? 
            <>
                Agregar al carrito
                {adding && <span className={styles.oneMore}>+1</span>}
            </>
            :
            <>
                Remover del carrito
                {adding && <span className={styles.oneMore}>-1</span>}
            </>}
        </button>
    );
}

export default AddToShoppingCart;
