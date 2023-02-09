import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import env from '../../env';
import ProductsContainer from '../../global/ProductsContainer'

const ViewProducts = () => {
    const { data: products, error, status } = useQuery('user', async () => {
        const response = await axios.get(`${env.API_URL}/product/page/1`)
        return response.data;
    });

    console.log(products)

    return (
        <main>
            <h1>Ver productos</h1>

            {/* <ProductsContainer products={products} /> */}
        </main>
    );
}

export default ViewProducts;
