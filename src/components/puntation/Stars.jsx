import React, { useState, useEffect } from "react";
import styles from "./Stars.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Stars = ({ quantity, numberSpan, personalizedStyles, renderSpan }) => {
  const [arrayNumber, setArrayNumber] = useState([]);

  return (
    <div
      className={styles.container}
      style={personalizedStyles ? personalizedStyles : {}}
    >
      {quantity >= 1 ? (
        quantity === 5 ? (
          <FontAwesomeIcon icon={faStar} className={styles.star_gold} />
        ) 
        
        : (
          <FontAwesomeIcon icon={faStar} className={styles.star} />
        )
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.no_color} />
      )}

      {quantity >= 2 ? (
        quantity === 5 ? (
          <FontAwesomeIcon icon={faStar} style={{}} className={styles.star_gold} />
        ) 
        
        : (
          <FontAwesomeIcon icon={faStar} className={styles.star} />
        )
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.no_color} />
      )}

      {quantity >= 3 ? (
        quantity === 5 ? (
          <FontAwesomeIcon icon={faStar} style={{}} className={styles.star_gold} />
        ) 
        
        : (
          <FontAwesomeIcon icon={faStar} className={styles.star} />
        )
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.no_color} />
      )}

      {quantity >= 4 ? (
        quantity === 5 ? (
          <FontAwesomeIcon icon={faStar} style={{}} className={styles.star_gold} />
        ) 
        
        : (
          <FontAwesomeIcon icon={faStar} className={styles.star} />
        )
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.no_color} />
      )}

      {quantity >= 5 ? (
        quantity === 5 ? (
          <FontAwesomeIcon icon={faStar} style={{}} className={styles.star_gold} />
        ) 
        
        : (
          <FontAwesomeIcon icon={faStar} className={styles.star} />
        )
      ) : (
        <FontAwesomeIcon icon={faStar} className={styles.no_color} />
      )}

      {renderSpan && <span>({numberSpan})</span>}
    </div>
  );
};

export default Stars;
