import React from "react";
import styles from "./ProductCard.module.scss";
import Stars from "../../puntation/Stars";
import { Link } from "react-router-dom";

export default function ProductCard({product}) {
  return (
    <Link
      to={`/product/${product._id}`}
      key={product._id}
      className={styles.product_card}
    >
      <img src={product.principalImage} alt="imágen del producto" />
      <div className={styles.details}>
        <h2>{product.name}</h2>

        <span>${product.price}</span>
        <Stars
          quantity={5}
          personalizedStyles={{ padding: "0" }}
          numberSpan={9}
        />
      </div>
    </Link>
  );
}
