import React, { useState, useEffect } from 'react';
import styles from './ProductsContainer.module.scss';
import Stars from '../puntation/Stars'
import { Link } from 'react-router-dom';

export default function ProductCardHome({product, quantity}) {
    const [promedyStars, setPromedyStars] = useState(0);

    useEffect(() => {
        let stars = 0;
        product.comments.forEach(comment => stars += comment.stars);
        setPromedyStars(stars / product.comments.length);
    }, [product.comments]);

    return (
    <Link className={styles.card} to={`/product/${product._id}`} style={{width: `${(100 / quantity) - 1}%`}} key={product._id}>

        <img src={product.principalImage} alt='imagen producto'/>

        <h2>{product.name}</h2>

        {promedyStars > 0 ? <Stars quantity={parseInt(promedyStars)} numberSpan={12}/> : <p style={{marginBottom: '15px', color: '#FFFFFF50'}}>No hay calificaciones todavía.</p>}

        <p>${product.price}</p>
    </Link>
  )
}
