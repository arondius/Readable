import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions'
import PostList from './PostList'
import LoadingIndicator from './LoadingIndicator'

class CommentListContainer extends Component {

  componentDidMount() {
    return this.props.dispatch(fetchPosts());
  }

  renderPostsOrLoadingIndicator() {
    if(this.props.postList.isFetching) {
      return <LoadingIndicator />
    }
    if(this.props.postList.length > 0) {
      return <PostList postList={this.props.postList}/>
    }
  }

  render() {
    return(
      <div>
        {this.renderPostsOrLoadingIndicator()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  function filterPosts() {
    if(state.posts.items.length > 0) {
      return state.posts.items.filter(post => post.category === ownProps.match.params.category)
    }
    return state.posts;
  }
  return {
    postList: filterPosts(),
  }
}

export default connect(mapStateToProps)(CommentListContainer)