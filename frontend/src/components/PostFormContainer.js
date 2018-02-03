import React, { Component } from 'react'
import PostForm from './PostForm'
import {savePost} from '../actions'
import uuidGen from 'uuid'
import {connect} from 'react-redux'

class PostFormContainer extends Component {
  submit = values => {
    if(this.props.mode === 'edit') {
      // this.props.dispatch()
    }
    if(this.props.mode === 'add') {
      console.log('values', values);
      const id = uuidGen();
      const time = new Date();
      const timestamp = time.getTime();
      const title = values.postTitle;
      const body = values.postBody;
      const author = values.postAuthor;
      const category = values.postCategory;

      this.props.dispatch(savePost(id, title, body, author, category, timestamp))
    }
  }
  render() {
    return <PostForm mode={this.props.mode} form={this.props.id} onSubmit={this.submit} />
  }
}

export default connect(null, null)(PostFormContainer);