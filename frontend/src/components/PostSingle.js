import React, {Component} from 'react';
import Post from './Post';
import CommentsList from './CommentsList'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import LoadingIndicator from './LoadingIndicator'
import Sidebar from './Sidebar.js'
import PostFormContainer from './PostFormContainer'

class PostSingle extends Component {
  renderPostsOrLoadingIndicator() {

    if(this.props.postList.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.postList.items.length > 0) {
      return(
        <Post post={this.props.postList.items.filter((post) => (post.id === this.props.match.params.id))[0]} />
      )
    }
  }
  
  render() {
    return(
      <div className="container">
        <div class="content">
          <h3><Link to="/"><i className="fas fa-arrow-circle-left heading-icon heading-icon--left"></i>Back to the list of Posts</Link></h3>
          {this.renderPostsOrLoadingIndicator()}
          <h2>Comments</h2>
          <CommentsList id={this.props.match.params.id} commentsList={this.props.commentsList}/>
        </div>
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
  // console.log('ownProps', ownProps);
  // console.log('state', state.posts);
  return {
    postList: state.posts,
    // post: state.posts.items.filter((post) => (post.id === ownProps.match.params.id)[0]),
    // commentsList: state.comments.filter((comment) => (comment.parentId === ownProps.match.params.id))
  }
}

export default connect(mapStateToProps)(PostSingle);