import React from "react";
import styles from "./ProductsContainer.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stars from "../../puntation/Stars";
import ProductCard from "./ProductCard";

export default function ProductsContainer({ owner, products }) {
  return (
    <section className={styles.container}>
      <div className={styles.cards_container}>
        {products && products.map((el) => <ProductCard product={el} key={el._id}/>)}

        {owner && (
          <Link to={"/products/add"} className={styles.add_redirect}>
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        )}
      </div>
    </section>
  );
}
