import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../env';
import './ProductsContainer.scss';

const formatNumbers = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    return number.toString().replace(exp,rep);
}

const ProductCard = ({product}) => {
    return (
        <div className="product_card">
            <img src={product.principalImage} alt={product.name} />

            <div className="info">
                <h3 className='product_name'>{product.name}</h3>

                {product.tradable && <p className='accept'><FontAwesomeIcon icon={faCheck} /> Acepta tradeos</p>}
                {product.salable && <p className='accept'><FontAwesomeIcon icon={faCheck} /> Lo vende: ${formatNumbers(product.price)}</p>}

                <Link to={`${routes.products}/${product._id}`}>Mandar propuesta</Link>
            </div>
        </div>
    )
}

const ProductsContainer = ({products}) => {
    console.log(products);

    return (
        <>
            <h2 className='separation-top'>Vea nuestros productos destacados!</h2>

            <section className='products_container'>
                {products.map(product => (
                    <ProductCard product={product} />
                ))}
            </section>
        </>
    );
}

export default ProductsContainer;
