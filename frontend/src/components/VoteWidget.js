import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions/voteActions'

const VoteWidget = (props) => (
<div className="vote-widget__container">
  <p className="vote-widget__votes">vote score: {props.voteScore}</p>
  <div className="vote-widget__vote-btn-container">
    <button 
      className="btn vote-widget__vote-btn vote-widget__vote-btn--up"
      onClick={() => props.dispatch(vote(props.id, 'upVote', props.type))}
    >
      <i className="fas fa-thumbs-up"></i>
    </button>
    <button
      className="btn vote-widget__vote-btn vote-widget__vote-btn--down"
      onClick={() => props.dispatch(vote(props.id, 'downVote', props.type))}
    >
      <i className="fas fa-thumbs-down"></i>
    </button>
  </div>
</div>
)

export default connect(null, null)(VoteWidget);
