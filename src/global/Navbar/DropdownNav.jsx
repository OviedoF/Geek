import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import styles from './DropdownNav.module.scss'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function DropdownNav({icon, text, arrayData, action}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <li className={styles.container} onClick={() => setIsActive(!isActive)} style={isActive ? {marginBottom: `${(arrayData.length * 49)}px`} : {}} >

        <div className={styles.activator} active={isActive ? 'on' : 'off'}>
          <FontAwesomeIcon icon={icon} style={{marginRight: '10px', width: '20px'}}/> 
          {text}
          <FontAwesomeIcon icon={faCaretRight} style={{marginLeft: '5px', color: '#FFFFFF50'}} className={isActive ? styles.active_icon : styles.arrow_icon}/>
        </div>

        {isActive && arrayData && <div className={styles.modal}>
          {arrayData.map(el => <Link key={el[1]} to={el[1]} onClick={action && action}> {el[0]} </Link>)}
        </div>}
        
    </li>
  )
}
