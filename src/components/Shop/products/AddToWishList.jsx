import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './AddToShoppingCart.module.scss';

const AddToWishList = ({productId}) => {
    const auth = useSelector(state => state.auth);
    const [adding, setAdding] = useState(false);
    const [isAlreadyInWishList, setIsAlreadyInWishList] = useState(false);

    useEffect(() => {
        setIsAlreadyInWishList(auth.wishList.includes(productId));
    }, [auth, productId]);

    const handleWishList = (e) => {  
        axios.put(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/wishlist`, { productId })
            .then(res => {
                console.log(res.data);
                setAdding(true);
                setTimeout(() => {
                    setAdding(false);
                }, 900);
                setIsAlreadyInWishList(res.data.includes(productId));
            })
            .catch(err => console.log(err));
    }

    return (
        <button onClick={(e) => handleWishList(e)} className={styles.button}>
            {!isAlreadyInWishList ? 
            <>
                <FontAwesomeIcon icon={faHeart} style={{marginRight: '10px'}}/> 
                Agregar a la lista de deseados
                {adding && <span className={styles.oneMore}>-1</span>}
            </>
            :
            <>
                <FontAwesomeIcon icon={faHeartBroken} style={{marginRight: '10px'}}/>
                Quitar de la lista de deseados
                {adding && <span className={styles.oneMore}>+1</span>}
            </>}
        </button>
    );
}

export default AddToWishList;
