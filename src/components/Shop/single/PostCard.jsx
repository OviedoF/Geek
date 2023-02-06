import React, { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import styles from "./PostCard.module.scss";
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

export default function PostCard({ post }) {
  return (
    <li key={post._id} className={styles.post_card}>
      <p>{post.content}</p>

      <div className={styles.post_slider}>
        <AwesomeSlider
          animation="scaleOutAnimation"
          className={styles.aws_btn}
          cssModule={[AwesomeSliderStyles]}
          bullets={false}
        >
          {post.images.length > 0 &&
            post.images.map((image) => (
              <div data-src={image} key={image}></div>
            ))}
        </AwesomeSlider>
      </div>
    </li>
  );
}
