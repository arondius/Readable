import React, { Component } from 'react';
import PostList from './PostList';
import PostSingle from './PostSingle';
import '../App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <Route exact path="/" component={PostList} />
        <Route path="/post/:id" component={PostSingle}/>
      </div>
    );
  }
}

export default App;
