import React from 'react'
import { faTwitter, faFacebook, faLinkedin, faWhatsapp, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faLocation } from '@fortawesome/free-solid-svg-icons'
import styles from './SocialMediaIcon.module.scss'

const medias = {
    twitter: {
        icon: faTwitter,
        color: '#00acee'
    },
    facebook: {
        icon: faFacebook,
        color: '#3b5998'
    },
    linkedin: {
        icon: faLinkedin,
        color: '#0e76a8'
    },
    whatsapp: {
        icon: faWhatsapp,   
        color: '#075e54'
    },
    youtube: {
        icon: faYoutube,
        color: '#FF0000'
    },
    tiktok: {
        icon: faTiktok,
        color: '#ff0050'
    },
    instagram: {
        icon: faInstagram,
        color: '-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
    },
    website:{
        icon: faGlobe,
        color: '#34568B'
    },
    location: {
        icon: faLocation,
        color: '#000000'
    }
}

export default function SocialMediaIcon({media, contact}) {
    const style = {
        background: medias[media] ? medias[media].color : 'black',
    }

  return (
    <a className={styles.redirect} href={`https://www.${media}.com`} rel={'noreferrer'} target={'_blank'} style={style}>
        <FontAwesomeIcon  icon={medias[media].icon} />
        <p>{contact}</p>
    </a>
  )
}
