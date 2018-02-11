import React from 'react';
import Comment from './Comment';

const CommentList = props => (
  <ul>
    {props.comments.map(comment => 
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    )}
  </ul>
)

export default CommentList;