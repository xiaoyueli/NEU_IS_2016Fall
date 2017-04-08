import React, {Component} from 'react';

const PlayerInfo = (props) => {

  return (
    <div className = "row row-content">
    Winner is {props.winner}!
    </div>
  )
}

export default PlayerInfo;
