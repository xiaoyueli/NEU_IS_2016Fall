import React, {Component} from 'react';
import Info from './playerInfo';
import Board from './board';
import Controler from './controler_ttt';

class TTT extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      xIsNext: true,
      winner: null
    }
  }

  render() {

    return (
      <div className = "tab-pane" id = "tic_tac_toe">
        <div className = "container" id = "ttt">
          <Info winner = {this.state.winner}/>
          <Board cells = {this.state.cells} handleClick = {(i) => this.handleClick(i)}/>
          <Controler handleReset = {() => this.handleReset()}/>
        </div>
      </div>
    );
  }

  calculateWinner(board) {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let winner = null;
    combination.forEach((item) => {
      let [a, b, c] = item;
      if (board[a] != null && board[a] == board[b] && board[a] == board[c]) {
        winner = board[a];
      }
    })
    return winner;
  }

  handleClick(i) {
    if (this.state.winner || this.state.cells[i]) return;

    let cells = this.state.cells.slice();
    cells[i] = this.state.xIsNext ? "X" : "O";
    const winner = this.calculateWinner(cells);
    this.setState({
      cells,
      winner,
      xIsNext: !this.state.xIsNext})
  }

  handleReset() {
    const cells = Array(9).fill(null);
    this.setState({cells, winner: null, xIsNext: true});
  }
}

export default TTT;
