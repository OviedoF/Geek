import React from 'react'
import { Link } from 'react-router-dom'
import CaracteristicItem from '../../libs/CaracteristicItem'
import Stars from '../puntation/Stars'
import styles from './ShopCard.module.scss'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import routes from '../../router/routes'

export default function ShopCard({shop}) {
  return (
    <div className={styles.card}>
        <img className={styles.bannerImage} src={shop.bannerImage} alt={shop.name + 'portada'} />
        <img className={styles.profileImage} src={shop.profileImage} alt={shop.name} />

        <div className={styles.info_shop}>
          <h2>{shop.name}</h2>

          <Stars quantity={5} personalizedStyles={{padding: '0'}}/>

          <p>{shop.description}</p>

          <ul>
            <CaracteristicItem icon={faArchive} name={'Productos'} text={shop.products.length}/>
            <CaracteristicItem icon={faArchive} name={'Vendidos'} text={0}/>
            <CaracteristicItem icon={faArchive} name={'Opiniones'} text={0}/>
          </ul>
        </div>
        
        <Link to={`${routes.shop}/${shop._id}`}>
            Ver tienda
        </Link>
    </div>
  )
}
