import React from 'react';
import Logout from './logout';
import Login from './login';

export default (props) => {


  return (
      <nav className = "navbar navbar-inverse navbar-fixed-top" role = "navigation">
        <div className = "container">
          <div className = "navbar-header">
            <a className = "navbar-brand" data-toggle="modal" data-target="#edit">
              <img id="logo" alt = "Northeastern U" src = "./pic/logo_husky.png" />
            </a>
          </div>
          <div className = "navbar-collapse collapse">
              {props.login && <Login username={props.username} handleSignOut={props.handleSignOut.bind(this)}/>
              || <Logout />}
          </div>
        </div>
      </nav>
  )


}
