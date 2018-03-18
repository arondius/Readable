import React, { Component } from 'react'
import PostEditForm from './PostEditForm'
import {updatePost} from '../actions/postActions'
import {connect} from 'react-redux'

class PostEditFormContainer extends Component {
  submit = ({id, postTitle, postBody}) => {
    this.props.dispatch(updatePost(id, postTitle, postBody));
  }
  
  render() {
    return (
      <PostEditForm
        form="editPostForm"
        onSubmit={this.submit}
        initialValues={this.props.initialValues}
      />
    )
  }
}

export default connect(null, null)(PostEditFormContainer);