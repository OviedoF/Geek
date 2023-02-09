import React, { useState, useEffect, useRef } from "react";
import styles from "./ShopPresentation.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import env from '../../../env';

const FollowButton = ({ shopId }) => {
  const [isAlreadyFollow, setIsAlreadyFollow] = useState(false);
  const auth = useSelector((state) => state.auth);
  const button = useRef();

  useEffect(() => {
    auth && setIsAlreadyFollow(auth.follows.includes(shopId));
  }, [auth, shopId]);

  const handleFollow = () => {
    axios.put(`${env.API_URL}/user/${auth._id}/follows`, {
        shopId,
      })
      .then((res) => {
        button.current.style.animation = 'followButtonAppear .6s ease';
        console.log(res.data);
        setIsAlreadyFollow(res.data.includes(shopId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      className={styles.follow}
      state={isAlreadyFollow ? "unfollow" : "follow"}
      onClick={(e) => handleFollow(e)}
      ref={button}
    >
      {isAlreadyFollow ? "Dejar de seguir" : "Seguir tienda"}
    </button>
  );
};

export default FollowButton;
