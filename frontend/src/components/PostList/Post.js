import React, { Component } from 'react';
import { connect } from 'react-redux';
import {togglePostForm} from '../../actions'
import PostEditFormContainer from '../PostEditFormContainer'
import VoteWidget from '../VoteWidget'

class Post extends Component {  

  render() {
    const {id, postEditForm} = this.props.post
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
        <p>{this.props.post.author}</p>
        <p>{this.props.post.category}</p>
        <p>Posted on: {postDate.toDateString()}</p>

        <VoteWidget 
          id={this.props.post.id}
          type="posts"
          voteScore={this.props.post.voteScore}
        />

        <PostEditFormContainer
          post={this.props.post}
          id={id}
          initialValues={postValues}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
})

export default connect(mapStateToProps)(Post);