import React, { Component } from 'react';
import uuidGen from 'uuid';
import { connect } from 'react-redux';
import { addPost, deletePost, updatePost } from '../actions'

class Post extends Component {
  onAddPost() {
    const uuid = uuidGen();
    this.props.dispatch(addPost(uuid, `TITEL-${uuid}`, `BODY-${uuid}`));
  }
  
  onDeletePost() {
    this.props.dispatch(deletePost('4dd15ac9-0468-4d21-a8be-9adaf6d77c6a'));
  }
  
  onUpdatePost() {
    this.props.dispatch(updatePost());
  }
  
  render() {
    return(
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <p>{this.props.post.voteScore}</p>
        <button onClick={() => this.onEditPost()} />
        <button onClick={() => this.onUpdatePost()}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(Post);