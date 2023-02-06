import React from 'react';
import styles from './ProductsContainer.module.scss';
import Stars from '../puntation/Stars'
import { Link } from 'react-router-dom';
import ProductCardHome from './ProductCardHome';

const ProductsContainer = ({products, quantity}) => {
    return (
        <div className={styles.container}>
            {products.map(product => (
                <ProductCardHome product={product} key={product._id} quantity={quantity}/>
            ))}
        </div>
    );
}

export default ProductsContainer;
