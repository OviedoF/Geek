import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './DuviPresentation.module.scss';
import { faVoicemail, faGlobe, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faYoutube, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import FollowButton from './FollowButton.jsx';
import { Link } from 'react-router-dom';
import routes from '../../../router/routes';

const DuviPresentation = ({shop}) => {
    return (
        <div className={styles.card}>
            <Link to={routes.editShop} id={styles.icon_edit}><FontAwesomeIcon icon={faEdit}/></Link>

            <div className={styles.pictures}>
                <img src={shop.bannerImage} className={styles.bannerImage} alt="imágen del banner" />
                <img src={shop.profileImage} className={styles.profileImage} alt="imágen de perfil" />
            </div>

            <h2>{shop.name}</h2>

            <FollowButton duviId={shop._id}/>

            <h4>Descripción</h4>
            <p>{shop.description}</p>

            <h4>Contacto</h4>
            <ul>
                {shop.email && <li><FontAwesomeIcon icon={faVoicemail} /> {shop.email}</li>}

                {/* {shop && shop.socialMedia.website && <li><FontAwesomeIcon icon={faGlobe}/>{shop.socialMedia.website}</li>}

                {shop && shop.socialMedia.facebook && <li><FontAwesomeIcon icon={faFacebook}/>{shop.socialMedia.facebook}</li>}

                {shop && shop.socialMedia.instagram && <li><FontAwesomeIcon icon={faInstagram}/>{shop.socialMedia.instagram}</li>}

                {shop && shop.socialMedia.linkedin && <li><FontAwesomeIcon icon={faLinkedin}/>{shop.socialMedia.linkedin}</li>}

                {shop && shop.socialMedia.whatsapp && <li><FontAwesomeIcon icon={faWhatsapp}/>{shop.socialMedia.whatsapp}</li>}

                {shop && shop.socialMedia.youtube && <li><FontAwesomeIcon icon={faYoutube}/>{shop.socialMedia.youtube}</li>}

                {shop && shop.socialMedia.twitter && <li><FontAwesomeIcon icon={faTwitter}/>{shop.socialMedia.twitter}</li>}

                {shop && shop.socialMedia.tiktok && <li><FontAwesomeIcon icon={faTiktok}/>{shop.socialMedia.tiktok}</li>} */}
            </ul>

            {/* <h4>Stats</h4> */}
        </div>
    );
}

export default DuviPresentation;
