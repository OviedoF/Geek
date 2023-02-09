import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingPage from '../../global/LoadingPage';
import ErrorPage from '../../global/ErrorPage';
import env from '../../env'
import ShopsContainer from '../../components/Shop/ShopsContainer';

const ViewShops = () => {
    const [shops, setShops] = useState([]);
    const [status, setStatus] = useState({status: 'idle'});
    const [pageShops, setPageShops] = useState(1);

    useEffect(() => {
        axios.get(`${env.API_URL}/shop/per-page/${pageShops}`)
            .then(res => setShops(res.data))
            .catch(err => {
                console.log(err);
                setStatus({status: 'error'})
            })
    }, [pageShops]);

    if(status.status === 'loading') return <LoadingPage />
    if(status.status === 'error') return <ErrorPage />

    return (
        <main>
            <h1>Ver tiendas</h1>

            <ShopsContainer shops={shops} />
        </main>
    );
}

export default ViewShops;
