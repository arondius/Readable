import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {togglePostForm, deletePost} from '../../actions/postActions'
import PostEditFormContainer from '../PostEditFormContainer'
import VoteWidget from '../VoteWidget'

class PostPreview extends Component {  

  render() {
    
    const {id} = this.props.post
    const postDate = new Date(this.props.post.timestamp)
    const postLink = `/${this.props.post.category}/${this.props.post.id}`
    const postValues = {
      postTitle: this.props.post.title,
      postBody: this.props.post.body,
      id: this.props.post.id
    }
    return(
      <div>
        <h1>
          <Link 
            className="title-link"
            to={postLink}>{this.props.post.title}
          </Link>
        </h1>
        <p>Author: {this.props.post.author}</p>
        <p>Category: {this.props.post.category}</p>
        <p>Posted on: {postDate.toDateString()}</p>
        <p># of Comments: {this.props.post.commentCount}</p>
        <VoteWidget id={this.props.post.id} type="posts" voteScore={this.props.post.voteScore} />
        <Link className="btn btn--primary" to={postLink}>View Post</Link>
        <button className="btn" onClick={() => this.props.toggleEditPostClick(id)}>Edit post</button>
        <button className="btn btn__" onClick={() => this.props.dispatch(deletePost(this.props.post.id))}>Delete post</button>
        {(this.props.postEditForm.open !== false && this.props.postEditForm.id === id)  ? 
          <PostEditFormContainer
            post={this.props.post}
            id={id}
            initialValues={postValues}
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
  toggleEditPostClick(id) {
    dispatch(togglePostForm(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);