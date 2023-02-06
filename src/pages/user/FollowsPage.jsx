import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ShopsContainer from '../../components/Shop/ShopsContainer';
import { useSelector } from 'react-redux';

const FollowsPage = () => {
    const auth = useSelector(state => state.auth);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/follows`)
            .then(res => setFollows(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
            <main style={{textAlign: 'center'}}>
                <h1 style={{fontSize: '35px', marginBottom: '15px'}}>Mis seguidos</h1>
                <h2>Acá podrás ver las tiendas que tanto te gustaron y guardaste para verlas fácilmente!</h2>

                <ShopsContainer duvis={follows} />
            </main>
    );
}

export default FollowsPage;
