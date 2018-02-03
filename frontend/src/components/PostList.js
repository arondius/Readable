import React, { Component } from 'react';
import PostPreview from './PostPreview';
// import { fetchPosts } from '../actions'
import { connect } from 'react-redux';
import LoadingIndicator from './LoadingIndicator'

class PostList extends Component {
  renderPostsOrLoadingIndicator() {
    if(this.props.postList.isFetching) {
        return <LoadingIndicator />
    }
    if(this.props.postList.items.length > 0) {
      return(
        <ul className="postlist">
          {this.props.postList.items.map(post => <li key={post.id}><PostPreview post={post} /></li>)}
        </ul>
      )
    }
  }

  render() {
    return(
      <div className="container">
        {this.renderPostsOrLoadingIndicator()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    postList: state.posts,
  }
}

export default connect(mapStateToProps)(PostList)