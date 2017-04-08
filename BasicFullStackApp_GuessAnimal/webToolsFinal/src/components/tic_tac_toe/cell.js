import React from 'react';

const Cell = (props) => {

  return (
    <button onClick = {() => props.handleClick()}>
    {props.value}
    </button>
  )
}

export default Cell;
