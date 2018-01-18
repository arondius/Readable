import React, { Component } from 'react';
import Comment from './Comment';
import { fetchComments } from '../actions'
//import { connect } from 'react-redux';

class CommentsList extends Component {
  // componentDidMount() {
  //   this.props.dispatch(fetchComments());
  // }

  render() {
    console.log('CommentsList Props', this.props);
    return(
      <ul>
        {this.props.commentsList.map(comment => <li key={comment.id}><Comment comment={comment} /></li>)}
      </ul>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     commentsList: state.comments,
//   }
// }

export default CommentsList