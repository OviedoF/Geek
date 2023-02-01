import React, { useState, useEffect } from 'react';
import Stars from './Stars';
import CommentStadisticBar from './CommentStadisticBar';
import styles from "./CommentsContainer.module.scss";

const CommentStadistics = ({comments}) => {
  const arrayToRenderStadistics = [5, 4, 3, 2, 1];
  const [numberCount, setNumberCount] = useState({1: 0, 2: 0, 3: 0, 4: 0, 5:0});
  const [promedyStars, setPromedyStars] = useState(0);
  const totalComments = comments.length;

  useEffect(() => {
    let stars = 0;
    let count = {1: 0, 2: 0, 3: 0, 4: 0, 5:0};

    comments.forEach((el) => {
      stars += el.stars;

      count = {
        ...count, 
        [el.stars]: count[el.stars] + 1
      };

    });

    setNumberCount(count);
    setPromedyStars(stars / totalComments);
  }, [totalComments]);

  return (
    <div className={styles.puntuation}>
      <div className={styles.promedy}>
        {promedyStars}
        <Stars
          personalizedStyles={{ textAlign: "center" }}
          quantity={promedyStars}
          numberSpan={totalComments}
          renderSpan
        />
      </div>

      <div className={styles.bars}>
        {arrayToRenderStadistics.map((number) => (
          <div className={styles.bar} key={number}>
            <CommentStadisticBar percent={(numberCount[number]/totalComments) * 100} />

            <div className={styles.stars_container}>
              <Stars quantity={number} numberSpan={numberCount[number]} renderSpan/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentStadistics;
