import React, { Component } from 'react';

import { fetchComments } from '../../actions/commentActions'
import { connect } from 'react-redux';

import CommentList from './CommentList';
import LoadingIndicator from '../LoadingIndicator'
import CommentAddFormContainer from '../CommentAddFormContainer'

class CommentListContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchComments(this.props.id));
  }
  
  renderCommentsOrLoadingIndicator() {
    if(this.props.isFetching) {
        return <LoadingIndicator />
    }

    if(this.props.comments.length > 0) {
      return <CommentList comments={this.props.comments} />
    }
  }

  render() {
    return(
      <div>
        {this.renderCommentsOrLoadingIndicator()}
        <CommentAddFormContainer parentId={this.props.id}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments.items.filter((comment) => (comment.deleted === false && comment.parentDeleted === false)),
    isFetching: state.comments.isFetching
  }
}

export default connect(mapStateToProps)(CommentListContainer)