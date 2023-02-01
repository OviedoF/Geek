import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './CommentCard.module.scss';
import Stars from './Stars';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

const CommentCard = ({userImage, name, stars, text, noBorder, personalizedStyles}) => {
    return (
        <div className={`${styles.comment} ${!noBorder && styles.border_bottom}`} styles={personalizedStyles ? personalizedStyles : {}} >
            <img src={userImage} alt="imagen usuario" />

            <div className={styles.details}>
                <span>{name}</span>

                <Stars quantity={stars} personalizedStyles={{padding: '0'}}/>

                <p>{text}</p>

                <div className={styles.likes_dislikes}>
                    <FontAwesomeIcon icon={faHeart} />
                    <FontAwesomeIcon icon={faHeartBroken} />
                </div>
            </div>
        </div>
    );
}

export default CommentCard;
