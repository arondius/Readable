import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostListContainer from './PostList/PostListContainer';
import CategoryListContainer from './CategoryList/CategoryListContainer';
import PostSingle from './PostSingle';
import Sidebar from './Sidebar'
import '../App.css';
import { Route, Link, withRouter } from 'react-router-dom';

const App = (props) => {
  return (  
    <div className="page-container">
      <Route exact path="/" component={PostListContainer} />
      {props.categories.map((category) => (
        <Route key={category.name} path={`/${category.path}/:id`} component={PostSingle}/>
      ))}
      <Route path="/category/:category" component={CategoryListContainer}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items
  }
}

export default withRouter(connect(mapStateToProps)(App));