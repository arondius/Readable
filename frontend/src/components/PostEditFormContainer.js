import React, { Component } from 'react'
import PostEditForm from './PostEditForm'
import {updatePost} from '../actions/postActions'
import {connect} from 'react-redux'

const PostEditFormContainer = ({id, postTitle, postBody, dispatch, initialValues}) => {
  const submit = ({id, postTitle, postBody}) => {
    dispatch(updatePost(id, postTitle, postBody));  
  }
  return (
    <PostEditForm
      form="editPostForm"
      onSubmit={submit}
      initialValues={initialValues}
    />
  )
}

export default connect(null, null)(PostEditFormContainer);