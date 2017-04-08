import React from 'react';

const Controler = (props) => {
  return (
    <div className = "row row-content">
      <div>
        <button type = "button" className = "btn btn-info" onClick = {() => props.handleReset()} >Reset</button>
      </div>
    </div>
  )
}

export default Controler;
