import React, { useState, useEffect } from 'react';
import styles from './MyShop.module.scss'
import ProductsContainer from '../global/ProductsContainer';
import { useSelector } from 'react-redux';
import PostsContainer from '../components/Shop/single/PostsContainer';
import ShopPresentation from '../components/Shop/single/ShopPresentation';
import CommentsContainer from '../components/Shop/single/CommentsContainer';

export default function MyShop() {
    const [shop, setShop] = useState(false);
    const auth = useSelector(state => state.auth);
    const [theUserIsClient, setTheUserIsClient] = useState(false);

    useEffect(() => {
        setShop(auth.shop);
    }, []);
    
  if(shop) return (
    <>
        <main className={styles.main_container}>
            <h1>
                {shop.name}
            </h1>

            <div className={styles.about}>
                <ShopPresentation shop={shop} />
            </div>

            <div className={styles.media}>
                <PostsContainer owner={!theUserIsClient} posts={shop.posts}/>

                <h3 style={{margin: '30px 0'}}>Productos</h3>

                <ProductsContainer products={shop.products} owner={!theUserIsClient} width={'32%'} />

                {/* <h3 style={{margin: '30px 0'}}>Comentarios</h3> */}

                {/* <CommentsContainer theUserIsClient={theUserIsClient} shopId={shop._id} userId={auth._id}/> */}
            </div>
        </main>
    </>
  )
}
