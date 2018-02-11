import React from 'react';
import VoteWidget from '../VoteWidget'

const Comment = (props) => {
  return(
    <div className="comment">
      <p>{props.comment.author}</p>
      <p>{props.comment.body}</p>
      <VoteWidget id={props.comment.id} type="comments" voteScore={props.comment.voteScore}/>
    </div>
  )
}

export default Comment;