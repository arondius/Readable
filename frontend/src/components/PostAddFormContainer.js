import React, { Component } from 'react'
import PostAddForm from './PostAddForm'
import PostEditForm from './PostEditForm'
import {savePost, updatePost} from '../actions'
import uuidGen from 'uuid'
import {connect} from 'react-redux'

class PostAddFormContainer extends Component {
  submit = values => {
    const time = new Date();
    const timestamp = time.getTime();
    const id = uuidGen();
    const title = values.postTitle;
    const body = values.postBody;
    const author = values.postAuthor;
    const category = values.postCategory;
    this.props.dispatch(savePost(id, title, body, author, category, timestamp))
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

export default connect(function mapStateToProps(state) {
  return {
    categories: state.categories.items
  }
})(PostAddFormContainer);