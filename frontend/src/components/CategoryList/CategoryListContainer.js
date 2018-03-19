import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '../Container'
import LoadingIndicator from '../LoadingIndicator'
import PostList from '../PostList/PostList'

class CategoryListContainer extends Component {

  renderPostsOrLoadingIndicator() {
    if(this.props.isFetching) {
      return <LoadingIndicator />
    }
    if(this.props.posts.length > 0) {
      return <PostList posts={this.props.posts} {...this.props}/>
    } else {
      return(
        <Container>
          <div className="content">
            No posts were found!<br />
            <Link to="/">Back home</Link>
          </div>
        </Container>
      )
    }
  }

  render() {
    return(
        this.renderPostsOrLoadingIndicator()
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts.items.filter((post) => post.category === ownProps.match.params.category),
    isFetching: state.posts.isFetching,
    allPosts: state.posts.items,
  }
}

export default connect(mapStateToProps)(CategoryListContainer)