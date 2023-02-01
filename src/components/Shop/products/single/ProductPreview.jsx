import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import styles from './ProductPreview.module.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import CommentsContainer from '../../../puntation/CommentsContainer';
import { useSelector } from 'react-redux';

export default function ProductPreview({product}) {
  const auth = useSelector(state => state.auth);

  return (
    <div className={styles.preview}>
      <h3>Preview</h3>

      <div className={styles.details}>
        <div className={styles.slider}>
          <AwesomeSlider
            animation='scaleOutAnimation'
            className={styles.aws_btn}
            cssModule={[AwesomeSliderStyles]}
          >
              {product.galeryImages.map(el => (
                <div data-src={el} key={el}></div>
              ))}
          </AwesomeSlider>
        </div>

        <p style={{marginTop: '200px'}}>{product.description}</p>
      </div>

      <h3 style={{marginTop: '50px'}}>Comentarios</h3>

      <CommentsContainer />
    </div>
  );
}
