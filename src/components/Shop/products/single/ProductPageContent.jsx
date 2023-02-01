import React from "react";
import styles from "./ProductPageContent.module.scss";
import ProductPreview from "./ProductPreview";
import ProductDetails from "./ProductDetails";
import AddToWishList from "../AddToWishList";
import AddToShoppingCart from "../AddToShoppingCart";
import { useSelector } from "react-redux";

export default function ProductPageContent({ product }) {
  const auth = useSelector(state => state.auth);
  
  return (
    <div className={styles.info_container}>
      <div className={styles.heading}>
        <h1>{product.name}</h1>

        
        {auth.duvi !== product.duvi && 
          <div className={styles.actions}>
            <AddToWishList productId={product._id}/>

            {product.stock > 0 && <AddToShoppingCart productId={product._id}/>}
          </div>
        }
      </div>

      <ProductPreview product={product} />

      <ProductDetails product={product} />
    </div>
  );
}
