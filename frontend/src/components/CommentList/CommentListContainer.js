import React, { Component } from 'react';
import CommentList from './CommentList';
import LoadingIndicator from '../LoadingIndicator'
import { fetchComments } from '../../actions'
import { connect } from 'react-redux';

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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments.items,
    isFetching: state.comments.isFetching
  }
}

export default connect(mapStateToProps)(CommentListContainer)