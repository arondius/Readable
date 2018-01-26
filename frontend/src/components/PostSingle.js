import React, {Component} from 'react';
import Post from './Post';
import CommentsList from './CommentsList'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostSingle extends Component {
  render() {

    //console.log('PostSingle props', this.props);

    return(
      <div className="postWrapper">
        <h3><Link to="/">Back to the list of Posts</Link></h3>
        <Post post={this.props.post}/>
        <h2>Comments</h2>
        <CommentsList commentsList={this.props.commentsList}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log('ownProps', ownProps);
  // console.log('state', state);
  return {
    post: state.posts.items.filter((post) => (post.id === ownProps.match.params.id))[0],
    commentsList: state.comments.filter((comment) => (comment.parentId === ownProps.match.params.id))
  }
}

export default connect(mapStateToProps)(PostSingle);