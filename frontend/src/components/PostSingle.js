import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CommentListContainer from './CommentList/CommentListContainer'
import LoadingIndicator from './LoadingIndicator'
import Post from './PostList/Post';
import Sidebar from './Sidebar.js'
import Container from './Container'

class PostSingle extends Component {
  renderPostsOrLoadingIndicator() {
    if(this.props.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.post) {
      return(
        <Post post={this.props.post} />
      )
    }
  }
  
  render() {
    return(
      <Container>
        <div className="content">
          <h3>
            <Link to="/">
              <i className="fas fa-arrow-circle-left heading-icon heading-icon--left"></i>
              Back to the list of Posts
            </Link>
          </h3>
          {this.renderPostsOrLoadingIndicator()}
          <h2>Comments</h2>
          <CommentListContainer 
            id={this.props.match.params.id}
            CommentList={this.props.CommentList}
          />
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state, ownProps);
  return {
    post: state.posts.items.filter((post) => (post.id === ownProps.match.params.id))[0],
    isFetching: state.posts.isFetching,
    CommentList: state.comments.items.filter((comment) => (comment.parentId === ownProps.match.params.id))
  }
}

export default connect(mapStateToProps)(PostSingle);