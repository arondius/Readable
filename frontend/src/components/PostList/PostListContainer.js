import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostList from './PostList'
import LoadingIndicator from '../LoadingIndicator'


class PostListContainer extends Component {

  render() {
    return(
      <div>
        {this.props.isFetching ? 
          <LoadingIndicator /> : 
          <PostList posts={this.props.posts}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.items,
    isFetching: state.posts.isFetching
  }
}

export default connect(mapStateToProps)(PostListContainer)