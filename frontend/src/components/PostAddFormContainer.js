import React, { Component } from 'react'
import PostAddForm from './PostAddForm'
import {savePost} from '../actions'
import uuid from '../utils'
import {connect} from 'react-redux'

class PostAddFormContainer extends Component {
  submit = values => {
    const time = new Date()
    const postValues = {
      timestamp: time.getTime(),
      id: uuid(),
      title: values.postTitle,
      body: values.postBody,
      author: values.postAuthor,
      category: values.postCategory,
    }
    this.props.dispatch(savePost(postValues))
  }
  
  render() {
    return (
      <PostAddForm
        form="addPostForm"
        onSubmit={this.submit}
        categories={this.props.categories}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items
  }
}

export default connect(mapStateToProps)(PostAddFormContainer);