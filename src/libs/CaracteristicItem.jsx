import React from 'react';
import styles from './CaracteristicItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CaracteristicItem = ({icon, name, text}) => {
    return (
        <li className={styles.li}>
            <div className={styles.caracteristic}>
            <FontAwesomeIcon icon={icon} /> {name}
            </div>

            <span>{text}</span>
        </li>
    );
}

export default CaracteristicItem;
