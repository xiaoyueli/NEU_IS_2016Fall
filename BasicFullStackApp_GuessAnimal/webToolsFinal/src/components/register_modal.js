import React, {Component} from 'react';

class RegisterModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        password_conf:'',
        usEmpty:false,
        usExist:false,
        pwEmpty:false,
        pwcEmpty:false,
        pwcDiff:false

    }
  }

  handleSubmit(event) {
    event.preventDefault();
      if (this.state.username === '') this.setState({usEmpty:true});
      if (this.state.password === '') this.setState({pwEmpty:true});
      if (this.state.password_conf === '') this.setState({pwcEmpty:true});

    if (this.validation()) {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({username: this.state.username, password: this.state.password})})
      .then(res => res.json())
      .then(res => {

        this.props.handleSignIn(res);
        this.setState({
            username:'',
            password:'',
            password_conf:''
        });
        this.close.click();

      })
      .catch(e => {console.log(e)});
    }
  }

  handleUsername(event) {
    const username = event.target.value;
    if (username) {
      fetch('http://localhost:3000/checkusername', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({username})})
          .then(res => res.json())
          .then(res => {
            let usExist = false;
            if(res.username) {
              usExist= true;
            }
            this.setState({usExist})
          })
          .catch(e=>console.log(e))
    }
  }

  handlePasswordConfirm() {
    if (this.state.password && this.state.password !== this.state.password_conf) this.setState({pwcDiff: true});
      else this.setState({pwcDiff:false});
  }

  handleChange_us(e) {
    const username = e.target.value;
    this.setState({username});

  }

  handleChange_pw(e) {
    const password = e.target.value;

    this.setState({password});

  }

  handleChange_pwc(e) {
    const password_conf = e.target.value;
    this.setState({password_conf});
  }

  handleFocus() {
    this.setState({
        usEmpty:false,
        usExist:false,
        pwEmpty:false,
        pwcEmpty:false,
        pwcDiff:false
    })
  }

  validation() {
    return this.state.username
        && this.state.password
        && this.state.password === this.state.password_conf
        && !this.state.usExist
  }

  requiredChunk(){
    return (
        <span className="notice">Can not be empty!</span>
    )
  }

  render() {
    const register_url = "http://localhost:3000/register";
    return (
      <div id = "registerModal" className = "modal fade" role = "dialog">
        <div className = "modal-dialog">
          <div className = "modal-content">
            <div className = "modal-header">
              <button ref={event => this.close=event} type = "button" className = "close" data-dismiss = "modal">&times;</button>
              <h4 className = "modal-title">Registration</h4>
            </div>
            <div className = "modal-body">
              <form action = {register_url} method = "post">
                <div className = "form-group">
                  <label htmlFor = "username">Username: </label>
                  <input type = "text" className = "form-control input-sm"
                         id = "username"
                         name = "username"
                         placeholder = "Username"
                         value = {this.state.username}
                         onChange={this.handleChange_us.bind(this)}
                         onBlur = {this.handleUsername.bind(this)}
                         onFocus={this.handleFocus.bind(this)}/>
                    {this.state.usEmpty && this.requiredChunk()}
                    {this.state.usExist && <span className="notice">This name is registered, try another!</span>}
                </div>
                <div className = "form-group">
                  <label htmlFor = "password">Password: </label>
                  <input type = "password" className = "form-control input-sm"
                         id = "password"
                         name = "password"
                         placeholder = "Password"
                         value = {this.state.password}
                         onChange={this.handleChange_pw.bind(this)}
                         onFocus={this.handleFocus.bind(this)}/>
                    {this.state.pwEmpty && this.requiredChunk()}
                </div>
                <div className = "form-group">
                  <label htmlFor = "password_confirm">Confirm Password: </label>
                  <input type = "password" className = "form-control input-sm"
                         id = "password_confirm"
                         name = "password_confirm"
                         placeholder = "Password"
                         value = {this.state.password_conf}
                         onChange={this.handleChange_pwc.bind(this)}
                         onBlur={this.handlePasswordConfirm.bind(this)}
                  onFocus={this.handleFocus.bind(this)}/>
                    {this.state.pwcEmpty && this.requiredChunk()}
                </div>
                  {this.state.pwcDiff && <div><span className="notice">The passwords should be the same!</span></div>}

                <button type = "submit" className = "btn btn-danger" onClick = {this.handleSubmit.bind(this)}>Submit</button>
                <button type = "button" className = "btn btn-default" data-dismiss = "modal">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterModal;
