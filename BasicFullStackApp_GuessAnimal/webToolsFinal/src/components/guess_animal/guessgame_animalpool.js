import React from 'react'
import List from '../list';

export default (props) => {
    return (
        <List items={props.animals} sign="glyphicon glyphicon-piggy-bank"/>
    )
}