import React from 'react';

export default (props) => {

  return (

  <div className = "row row-content nav">
    <div className="btn-group">
      <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#ranking" onClick={props.handleRanking.bind(this)} disabled={!props.login}>Ranking</button>
      <button className="btn btn-info btn-lg" data-toggle = "modal" data-target = "#guessWord" disabled={!props.login}>Zootopia</button>
      <button className="btn btn-info btn-lg" data-toggle="modal" data-target="#history" disabled={!props.login}>History</button>
    </div>
  </div>


  )

}


