import React, { useState, useEffect } from 'react';
import styles from "../../../pages/products/AllProductsPage.module.scss";
import Stars from "../../puntation/Stars";

const StarsFilter = ({ handleChange }) => {
  const arrayToRender = [5, 4, 3, 2, 1];
  const [noStars, setNoStars] = useState(false);
  const [stars, setStars] = useState([]);

  const handleStars = (number) => {
    if(stars.includes(number)) {
      const filtered = stars.filter(el => {
        return el !== number;
      });

      setStars(filtered);
    }

    if(!stars.includes(number)) {
      setStars([...stars, number]);
    }

    console.log(stars);
  }

  useEffect(() => {
    handleChange('noStars', noStars);
    handleChange('stars', stars);
  }, [stars, noStars]);

  return (
    <>
      {arrayToRender.map((number) => (
        <div className={styles.item_stars} key={number}>
          <input type="checkbox" id={`${number}_stars`} onChange={((e => handleStars(number)))}/>
          <label htmlFor={`${number}_stars`}>
            <Stars quantity={number} />
          </label>
        </div>
      ))}

      <div className={styles.item_stars} style={{marginTop: '10px'}}>
        <input type="checkbox" id={`no_stars`} onChange={(e) => setNoStars(!noStars)}/>
        <label htmlFor={`no_stars`}>
          <h3>Nuevos disponibles!</h3>
        </label>
      </div>
    </>
  );
};

export default StarsFilter;
