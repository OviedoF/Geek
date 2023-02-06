import React from "react";
import styles from "../shipping-remote/HistorialCard.module.scss";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import LocalShippingModal from "./LocalShippingModal";
import FinishModal from "./FinishModal";

const LocalSellCard = ({ buy, isSeller, stateSelected, setFilteredByState, perfil}) => {
  const [AuthorizeModal, setAuthorizeModal] = useState(false);
  const [finishModal, setFinishModal] = useState(false);

  const grid_template = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    justifyItems: "center"
  }

  return (
    <div className={styles.card} style={grid_template}>
      {AuthorizeModal && buy.state === "En proceso" && <LocalShippingModal setAuthorizeModal={setAuthorizeModal} buy={buy}/>}
      {finishModal && buy.state === "Confirmada" && <FinishModal perfil={perfil} setFinishModal={setFinishModal} purchase={buy} stateSelected={stateSelected} setFilteredByState={setFilteredByState}/>}

      <div className={styles.images_slider}>
        <div className={styles.images_carrousel}>
          {buy.images.map((image, index) => <img src={image} alt="imagen de producto" key={image}/>)}
        </div>
      </div>

      <h2>Compra en local</h2>
      <p>{buy.state}</p>
      <Link to={'/invoid/' + buy.invoice}><FontAwesomeIcon icon={faEye} /></Link>

      {isSeller && <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faCheck} 
      onClick={() => buy.state === "En proceso" 
      ? setAuthorizeModal(!AuthorizeModal) 
      : buy.state === "Confirmada" && setFinishModal(!finishModal)}/>}

    </div>
  );
};

export default LocalSellCard;
