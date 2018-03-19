import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { togglePostForm, deletePost } from '../../actions/postActions'
import PostEditFormContainer from '../PostEditFormContainer'
import VoteWidget from '../VoteWidget'

class Post extends Component {

  handleDeleteClick() {
    this.props.dispatch(deletePost(this.props.post.id))
    this.props.history.push('/')
  }

  render() {
    const {id} = this.props.post
    const postDate = new Date(this.props.post.timestamp);
    const postValues = {
      postTitle: this.props.post.title,
      postBody: this.props.post.body,
      id: this.props.post.id
    }

    return(
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.body}</p>
        <p>Author: {this.props.post.author}</p>
        <p>Category: {this.props.post.category}</p>
        <p>Posted on: {postDate.toDateString()}</p>
        <p># of Comments: {this.props.post.commentCount}</p>

        <VoteWidget
          id={this.props.post.id}
          type="posts"
          voteScore={this.props.post.voteScore}
        />

        <button className="btn" onClick={() => this.props.toggleEditPostClick(id)}>Edit post</button>
        <button className="btn" onClick={() => this.handleDeleteClick()}>Delete post</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));