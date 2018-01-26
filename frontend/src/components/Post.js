import React, { Component } from 'react';
import uuidGen from 'uuid';
import { connect } from 'react-redux';
import { addPost, deletePost, updatePost } from '../actions'
import { Link } from 'react-router-dom'
import PostForm from './PostForm'

class Post extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      postForm: {
        isOpen: false,
        postEditing: null
      }
    };
  }
  
  handleDeletePost() {
    this.props.dispatch(deletePost(this.props.post.id));
  }
  
  handleEditPost(post = null, e) {
    e.preventDefault();
    // the form is open
    if(this.state.postForm.isOpen) {
      // are we editing a post?
      if(this.state.postForm.postEditing) { 
        this.setState((state) => (
          {
            ...state,
              postForm: {
                ...state.postForm,
                  postEditing: null
              }
          }
        ));
      }
      // close form
      this.setState((state) => (
        {
          ...state,
            postForm: {
              ...state.postForm,
                isOpen: false
            }
        }
      ));
    }
    // the form is closed 
    else { 
      // did we receive a post (I.E. do we edit an exisitng post?)
      if(post) {
        console.log('post',post)
        this.setState((state) => (
          {
            ...state,
            postForm: {
              ...state.postForm,
                postEditing: post
            }
          }
        ));
      }
      // open form
      this.setState(state => (
        {
          ...state,
            postForm: {
              ...state.postForm,
                isOpen: true
          }
        }
      ));
    }
  }

  render() {
    // console.log('Post.js this.props', this.props);
    console.log('Post.js this.state', this.state);
    return(
      <div>
        <h1><Link to={`/post/${this.props.post.id}`}>{this.props.post.title}</Link></h1>
        <p>{this.props.post.body}</p>
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <p>{this.props.post.voteScore}</p>
        <button onClick={(e) => this.handleEditPost(e)}>Add Post</button>
        <button onClick={(e) => this.handleEditPost(this.props.post, e)}>Edit Post</button>
        <button onClick={(e) => this.handleAddPost(e)}>Delete Post</button>
        {this.state.postForm.isOpen ? <PostForm /> : null}
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