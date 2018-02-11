import React, { Component } from 'react';
import PostListContainer from './PostList/PostListContainer';
// import CommentListContainer from './CommentListContainer';
import PostSingle from './PostSingle';
import Sidebar from './Sidebar'
import '../App.css';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="container">
          <Route exact path="/" component={PostListContainer} />
          <Route path="/post/:id" component={PostSingle}/>
          {/* <Route path="/category/:category" component={CommentListContainer}/> */}
          <Sidebar>
            <h2>Categories:</h2>
            <ul>
              <li>
                <Link to="/category/react">React</Link>
              </li>
              <li>
                <Link to="/category/redux">Redux</Link>
              </li>
            </ul>
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default App;
