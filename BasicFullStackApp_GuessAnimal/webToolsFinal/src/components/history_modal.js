import React, {Component} from 'react';

export default class History extends Component{


    renderRecord(history) {
        if (!history) return;
        return history.map(record=> {
            const data = record.split("#");
            return (
            <tr key={data[0]}>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td>{data[2]}</td>
                <td>{data[3]}</td>
                <td>{(data[1] / data[2] * 100).toFixed(2)}%</td>
            </tr>
            )
        })
    }

    render() {
        return (

            <div id="history" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>History</h1>
                        </div>
                        <div className="modal-body">
                            <table className="table table-condensed">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Win</th>
                                    <th>Total</th>
                                    <th>Score</th>
                                    <th>Win Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderRecord(this.props.history)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
