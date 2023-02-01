import React, { useState, useEffect, useRef } from "react";
import styles from "./DuviPresentation.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const FollowButton = ({ duviId }) => {
  const [isAlreadyFollow, setIsAlreadyFollow] = useState(false);
  const auth = useSelector((state) => state.auth);
  const button = useRef();

  useEffect(() => {
    auth && setIsAlreadyFollow(auth.follows.includes(duviId));
  }, [auth, duviId]);

  const handleFollow = () => {
    axios.put(`${process.env.REACT_APP_ROOT_API}/api/user/${auth._id}/follows`, {
        duviId,
      })
      .then((res) => {
        button.current.style.animation = 'followButtonAppear .6s ease';
        console.log(res.data);
        setIsAlreadyFollow(res.data.includes(duviId));
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
