import React, { Component } from 'react';
import PostListContainer from './PostList/PostListContainer';
import CategoryListContainer from './CategoryList/CategoryListContainer';
import PostSingle from './PostSingle';
import Sidebar from './Sidebar'
import '../App.css';
import { Route, Link, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <Route exact path="/" component={PostListContainer} />
        <Route path="/post/:id" component={PostSingle}/>
        <Route path="/category/:category" component={CategoryListContainer}/>
      </div>
    );
  }
}

export default App;
