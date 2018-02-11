import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions'

import PostList from './PostList'
import LoadingIndicator from '../LoadingIndicator'

class PostListContainer extends Component {

  componentDidMount() {
    return this.props.dispatch(fetchPosts());
  }

  renderPostsOrLoadingIndicator() {
    if(this.props.postList.isFetching) {
      return <LoadingIndicator />
    }
    if(this.props.postList.items.length > 0) {
      return <PostList postList={this.props.postList.items}/>
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

function mapStateToProps(state) {
  return {
    postList: state.posts,
  }
}

export default connect(mapStateToProps)(PostListContainer)