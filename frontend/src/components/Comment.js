import React from 'react';

const Comment = (props) => {
  return(
    <div className="comment">
      <p>{props.comment.author}</p>
      <p>{props.comment.body}</p>
    </div>
  )
}

export default Comment;