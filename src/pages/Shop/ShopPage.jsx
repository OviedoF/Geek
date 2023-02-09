import React, { useState, useEffect } from 'react';
import styles from '../MyShop.module.scss'
import ProductsContainer from '../../global/ProductsContainer';
import { useSelector } from 'react-redux';
import PostsContainer from '../../components/Shop/single/PostsContainer';
import ShopPresentation from '../../components/Shop/single/ShopPresentation';
import CommentsContainer from '../../components/Shop/single/CommentsContainer';
import { useParams } from 'react-router-dom';
import LoadingPage from '../../global/LoadingPage';
import NotFoundItem from '../NotFoundItem';
import { useQuery } from 'react-query';
import env from '../../env'

export default function ShopPage() {
    const {id} = useParams();
    const auth = useSelector(state => state.auth);
    const [theUserIsClient, setTheUserIsClient] = useState(false);
    const { data: shop, status } = useQuery('find shop', async () => {
        const response = await fetch(`${env.API_URL}/shop/${id}`)
        return response.json()
    })
    console.log(shop)

    useEffect(() => {
        setTheUserIsClient(auth.shop ? auth.shop._id === id : false);
        console.log(auth.shop)
    }, []);

    if(status === 'loading') return <LoadingPage />
    if(status === 'error') return <NotFoundItem title={'¡Ups! Esta tienda no existe'} subtitle={'No te preocupes, vuelve al inicio :)'} />
    
    if(status === 'success' && shop) return (
            <main className={styles.main_container}>
                <h1>
                    {shop.name}
                </h1>

                <div className={styles.about}>
                    <ShopPresentation shop={shop} />
                </div>

                <div className={styles.media}>
                    <PostsContainer owner={theUserIsClient} posts={shop.posts}/>

                    <h3 style={{margin: '30px 0'}}>Productos</h3>

                    <ProductsContainer products={shop.products} width={'32%'} />

                    {/* <h3 style={{margin: '30px 0'}}>Comentarios</h3>

                    <CommentsContainer theUserIsClient={theUserIsClient} duviId={shop._id} shopId={auth._id}/> */}
                </div>
            </main>
    )
}
