import React from 'react';
import { useSelector } from 'react-redux';
import ProductsContainer from '../../components/products/ProductsContainer'

const FavsProducts = () => {
    const auth = useSelector(state => state.auth);

    return (
        <main>
            <h1>Tus productos favoritas</h1>

            {/* <ProductsContainer products={auth.favProducts} /> */}
        </main>
    );
}

export default FavsProducts;
