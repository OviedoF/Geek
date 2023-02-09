import React from 'react';
import { useSelector } from 'react-redux';
import './UserPage.scss';

const UserPage = () => {
    const auth = useSelector(state => state.auth);

    return (
        <main id='userpage_main'>
            <div className="user">
                <img src={auth.userImage} alt="imágen de usuario" />

                <div className="group">
                    <h2>Nombre:</h2>
                    <h3>{auth.name}</h3>
                </div>

                <div className="group">
                    <h2>Nombre de usuario:</h2>
                    <h3>{auth.username}</h3>
                </div>

                <div className="group">
                    <h2>Celular:</h2>
                    <h3>+{auth.cellphone}</h3>
                </div>

                <div className="group">
                    <h2>Email:</h2>
                    <h3>{auth.email}</h3>
                </div>

                <div className="group">
                    <h2>Fecha de registro:</h2>
                    <h3>{auth.createdAt}</h3>
                </div>

                <button>Editar perfil</button>
            </div>
        </main>
    );
}

export default UserPage;
