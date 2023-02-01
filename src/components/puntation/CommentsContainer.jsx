import React, { useState, useEffect } from "react";
import styles from "./CommentsContainer.module.scss";
import Stars from "./Stars";
import CommentStadisticBar from "./CommentStadisticBar";
import CommentCard from "./CommentCard";
import CreateComment from "./CreateComment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentStadistics from "./CommentStadistics";

const CommentsContainer = ({ hasBorder }) => {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const [isBuyed, setIsBuyed] = useState(false);
  const [commentsToRender, setCommentsToRender] = useState([]);
  const [isAlreadyCommentedByUser, setIsAlreadyCommentedByUser] = useState(false);

  useEffect(() => {
    auth.shoppingHistory.forEach((buy) => {
      buy.products.forEach((product) => {
        if (product.idProduct === id) setIsBuyed(true);
        console.log(product);
      });
    });
  }, [auth, id]);

  useEffect(() => {
    commentsToRender.forEach(comment => {
      if (comment.author._id === auth._id) setIsAlreadyCommentedByUser(true);  
    });
  }, [commentsToRender]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ROOT_API}/api/comments/${id}`)
      .then((res) => {
        setCommentsToRender(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUserComment = () => {
    axios.get(`${process.env.REACT_APP_ROOT_API}/api/comments/${id}`)
      .then((res) => {
        setCommentsToRender(res.data);
        setIsAlreadyCommentedByUser(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  return (
    <div className={`${styles.container} ${hasBorder && styles.hasBorder}`}>
      {commentsToRender.length > 0 && (
        <CommentStadistics comments={commentsToRender} />
      )}

      {isBuyed && !isAlreadyCommentedByUser && (
        <CreateComment handleChange={handleUserComment} createdIn={"product"} />
      )}

      <div className={styles.comments}>
        {commentsToRender.length === 0 && (
          <>
            <h2 style={{ textAlign: "center", fontSize: "20px" }}>
              No hay comentarios actualmente :(
            </h2>
            
            <p style={{textAlign: 'center', margin: '5px 0'}}>Sé tú el primero ;)</p>
            <p style={{textAlign: 'center', margin: '5px 0'}}>(la opción se activará al comprar el producto)</p>
          </>
        )}

        {commentsToRender.map((el, index) => (
          <CommentCard
            userImage={el.author.userImage}
            name={el.author.name}
            text={el.comment}
            stars={el.stars}
            noBorder={index === commentsToRender.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
