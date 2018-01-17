import React, {Component} from 'react';
import Post from './Post';
import { connect } from 'react-redux';

class PostSingle extends Component {
  render() {

    console.log(this.props);

    return(
      <Post post={this.props.post}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log('ownProps', ownProps);
  return {
    post: state.posts.filter((post) => (post.id === ownProps.match.params.id))[0]
  }
}

export default connect(mapStateToProps)(PostSingle);