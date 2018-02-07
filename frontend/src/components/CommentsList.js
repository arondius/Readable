import React, { Component } from 'react';
import Comment from './Comment';
import LoadingIndicator from './LoadingIndicator'
import { fetchComments } from '../actions'
import { connect } from 'react-redux';

class CommentsList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.id));
  }
  
  renderCommentsOrLoadingIndicator() {
    console.log(this.props.commentsList);
    if(this.props.commentsList.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.commentsList.items.length > 0) {
      return(
        this.props.commentsList.items.map(comment => <li key={comment.id}><Comment comment={comment} /></li>)
      )
    }
  }

  render() {
    return(
      <ul>
        {this.renderCommentsOrLoadingIndicator()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    commentsList: state.comments,
  }
}

export default connect(mapStateToProps)(CommentsList)