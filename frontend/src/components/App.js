import React, { Component } from 'react';
import PostListContainer from './PostList/PostListContainer';
import CategoryListContainer from './CategoryList/CategoryListContainer';
import PostSingle from './PostSingle';
import Sidebar from './Sidebar'
import '../App.css';
import { Route, Link, Switch } from 'react-router-dom';

const App = (props) => {
  const categories = [
    'react', 'redux', 'audacity'
  ]
  
  return (  
    <div className="page-container">
      <Route exact path="/" component={PostListContainer} />
      {categories.map((category) => (
        <Route path={`/${category}/:id`} component={PostSingle}/>
      ))}
      <Route path="/category/:category" component={CategoryListContainer}/>
    </div>
  )
}

export default App;