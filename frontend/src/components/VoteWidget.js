import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions'
class VoteWidget extends Component {

  render() {
    return(
      <div className="vote-widget__container">
        <p className="vote-widget__votes">votes: {this.props.voteScore}</p>
        <div className="vote-widget__vote-btn-container">
          <button 
            className="btn vote-widget__vote-btn vote-widget__vote-btn--up"
            onClick={() => this.props.dispatch(vote(this.props.id, 'upVote', this.props.type))}
          >
            <i className="fas fa-thumbs-up"></i>
          </button>
          <button
            className="btn vote-widget__vote-btn vote-widget__vote-btn--down"
            onClick={() => this.props.dispatch(vote(this.props.id, 'downVote', this.props.type))}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default connect()(VoteWidget);
