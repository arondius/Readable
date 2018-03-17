import React, { Component } from 'react'
import PostEditForm from './PostEditForm'
import {updatePost} from '../actions'
import {connect} from 'react-redux'

class PostEditFormContainer extends Component {
  submit = values => {
    const id = values.id;
    const title = values.postTitle;
    const body = values.postBody;
    this.props.dispatch(updatePost(id, title, body));
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