import React from 'react'
import CommentEditForm from './CommentEditForm'
import {updateComment} from '../actions/commentActions'
import {connect} from 'react-redux'

const CommentEditFormContainer = ({id, postBody, dispatch, initialValues}) => {
  const submit = ({id, postBody}) => {
    dispatch(updateComment(id, postBody));
  }
  
  return (
    <CommentEditForm
      form="addCommentForm"
      onSubmit={submit}
      initialValues={initialValues}
    />
  )
}

export default connect()(CommentEditFormContainer);