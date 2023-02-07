import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingPage = () => {
    return (
        <main className='loading_container'>
            <HashLoader size={150} color={'white'} />
        </main>
    );
}

export default LoadingPage;
