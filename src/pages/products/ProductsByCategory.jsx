import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import env from '../../env';
import NotFoundItem from '../../pages/NotFoundItem';
import LoadingPage from '../../global/LoadingPage';
import ErrorPage from '../../global/ErrorPage';
import ProductsContainer from '../../global/ProductsContainer';

const ProductsByCategory = () => {
    const {category, page} = useParams();
    const { data: products, error, status } = useQuery('products', async () => {
        const response = await axios.get(`${env.API_URL}/product/category/${category}/${page}`)
        return response.data;
    });

    console.log(error)

    if(status === 'loading') return <LoadingPage />

    if(error && error.response.status === 404) return <NotFoundItem title={'¡Ups! parece que,'} subtitle={'¡Has intentado acceder a una categoría inexistente!'} />

    if(error) return <ErrorPage />

    return (
        <main>
            <h1>{category} {page}</h1>

            <ProductsContainer products={products} />
        </main>
    );
}

export default ProductsByCategory;
