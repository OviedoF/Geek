import React, { useState, useEffect } from 'react';
import styles from './ShopPage.module.scss'
import ProductsContainer from '../components/Shop/products/ProductsContainer';
import { useSelector } from 'react-redux';
import PostsContainer from '../components/Shop/single/PostsContainer';
import DuviPresentation from '../components/Shop/single/DuviPresentation';
import CommentsContainer from '../components/Shop/single/CommentsContainer';

export default function ShopPage() {
    const [shop, setShop] = useState(false);
    const auth = useSelector(state => state.auth);
    const [theUserIsClient, setTheUserIsClient] = useState(false);

    useEffect(() => {
        setShop(auth.shop);
    }, []);
    
  return (
    <>
        <main className={styles.main_container}>
            <h1>
                {shop.name}
            </h1>

            <div className={styles.about}>
                <h3>About</h3>

                <DuviPresentation shop={shop} />
            </div>

            <div className={styles.media}>
                <PostsContainer owner={shop._id === auth.shop} posts={shop.posts}/>

                <h3 style={{margin: '30px 0'}}>Productos</h3>

                <ProductsContainer products={shop.products} owner={shop._id === auth.shop}/>

                <h3 style={{margin: '30px 0'}}>Comentarios</h3>

                <CommentsContainer theUserIsClient={theUserIsClient} duviId={shop._id} userId={auth._id}/>
            </div>
        </main>
    </>
  )
}
