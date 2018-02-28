import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, getPostsInCategory } from '../../actions'

import Sidebar from '../Sidebar'
import LoadingIndicator from '../LoadingIndicator'
import PostList from '../PostList/PostList'

class CategoryListContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getPostsInCategory(this.props.posts.items));
  }

  renderPostsOrLoadingIndicator() {
    if(this.props.isFetching) {
      return <LoadingIndicator />
    }
    if(this.props.posts.length > 0) {
      return <PostList posts={this.props.posts}/>
    } else {
      return(
        <div className="container">
          <div className="content">
            No posts were found!<br />
              <Link to="/">Back home</Link>
            </div>
        </div>
      )
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
  console.log(state);
  return {
    posts: state.posts.items.filter((post) => post.category === ownProps.match.params.category),
    isFetching: state.posts.isFetching,
    allPosts: state.posts.items,
  }
}

export default connect(mapStateToProps)(CategoryListContainer)