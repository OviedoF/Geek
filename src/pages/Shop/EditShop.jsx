import React from 'react';
import { useSelector } from 'react-redux';
import EditShopForm from '../../components/Shop/Edit/EditShopForm';

const EditShop = () => {
    const auth = useSelector(state => state.auth);

    return (
        <main>
            <h1>Editar tienda</h1>

            <EditShopForm shop={auth.shop}/>
        </main>
    );
}

export default EditShop;
