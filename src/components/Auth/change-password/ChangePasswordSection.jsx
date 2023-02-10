import React, { useState, useEffect } from "react";
import styles from "./ChangePasswordSection.module.scss";
import axios from "axios";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import { HashLoader } from "react-spinners";

export default function ChangePasswordSection({
  img,
  text,
  subtext,
  numberStatus,
  setStatus,
  userImage,
  setUserImage,
  setEmail,
  email,
  setUserId,
  userId
}) {
  const [postStatus, setPostStatus] = useState({status: 'idle'});

  return (
    <div className={styles.container}>
      <img src={img || userImage} alt={text} style={numberStatus === 0 ? {objectFit: 'contain', borderRadius: 0} : {}} />

      <h3>{text}</h3>
      {subtext && <p>{subtext}</p>}

      <form action="">
        {numberStatus === 0 && (
          <FirstSection
            postStatus={postStatus}
            setPostStatus={setPostStatus}
            email={email}
            setUserImage={setUserImage}
            setStatus={setStatus}
            textInput="Enviar recuperación"
            setEmail={setEmail}
            setUserId={setUserId}
          />
        )}

        {numberStatus === 1 && (
          <SecondSection
            textInput="Ingresar código"
            setStatus={setStatus}
            email={email}
          />
        )}

        {numberStatus === 2 && <ThirdSection textInput={'Cambiar contraseña'} setStatus={setStatus} userId={userId}/> }
      </form>
    </div>
  );
}
