import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductsContainer from '../../global/ProductsContainer'
import env from '../../env';
import { useSelector } from 'react-redux';

const WishListPage = () => {
    const [products, setProducts] = useState([]);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        axios.get(`${env.API_URL}/user/${auth._id}/wishlist`)
            .then(res => setProducts (res.data))
            .catch(err => console.log(err));
    }, []);


    return (
            <main>
                <h1 style={{fontSize: '35px', marginBottom: '15px'}}>Lista de deseos</h1>
                <h2 style={{marginBottom: '20px'}}>Estos productos te gustaron tanto para guardarlos acá, de esa forma te será más fácil recordar tu próxima compra! ;)</h2>

                <ProductsContainer products={products} quantity={4}/>
            </main>
    );
}

export default WishListPage;
