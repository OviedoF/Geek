import React from "react";
import styles from "./HistorialCard.module.scss";
import { faCheck, faComment, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import LocalShippingModal from "../sells-on-local/LocalShippingModal";

const HistorialCard = ({ images, name, state, isSeller, invoice, shipping}) => {
  const [AuthorizeModal, setAuthorizeModal] = useState(false);

  const grid_template = {
    display: "grid",
    gridTemplateColumns: isSeller ? "repeat(6, 1fr)" : "repeat(5, 1fr)",
    justifyItems: "center"
  }

  return (
    <div className={styles.card} style={grid_template}>
      {AuthorizeModal && shipping === 'local' && <LocalShippingModal />}

      <div className={styles.images_slider}>
        <div className={styles.images_carrousel}>
          {images.map((image, index) => <img src={image} alt="imagen de producto" key={image}/>)}
        </div>
      </div>

      <h2>{name}</h2>
      <p>{state}</p>
      <Link to={'/invoid/' + invoice}><FontAwesomeIcon icon={faDownload} /></Link>

      {isSeller && <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faCheck} onClick={() => setAuthorizeModal(!AuthorizeModal)} />}

      <div className={styles.icons}>
        <FontAwesomeIcon icon={faComment} />
      </div>
    </div>
  );
};

export default HistorialCard;
