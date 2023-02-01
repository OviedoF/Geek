import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./ProductDetails.module.scss";
import { faMoneyBill, faBackspace } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CaracteristicItem from "../../../libs/CaracteristicItem";

export default function ProductDetails({ product }) {
  return (
    <div className={styles.details}>
      <h3>Detalles</h3>

      <ul className={styles.caracteristics}>
        <CaracteristicItem icon={faBackspace} text={product.name} name={'Nombre'}/>

        <CaracteristicItem icon={faMoneyBill} name={'Precio'} text={product.price} />

        <CaracteristicItem icon={faBackspace} name={'Stock'} text={product.stock ? product.stock : 'No'} />
      </ul>

      <h3 style={{marginTop: '30px'}}>Talles disponibles!</h3>
      <div className={styles.categories}>
        {product.sizes.map(el => <Link >{el}</Link>)}
      </div>

      <h3 style={{marginTop: '30px'}}>Categoria y subcategorías</h3>

      <div className={styles.categories}>
        <Link style={{width: '100%', textAlign: 'center'}}>{product.category.name}</Link>
        <Link>aaaaaaaaaa</Link>
        <Link>dksaoido</Link>

        {product.subcategories.map(el => <p>{el}</p>)}
      </div>


    </div>
  );
}
