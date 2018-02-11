import React, { Component } from 'react';
import CommentList from './CommentList';
import LoadingIndicator from './LoadingIndicator'
import { fetchComments } from '../actions'
import { connect } from 'react-redux';

class CommentListContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.id));
  }
  
  renderCommentsOrLoadingIndicator() {
    console.log(this.props.comments);
    if(this.props.comments.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.comments.items.length > 0) {
      return <CommentList comments={this.props.comments} />
    }
  }

  render() {
    return(
      <div>
        {this.renderCommentsOrLoadingIndicator()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
  }
}

export default connect(mapStateToProps)(CommentListContainer)