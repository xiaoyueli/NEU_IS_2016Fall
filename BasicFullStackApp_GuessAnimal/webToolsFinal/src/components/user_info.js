import React from 'react';

export default (props) => {
    return (
        <table className="table table-condensed">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Win Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.username.toUpperCase()}</td>
                    <td>{props.score}</td>
                    <td>{props.rate}</td>
                </tr>
            </tbody>
        </table>
    )
}