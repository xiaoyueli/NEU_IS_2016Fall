import React from 'react';
import NavBar from './nav_bar';

export default (props) => {

    return (
      <div className = "container" id = "mainArea">
          <div className="row space"></div>
          <NavBar handleRanking={props.handleRanking.bind(this)} login={props.login}/>
      </div>
    )

}


