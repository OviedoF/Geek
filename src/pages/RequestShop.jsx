import React from 'react';
import RequestShopForm from '../components/Shop/Edit/EditShopForm';

const RequestShop = () => {
    return (
        <main>
            <h1>Solicitar tienda</h1>
            <p className="disclaimer"> Para empezar a vender o tradear en nuestra plataforma, debes solicitar una tienda. El proceso es muy sencillo, solo debes llenar el siguiente formulario y listo. Una vez que tu tienda sea aprobada, podrás empezar a vender o tradear tus productos en nuestra plataforma.</p>

            <RequestShopForm shop={{}} />
        </main>
    );
}

export default RequestShop;
