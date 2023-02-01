import React, {useState, useEffect} from 'react'
import styles from './PostsContainer.module.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreatePostModal from './CreatePostModal';
import PostCard from './PostCard';

export default function PostsContainer({posts, owner}) {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <section className={styles.container}>
      <h3>Publicaciones</h3>

      {isModalActive && <CreatePostModal setIsModalActive={setIsModalActive}/>}

      <ol>
        { posts && posts.map(el => (
          <PostCard post={el} key={el._id}/>
        ))}
      </ol>
      {owner && <FontAwesomeIcon className={styles.add_icon} icon={faPlus} onClick={() => setIsModalActive(true)}/> }
    </section>
  )
}
