import React from 'react';

export default (props)=> {

    return (

        <ul className = "nav navbar-nav navbar-right">
            <li><a id="user_in"><span>WELCOME! </span><span id="userin"> {props.username.toUpperCase()}</span></a></li>
            <li><a href="#" onClick={props.handleSignOut.bind(this)}><span className = "glyphicon glyphicon-log-out"></span> Sign out</a></li>
        </ul>

    )

}