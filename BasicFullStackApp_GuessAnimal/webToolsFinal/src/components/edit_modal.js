import React, {Component} from 'react';

export default class Edit extends Component{

    constructor(props) {
        super(props);
        this.state= {
            emptydb: false,
            deleteuser: false,
            usernotexist: false,
            emptyInfo: false,
            username: ''
        }
    }

    handleDeleteAll() {

        fetch('http://localhost:3000/emptydb')
            .then(res => res.json())
            .then(res => {
                let emptydb = false;
                if (res) emptydb = true;
                this.setState({emptydb})
            })
            .catch(e=>console.log(e));
    }

    handleDeleteUser(username) {
        if (!username) {
            this.setState({emptyInfo: true});
            return;
        }


        fetch('http://localhost:3000/deleteuser', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({username})})
            .then(res => res.json())
            .then(res => {
                let deleteuser = false;
                let usernotexist = false;
                if (res) deleteuser = true;
                else usernotexist = true;
                this.setState({deleteuser, usernotexist, username: ''});
            })
            .catch(e=>console.log(e));
    }

    render() {
        return (

            <div id="edit" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Modify Database</h3>
                        </div>
                        <div className="modal-body">
                            <div>
                                {this.state.emptydb && <div>Database is empty now!</div>}
                                {this.state.deleteuser && <div>User is deleted!</div>}
                                {this.state.emptyInfo && <div>Username is required!</div>}
                                {this.state.usernotexist && <div>User doesn't exist!</div>}
                            </div>
                            <div id="edit_controls">
                                <input type="text"
                                       value={this.state.username}
                                       onFocus={() => this.setState({emptydb: false, deleteuser:false, emptyInfo: false, usernotexist: false})}
                                       onChange={(e) => this.setState({username: e.target.value})}
                                placeholder="Username"/>
                                <button className="btn btn-danger" onClick={() => this.handleDeleteUser(this.state.username)} disabled={this.props.login}>Delete User</button>
                                <button className="btn btn-danger" onClick={this.handleDeleteAll.bind(this)} disabled={this.props.login}>Empty Database</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}