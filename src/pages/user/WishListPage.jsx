import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductsContainer from '../../components/products/ProductsContainer';

const WishListPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROOT_API}/api/user/${id}/wishlist`)
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
