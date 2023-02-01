import React from 'react';
import styles from './CommentStadisticBar.module.scss';

const CommentStadisticBar = ({percent}) => {
    return (
        <div className={styles.container}>
            <div className={styles.total_bar} />
            <div className={styles.percent_bar} style={{width: `${percent}%`}} />
        </div>
    );
}

export default CommentStadisticBar;
