import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import env from '../../env';
import { useQuery } from 'react-query';
import LoadingPage from '../../global/LoadingPage'
import NotFoundItem from '../NotFoundItem';
import ProductPresentation from '../../components/products/page/ProductPresentation';
import Proposals from '../../components/products/page/Proposals';
import { useSelector } from 'react-redux';

const ProductPage = () => {
    const {id} = useParams();
    const { data: product, error, status } = useQuery('user', async () => {
        const response = await axios.get(`${env.API_URL}/product/${id}`)
        return response.data;
    });
    const auth = useSelector(state => state.auth);

    if(status === 'loading') return <LoadingPage />

    if (status === 'error') return <NotFoundItem title={'¡Ups! Parece que este producto no existe'} subtitle={'No te preocupes, te llevaremos al inicio 😊'} />

    if (status === 'success' && product && product.galleryImages) return (
        <main>
            <ProductPresentation auth={auth} product={product} images={[product.principalImage, ...product.galleryImages]} />

            {!product.inProcess && <Proposals auth={auth} owner={auth.shop ? product.shop._id === auth.shop._id : false} product={product}/>}

            {product.inProcess && <div className="product__in_process" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                <h2 className="product__in_process__title">¡Este producto está en proceso!</h2>
                <p className="product__in_process__subtitle">Este producto está en proceso de intercambio o compra :), ¡visite las demás publicaciones!.</p>
            </div>}
        </main>
    );
}

export default ProductPage;
