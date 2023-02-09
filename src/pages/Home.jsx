import React, { useState, useEffect } from 'react';
import CategorySelect from '../components/Home/CategorySelect';
import TradersView from '../components/Home/TradersView';
import { useQuery } from 'react-query';
import env from '../env'
import axios from 'axios';
import ProductsContainer from '../global/ProductsContainer';

const fetchCategories = async () => {
    const response = await axios.get(`${env.API_URL}/category`)
    return response.data
}

const fetchProducts = async () => {
    const response = await axios.get(`${env.API_URL}/product`)
    return response.data
}

const Home = () => {
    const { data: categories, status: statusCategories } = useQuery('get categories home', fetchCategories);
    const { data: products, status: statusProducts } = useQuery('get products home', fetchProducts);

    if(categories && products) return (
        <main>
            <CategorySelect categories={categories} error={statusCategories === 'error'} />
            {/* <TradersView /> */}
            <ProductsContainer products={products} title={'Vea nuestros productos destacados!'}/>

        </main>
    );
}

export default Home;
