import React, {Component} from 'react';

export default class LoginModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
        password:'',
        usEmpty:false,
        pwEmpty:false,
        userNotExist:false,
        wronguserinfo:false
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      fetch('http://localhost:3000/checkusername',{
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({username: this.state.username})})
          .then(res=> res.json())
          .then(res => {
              let userNotExist = false;
              let wronguserinfo = false;

              console.log(res);
            if (res.password === this.state.password) {
              wronguserinfo = false;
              userNotExist = false;
              this.props.handleSignIn(res);
              this.close.click();
            }
            else if (res.username && res.password !== this.state.password) {

                wronguserinfo = true;
                userNotExist = false;
            } else userNotExist = true;

              this.setState({
                  username:'',
                  password:'',
                  wronguserinfo,
                  userNotExist}
              );

          }
            )
          .catch(e => console.log(e));
    }
    else this.setState({usEmpty: true, pwEmpty: true});
  }

  handleUsername(e) {
    const username = e.target.value;
    let usEmpty = false;
    if (!username) usEmpty = true;
    this.setState({username, usEmpty});
  }

  handlePassword(e) {
      const password = e.target.value;
      let pwEmpty = false;
      if (!password) pwEmpty = true;
      this.setState({password, pwEmpty});
  }

  requiredChunk() {
    return (
        <span className="notice">required</span>
    )
  }

  tryAgain() {
    return (
        <div><span className="notice">Username/Password are incorrect, try again!</span></div>
    )
  }

  handleUserNotExist() {
      return (
          <div><span className="notice">User doesn't exist, try again!</span></div>
      )
  }

  handleFocus() {
      this.setState({
          usEmpty:false,
          pwEmpty:false,
          userNotExist:false,
          wronguserinfo:false})
  }

  render() {

      return (
          <div id="loginModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" ref={event => this.close = event} className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Login</h4>
                </div>
                <div className="modal-body">
                  <form className="form-inline">
                      {this.state.wronguserinfo && this.tryAgain()}
                      {this.state.userNotExist && this.handleUserNotExist()}
                    <div className="form-group">
                        <label className="sr-only" htmlFor="username">Username: </label>
                        <input type="text"
                               className="form-control input-sm"
                               id="username"
                               placeholder="Username"
                               value={this.state.username}
                               onChange={this.handleUsername.bind(this)}
                        onFocus={this.handleFocus.bind(this)}/>
                        {this.state.usEmpty && this.requiredChunk()}
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="password">Password: </label>
                        <input type="password"
                               className="form-control input-sm"
                               id="password"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handlePassword.bind(this)}
                        onFocus={this.handleFocus.bind(this)}/>
                        {this.state.pwEmpty && this.requiredChunk()}
                    </div>
                    <button type="submit" className="btn btn-info btn-sm" onClick={this.handleSubmit.bind(this)}>Sign in</button>
                    <button type="button" className="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      )
  }
}


