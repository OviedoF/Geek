import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import socketio from '../../helpers/socketio.connect';
import { useSelector } from 'react-redux';
import styles from './Notifications.module.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Notifications = () => {
    const auth = useSelector(state => state.auth);
    const [modal, setModal] = useState(false);
    const [userNotis, setUserNotis] = useState([]);
    const [duviNotis, setDuviNotis] = useState([]);

    // useEffect(() => {
    //     if(auth.duvi){
    //         axios.get(`${process.env.REACT_APP_ROOT_API}/api/duvi/${auth.duvi}/notifications`)
    //         .then(res => setDuviNotis(res.data))
    //         .catch(err => console.log(err))
    //     }
        
    //     axios.get(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/notifications`)
    //         .then(res => setUserNotis(res.data))
    //         .catch(err => console.log(err))
    // }, [auth.duvi, auth._id]);

    useEffect(() => {
        if(auth.duvi){
            socketio.on(`buyforlocal-${auth.duvi}`, (data) => {
                console.log(data);

                axios.get(`${process.env.REACT_APP_ROOT_API}/api/duvi/${auth.duvi}/notifications`)
                .then(res => setDuviNotis(res.data))
                .catch(err => console.log(err))
            });

            socketio.off(`buyforlocal-${auth.duvi}`, (data) => {
                console.log(data);

                axios.get(`${process.env.REACT_APP_ROOT_API}/api/duvi/${auth.duvi}/notifications`)
                .then(res => setDuviNotis(res.data))
                .catch(err => console.log(err))
            });
        };

        socketio.on(`purchase-local-confirm-${auth._id}`, (data) => {
            console.log(data);

            axios.get(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/notifications`)
                .then(res => setUserNotis(res.data))
                .catch(err => console.log(err))
        });

        socketio.off(`purchase-local-confirm-${auth._id}`, (data) => {
            console.log(data);

            axios.get(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/notifications`)
                .then(res => setUserNotis(res.data))
                .catch(err => console.log(err))
        });
    }, [auth._id, auth.duvi]);

    const handleClick = () => {
        socketio.emit('message', {message: 'buenas'} );
    }

    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faBell} onClick={(e) => { 
                handleClick(e) 
                setModal(!modal) }}
            />

            {modal && 
            
            <div className={styles.notis}>
                <ul>
                    {duviNotis.map(el => 
                    <Link to={el.redirect} key={el.message}>
                        <li>
                            <h3>{el.subject}</h3>
                            <p>{el.message}</p>
                        </li>
                    </Link>)}

                    {userNotis.map(el => 
                    <Link to={el.redirect} key={el.message}>
                        <li>
                            <h3>{el.subject}</h3>
                            <p>{el.message}</p>
                        </li>
                    </Link>)}
                </ul>
            </div>}
            
        </div>
    );
}

export default Notifications;
