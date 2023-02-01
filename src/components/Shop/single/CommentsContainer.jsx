import React, { useState, useEffect } from 'react';
import CommentCard from "../../puntation/CommentCard";
import CreateComment from "../../puntation/CreateComment";
import axios from 'axios';
import CommentStadistics from '../../puntation/CommentStadistics';

export default function CommentsContainer({theUserIsClient, userId, duviId}) {
  const [theUserIsAlreadyComment, setTheUserIsAlreadyComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = () => {
    axios.get(`${process.env.REACT_APP_ROOT_API}/api/comments/${duviId}`)
      .then(res => setComments(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if(duviId) {
      axios.get(`${process.env.REACT_APP_ROOT_API}/api/comments/${duviId}`)
        .then(res => setComments(res.data))
        .catch(err => console.log(err));
    }
  }, [duviId]);

  useEffect(() => {
    comments.forEach(el => el.author._id === userId && setTheUserIsAlreadyComment(true));
  }, [theUserIsAlreadyComment, comments, userId]);

  return (
    <div style={{backgroundColor: 'var(--card-bg)', padding: '40px', borderRadius: 'var(--border-radius)'}}>
    {theUserIsClient && !theUserIsAlreadyComment && <CreateComment handleChange={handleChange} createdIn={'duvi'}/>}

    {error && <p>{error}</p>}

    {comments.length > 0 && <CommentStadistics comments={comments} />}

    {comments.map((comment, index) => (
      <CommentCard
        userImage={comment.author.userImage}
        key={comment.id}
        author={comment.name}
        text={comment.comment}
        stars={comment.stars}
        noBorder={index === comment.length - 1}
      />
    ))}
    </div>
  );
}
