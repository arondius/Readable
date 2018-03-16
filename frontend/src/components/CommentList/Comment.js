import React from 'react';
import VoteWidget from '../VoteWidget'

const Comment = (props) => {
  const comment = props.comment;
  const id = comment.id;
  return(
    <div className="comment">
      <VoteWidget id={props.comment.id} type="comments" voteScore={props.comment.voteScore}/>
      <p>{comment.author}</p>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment;