import React, { Component } from 'react';
import { connect } from 'react-redux';
import {togglePostForm} from '../actions'
import { Link } from 'react-router-dom'
import PostForm from './PostForm'

class Post extends Component {  

  render() {
    const id = this.props.post.id
    const postEditForm = this.props.postEditForm

    // console.log('Post.js this.props.post.id', id);
    console.log('Post.js this.props', this.props);
    // console.log('Post.js this.state', this.state);
    return(
      <div>
        <h1><Link to={`/post/${this.props.post.id}`}>{this.props.post.title}</Link></h1>
        <p>{this.props.post.body}</p>
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <p>{this.props.post.voteScore}</p>
        {console.log('Post.js this.props.post.id', id)}
        <button onClick={() => {this.props.toggleAddPostClick(id)}}>Add Post</button>
        <button onClick={() => {this.props.toggleEditPostClick(id)}}>Edit Post</button>




        {/* <button onClick={this.props.dispatch(deletePost(this.props.post.id))}>Delete Post</button> */}


        {console.log("postEditForm.open", postEditForm.open)}
        {(postEditForm.open !== false && postEditForm.id === id)  ? 
          <PostForm 
            mode={postEditForm.mode} 
            post={postEditForm.mode === 'edit' ? this.props.post : undefined} 
          />
        : 
        null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    postEditForm: state.postEditForm
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  toggleAddPostClick(id) {
    dispatch(togglePostForm(id, "add"))
  },
  toggleEditPostClick(id) {
    dispatch(togglePostForm(id, "edit"))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);