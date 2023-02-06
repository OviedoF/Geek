import React, { useState, useEffect } from 'react';
import styles from './ShopsContainer.module.scss';
import ShopCard from './ShopCard';
import axios from 'axios';

export default function ShopsContainer({duvis}) {

  return (
    <section className={styles.shops_container}>
        {duvis.map((el) => {
            return(
                <ShopCard key={el._id} shop={el}/>
            )
        })}
    </section>
  )
};