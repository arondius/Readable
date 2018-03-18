import React, { Component } from 'react'
import CommentAddForm from './CommentAddForm'
import {saveComment} from '../actions'
import {connect} from 'react-redux'
import guid from '../utils'

const CommentAddFormContainer = ({parentId, dispatch, values}) => {
  const time = new Date()
  const submit = values => {
    const comment = {
      timestamp: time.getTime(),
      id: guid(),
      body: values.commentBody,
      author: values.commentAuthor,
      parentId
    }
    dispatch(saveComment(comment))
  }

  return (
    <CommentAddForm
      form="addPostForm"
      onSubmit={submit}
      post={parentId}
    />
  )
}

export default connect(null, null)(CommentAddFormContainer);