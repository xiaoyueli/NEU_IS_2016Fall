import React, {Component} from 'react';
import Cell from './cell';

class Board extends Component {

  constructor(props) {
    super(props);
  }

  getCell(i) {
    return (
      <Cell value = {this.props.cells[i]} handleClick = {() => this.props.handleClick(i)}/>
    )
  }

  render() {
    return (
      <div className = "row row-content">
        <div className = "board-row">
          {this.getCell(0)}
          {this.getCell(1)}
          {this.getCell(2)}
        </div>
        <div className = "board-row">
          {this.getCell(3)}
          {this.getCell(4)}
          {this.getCell(5)}
        </div>
        <div className = "board-row">
          {this.getCell(6)}
          {this.getCell(7)}
          {this.getCell(8)}
        </div>
      </div>
    )
  }
}

export default Board;
