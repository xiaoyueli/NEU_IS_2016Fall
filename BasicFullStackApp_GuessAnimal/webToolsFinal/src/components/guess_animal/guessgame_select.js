import React, {Component} from 'react';

export default class Dropdown extends Component {

    renderLi(num, score) {
        return (
            <li key={num} onClick={() => this.props.handleSelect(num, score)}>
                <a href="#">Up to {num} animals win {score} socres</a>
            </li>
        )
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-warning dropdown-toggle" type="button" id="menu" data-toggle="dropdown">
                    Animal Pool <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {this.renderLi(10, 2)}
                    {this.renderLi(15, 5)}
                    {this.renderLi(20, 10)}
                </ul>
            </div>
        )
    }
}