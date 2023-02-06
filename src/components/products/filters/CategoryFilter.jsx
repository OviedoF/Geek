import React, { useState, useEffect } from 'react';
import styles from "../../../pages/products/AllProductsPage.module.scss";

const CategoryFilter = ({ categories, handleChange }) => {
  const [inputs, setInputs] = useState({});

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: inputs[e.target.id] ? !inputs[e.target.id] : true
    });
  };

  useEffect(() => {
    const aux = [];
    const keys = Object.keys(inputs);

    keys.forEach(el => {
      if(inputs[el] === true) aux.push(el);
    });

    handleChange('categories', aux);
  }, [inputs]);

  return (
    <>
      {categories.map((el, index) => (
        <div
          className={styles.categorie_item}
          style={{ marginTop: index === 0 ? "0" : "30px" }}
          key={index}
        >
          <input type="checkbox" id={el.name} onChange={(e) => handleInput(e)}/>
          <label htmlFor={el.name} style={{ cursor: "pointer" }}>
            {el.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoryFilter;
