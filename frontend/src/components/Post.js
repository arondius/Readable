import React, { Component } from 'react';
import uuidGen from 'uuid';
import { connect } from 'react-redux';
import { addPost, deletePost, updatePost } from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {
  onAddPost() {
    const uuid = uuidGen();
    this.props.dispatch(addPost(uuid, `TITEL-${uuid}`, `BODY-${uuid}`));
  }
  
  onDeletePost() {
    this.props.dispatch(deletePost('4dd15ac9-0468-4d21-a8be-9adaf6d77c6a'));
  }
  
  onUpdatePost(id) {
    this.props.dispatch(updatePost(id));
  }
  
  render() {
    return(
      <div>
        <h1><Link to={`/post/${this.props.post.id}`}>{this.props.post.title}</Link></h1>
        <p>{this.props.post.body}</p>
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <p>{this.props.post.voteScore}</p>
        <button onClick={() => this.onEditPost()} />
        <button onClick={() => this.onUpdatePost(this.props.post.id)}/>
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