import React, {Component} from 'react';

export default class Ranking extends Component{


    renderRecord(ranks) {
        if (!ranks) return;
        let rank = 0;
        return ranks.map(user=> {
            rank++;
            return (
                <tr key={rank}>
                    <td>{rank ===1 && <span className="glyphicon glyphicon-tower"></span> ||
                         rank ===2 && <span className="glyphicon glyphicon-star"></span> ||
                         rank ===3 && <span className="glyphicon glyphicon-star-empty"></span> ||
                         rank}
                        </td>
                    <td>{user[0]}</td>
                    <td>{user[2]}</td>
                    <td>{user[1]}</td>
                </tr>
            )
        })
    }

    render() {
        return (

            <div id="ranking" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>TOP 10</h1>
                        </div>
                        <div className="modal-body">
                            <table className="table table-condensed">
                                <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Win Rate</th>
                                    <th>Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderRecord(this.props.ranks)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}