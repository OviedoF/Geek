import React from 'react';
import './ErrorPage.scss';

const ErrorAlert = () => {
    return (
        <main id="error_page">
            <div id="error">
                <div id="box"></div>
                <h3>ERROR 500</h3>
                <p>Ha ocurrido un error en el servidor :(</p>
                <p>Recomendamos volver a intentar</p>
            </div>
        </main>
    );
}

export default ErrorAlert;
