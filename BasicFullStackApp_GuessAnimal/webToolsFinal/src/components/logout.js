import React from 'react';

export default ()=> {

    return (

        <ul className = "nav navbar-nav navbar-right">
            <li>
                <a href="#" data-toggle = "modal" data-target = "#registerModal">
                    <span className = "glyphicon glyphicon-registration-mark"></span> Sign Up</a>
            </li>
            <li>
                <a href="#" data-toggle = "modal" data-target = "#loginModal">
                    <span className = "glyphicon glyphicon-log-in"></span> Sign In</a>
            </li>
        </ul>

    )

}

