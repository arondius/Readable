import React, {Component} from 'react';
import Post from './Post';
import CommentListContainer from './CommentListContainer'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator'
import Sidebar from './Sidebar.js'
import PostFormContainer from './PostFormContainer'

class PostSingle extends Component {
  renderPostsOrLoadingIndicator() {
    if(this.props.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.postList.length > 0) {
      return(
        <Post post={this.props.postList} />
      )
    }
  }
  
  render() {
    return(
      <div>
        <h3>
          <Link to="/">
            <i className="fas fa-arrow-circle-left heading-icon heading-icon--left"></i>
            Back to the list of Posts
          </Link>
        </h3>
        {this.renderPostsOrLoadingIndicator()}
        <h2>Comments</h2>
        <CommentListContainer id={this.props.match.params.id} CommentList={this.props.CommentList}/>
        <Sidebar>
          <PostFormContainer
            mode="add"
            post={null}
            id="addPost"
          />
        </Sidebar>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state, ownProps);
  return {
    postList: state.posts.items.filter((post) => (post.id === ownProps.match.params.id))[0],
    isFetching: state.posts.isFetching,
    CommentList: state.comments.items.filter((comment) => (comment.parentId === ownProps.match.params.id))
  }
}

export default connect(mapStateToProps)(PostSingle);