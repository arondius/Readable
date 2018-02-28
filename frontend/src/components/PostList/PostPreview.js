import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import VoteWidget from '../VoteWidget'

class PostPreview extends Component {  

  render() {
    return(
      <div>
        <h1>
          <Link 
            className="title-link"
            to={`/post/${this.props.post.id}`}>{this.props.post.title}
          </Link>
        </h1>
        <p>Author: {this.props.post.author}</p>
        <p>Category: {this.props.post.category}</p>
        <VoteWidget id={this.props.post.id} type="posts" voteScore={this.props.post.voteScore} />
        <Link className="btn btn--primary" to={`/post/${this.props.post.id}`}>View Post</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    postEditForm: state.postEditForm
})

export default connect(mapStateToProps)(PostPreview);