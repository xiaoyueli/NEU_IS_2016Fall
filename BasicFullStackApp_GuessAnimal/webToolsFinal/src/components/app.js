import React, {Component} from 'react';
import LoginModal from './login_modal';
import RegisterModal from './register_modal';
import GuessWordModal from './guess_animal/guessgame_modal';
import History from './history_modal';
import Header from './header';
import Main from './main';
import 'jquery';
import Ranking from "./ranking_modal";
import Edit from "./edit_modal";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
        score: 0,
        win: 0,
        total: 0,
        rate: '',
        history:[],
        ranks:[],
        login: false
    }
  }


  handleSignIn(info) {
      this.setState({username: info.username,
          score: info.score,
          win: info.win,
          total: info.total,
          rate: info.rate,
          history: info.history,
          login: true
      });
  }

  handleSignOut(){
      this.setState({username:'',
          score:0,
          win:0,
          total:0,
          rate:'',
          login:false})
  }

  handleUpdate(score) {

      let win = this.state.win;
      if (score > 0) win = win + 1;

      fetch('http://localhost:3000/updatescore', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
              username: this.state.username,
              score: this.state.score + score,
                total: this.state.total + 1,
                win})})
          .then(res=>res.json())
          .then(res=> {
              this.setState({
                  score: res.score,
                  total: res.total,
                  win: res.win,
                  rate:res.rate,
                  history:res.history
                  });
          })
          .catch(e=>console.log(e));

  }

  handleRanking() {
      fetch('http://localhost:3000/getuserlist')
          .then(res=>res.json())
          .then(res=> {
            this.setState({ranks:res});
          })
          .catch(e=>console.log(e));
  }




  render() {
    return (
      <div>
        <Header login={this.state.login}
                username={this.state.username}
                handleSignOut={this.handleSignOut.bind(this)}/>
        <RegisterModal handleSignIn={(info) => this.handleSignIn(info)}/>
        <LoginModal handleSignIn={(info)=> this.handleSignIn(info)}/>
          <GuessWordModal handleUpdate={score=> this.handleUpdate(score)}
                            username={this.state.username}
                            score={this.state.score}
                            rate={this.state.rate}
                            login={this.state.login}/>
          <History history={this.state.history}/>
          <Ranking ranks={this.state.ranks}/>
          <Edit login={this.state.login} />
        <Main login={this.state.login}
              handleRanking={this.handleRanking.bind(this)}/>
      </div>
    );
  }
}

export default App;
