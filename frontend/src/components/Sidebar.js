import React, { Component } from 'react'

const Sidebar = props => {
    return(
      <div class="sidebar">
        {props.children}
      </div>
    )
}

export default Sidebar;