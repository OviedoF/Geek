import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./CreateComment.module.scss";
import Stars from "./Stars";
import axios from "axios";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CreateComment = ({createdIn, handleChange}) => {

  const auth = useSelector(state => state.auth);
  const [starsActive, setStarsActive] = useState(5);
  const puntuations = [1, 2, 3, 4, 5];
  const textarea = useRef(); 
  const {id} = useParams();

  const handleSubmit = (e )=> {
    e.preventDefault();
    const formData = new FormData();

    formData.append('author', auth._id);
    formData.append('comment', textarea.current.value);
    formData.append('stars', starsActive);
    formData.append('commentedIn', id);

    axios.post(`${process.env.REACT_APP_ROOT_API}/api/comments/create/${createdIn}`, formData)
        .then(res => handleChange())
        .catch(err => console.log(err));
  }

  return (
    <form className={styles.write_comment} onSubmit={(e) => handleSubmit(e)}>
      Hemos visto que compraste este producto, ¿te gustaría dejar una
      calificación?
      <textarea name="comment" id="comment_create" ref={textarea} placeholder={`Tu impresión del producto`}></textarea>

      <div className={styles.calification}>
        {puntuations.map((el) => (
          <FontAwesomeIcon
            key={el}
            icon={faStar}
            className={
              starsActive >= el ? styles.star_active : styles.star_nothover
            }
            onMouseOver={(e) => setStarsActive(el)}
          />
        ))}

        <input type="submit" value="Enviar comentario!" />
      </div>

    </form>
  );
};

export default CreateComment;
