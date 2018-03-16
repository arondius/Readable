import React from 'react';
import Comment from './Comment';

const CommentList = props => (
  <div>
    <h2>Comments</h2>
    <ul>
      {props.comments.map(comment => 
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      )}
    </ul>
  </div>
)

export default CommentList;