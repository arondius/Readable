import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CommentListContainer from './CommentList/CommentListContainer'
import LoadingIndicator from './LoadingIndicator'
import Post from './PostList/Post'
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
    } else return (
      <div>No post found!</div>
    )
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
          <CommentListContainer id={this.props.match.params.id} />
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.items.filter((post) => (post.id === ownProps.match.params.id))[0],
    isFetching: state.posts.isFetching,
  }
}

export default connect(mapStateToProps)(PostSingle);