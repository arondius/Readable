import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../../actions'

import Sidebar from '../Sidebar'
import PostList from './PostList'
import PostAddFormContainer from '../PostAddFormContainer.js'
import LoadingIndicator from '../LoadingIndicator'

class PostListContainer extends Component {

  renderPostsOrLoadingIndicator() {
    if(this.props.isFetching) {
      return <LoadingIndicator />
    } else {
      return <PostList posts={this.props.posts}/>
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
    posts: state.posts.items,
    isFetching: state.posts.isFetching
  }
}

export default connect(mapStateToProps)(PostListContainer)