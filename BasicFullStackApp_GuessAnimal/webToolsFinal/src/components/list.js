import React, {Component} from 'react';

export default class List extends Component {

    renderItem(items, sign) {
        return items.map(item => {
            return (
                <li key={item}><span className = {sign}></span> {item}</li>
            )
        })
    }

    render() {
        return (
            <ul>
                {this.renderItem(this.props.items, this.props.sign)}
            </ul>
        )
    }
}