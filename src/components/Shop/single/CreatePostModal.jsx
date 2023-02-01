import styles from './CreatePostModal.module.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreatePostModal({setIsModalActive}) {
    const [images, setImages] = useState([]);
    const textarea = useRef();
    const container = useRef();
    const {duvi} = useSelector(state => state.auth);

    const handleClick = (e) => {
        if(e.target === container.current) setIsModalActive(false);
    } 

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', textarea.current.value);

      for (const image of images) {
        formData.append('images', image);
      };

      axios.post(`${process.env.REACT_APP_ROOT_API}/api/post/${duvi}`, formData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

  return (
    <div className={styles.post_modal} onMouseUp={(e) => handleClick(e)} ref={container}>

        <form className={styles.create_post} onSubmit={(e) => handleSubmit(e)}>
            <textarea name="content" id="content" cols="30" rows="10" placeholder='¿Qué quieres compartir?' ref={textarea}/> 
            <label htmlFor="images"> <FontAwesomeIcon className={styles.add_icon} icon={faPlus} /> Agregar imágenes</label>
            <input type="file" name="images" id="images" onChange={(e) => setImages(e.target.files)} multiple/>

            {images.length > 0 && <p>{`${images.length}`} archivos seleccionados.</p>}

            <input type="submit" value="Publicar" />
        </form>

    </div>
  )
}
