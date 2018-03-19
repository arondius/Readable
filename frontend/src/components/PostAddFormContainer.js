import React from 'react'
import PostAddForm from './PostAddForm'
import {savePost} from '../actions/postActions'
import uuid from '../utils'
import {connect} from 'react-redux'

const PostAddFormContainer = ({postTitle, postBody, postAuthor, postCategory, dispatch, categories}) => {
  const submit = ({postTitle, postBody, postAuthor, postCategory}) => {
    const time = new Date()
    const postValues = {
      timestamp: time.getTime(),
      id: uuid(),
      title: postTitle,
      body: postBody,
      author: postAuthor,
      category: postCategory,
    }
    dispatch(savePost(postValues))
  }
  
  return (
    <PostAddForm
      form="addPostForm"
      onSubmit={submit}
      categories={categories}
    />
  )
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items
  }
}

export default connect(mapStateToProps)(PostAddFormContainer);