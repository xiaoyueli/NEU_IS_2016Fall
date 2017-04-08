import React, {Component} from 'react';
import List from '../list';

export default (props) => {

    return (
        <div className="row row-content">
            <div className="col-xs-12 col-sm-5">
                <p>Player:</p>
                <List items={props.player} sign="glyphicon glyphicon-user"/>
            </div>
            <div className="col-xs-12 col-sm-7">
                <p>Computer:</p>
                <List items={props.computer} sign="glyphicon glyphicon-blackboard"/>
            </div>
        </div>
    )


}