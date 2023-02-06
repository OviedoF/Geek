import React from 'react';
import { useSelector } from 'react-redux';
import ShopsContainer from '../../components/Shop/ShopsContainer';

const FavsShops = () => {
    const auth = useSelector(state => state.auth);

    return (
        <main>
            <h1>Tus tiendas favoritas</h1>

            {/* <ShopsContainer shops={auth.favShops} /> */}
        </main>
    );
}

export default FavsShops;
