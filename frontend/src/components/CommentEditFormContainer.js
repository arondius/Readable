import React, { Component } from 'react'
import CommentEditForm from './CommentEditForm'
import {updateComment} from '../actions/commentActions'
import {connect} from 'react-redux'

class CommentEditFormContainer extends Component {
  submit = values => {
    const id = values.id;
    const body = values.postBody;
    this.props.dispatch(updateComment(id, body));
  }
  
  render() {
    return (
      <CommentEditForm
        form="addCommentForm"
        onSubmit={this.submit}
        initialValues={this.props.initialValues}
      />
    )
  }
}

export default connect()(CommentEditFormContainer);