import React from 'react';
import { connect } from 'react-redux';

import {togglePostForm} from '../../actions/postActions'
import {deleteComment} from '../../actions/commentActions'

import VoteWidget from '../VoteWidget'
import CommentEditFormContainer from '../CommentEditFormContainer'

const Comment = (props) => {
  const comment = props.comment;
  const id = comment.id;
  return(
    <div className="comment">
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <VoteWidget id={id} type="comments" voteScore={comment.voteScore}/>
      <button className="btn" onClick={() => props.toggleEditPostClick(id)}>Edit comment</button>
      <button className="btn" onClick={() => props.dispatch(deleteComment(id))}>Delete comment</button>
      {(props.postEditForm.open !== false && props.postEditForm.id === id)  ? 
        <CommentEditFormContainer
          post={comment}
          id={id}
          initialValues={{
              postTitle: comment.title,
              postBody: comment.body,
              id: id
          }}
        />
      : 
      null}
    </div>
  )
}

const mapStateToProps = (state) => ({
    postEditForm: state.postEditForm
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  toggleEditPostClick(id) {
    dispatch(togglePostForm(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment);