import React, { useState, useEffect } from 'react';
import styles from '../../../pages/products/AllProductsPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const PricesFilter = ({handleChange}) => {
  const [pricesSelected, setPricesSelected] = useState({});  

  useEffect(() => {
    handleChange('prices', pricesSelected)
  }, [pricesSelected]);

  return (
    <div className={styles.price_inputs_container}>
      <input type="text" name="" id="" placeholder="Min" 
      onChange={(e) => setPricesSelected({...pricesSelected, minPrice: parseInt(e.target.value)})}/>

      <input type="text" name="" id="" placeholder="Max" 
      onChange={(e) => setPricesSelected({...pricesSelected, maxPrice: parseInt(e.target.value)})}/>

      <button>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default PricesFilter;
