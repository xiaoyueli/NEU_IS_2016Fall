import React, {Component} from 'react';
import data from './guessgame_data';
import GuessGameLevel from './guessgame_select';
import History from './guessgame_history';
import AnimalsPool from './guessgame_animalpool';
import UserInfo from '../user_info';

export default class GuessWord extends Component{

    constructor(props) {
        super(props);
        this.state = {
            animals: [],
            reward:0,
            player:[],
            computer:[],
            target:'',
            guess:'',
            next:'',
            player_win:false,
            computer_win:false,
            disabled:true,
            typo:false,
        }
    }



    handleSelect(num, reward) {
        this.setState({animals:data.getList(num), reward,
            player:[],
            computer:[],
            target:'',
            guess:'',
            next:'',
            player_win:false,
            computer_win:false,
            disabled:false,
            typo:false});
    }

    handleInput(e) {
        this.setState({guess: e.target.value});
    }

    handleGuess() {
        console.log(this.state.target);
        const animal = this.state.guess;
        if (!animal) {
            this.setState({typo:true});
            return;
        }

        const animals = data.deleteWord(this.state.animals.slice(), animal);
        if (!animals) {
            this.setState({typo:true});
            return;
        }

        const player = this.state.player.slice();
        player.push(animal);


        let next = 'computer';
        let player_win = false;
        let disabled = false;


        if (animal.toLowerCase() === this.state.target.toLowerCase()) {
            player_win = true;
            disabled = true;
            next = '';
            this.props.handleUpdate(this.state.reward);
        }


        this.setState({animals, player,next, player_win, disabled,
            typo:false, guess:''});

    }

    handleComputerTurn() {
        const guess = data.randomPick(this.state.animals);
        const animals = data.deleteWord(this.state.animals.slice(), guess);
        const computer = this.state.computer.slice();
        computer.push(guess);

        let computer_win = false;
        let disabled = false;

        if (guess.toLowerCase() === this.state.target.toLowerCase()) {
            computer_win = true;
            disabled = true;
            this.props.handleUpdate(-this.state.reward);
        }

        this.setState({animals, computer, computer_win, disabled,
            next:'player'});
    }

    componentWillUpdate() {
        if (this.state.animals.length !== 0 && !this.state.target) this.setState({target:data.randomPick(this.state.animals)});
        if (!this.props.login) {
            this.setState({
                animals: [],
                reward:0,
                player:[],
                computer:[],
                target:'',
                guess:'',
                next:'',
                player_win:false,
                computer_win:false,
                disabled:true,
                typo:false,
            })
        }
    }

    componentDidUpdate() {
        if (this.state.next === 'computer') this.handleComputerTurn();
    }

    render() {
        return (
            <div className="modal fade" id="guessWord" role="dialog">
                <div className="modal-dialog container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="row row-content">
                                <div className="col-xs-12 col-sm-6">
                                    <h3 className="modal-title">Pick the Monster!</h3>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <UserInfo username={this.props.username}
                                              score={this.props.score}
                                              rate={this.props.rate}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">

                            <div className="row row-content">
                                <div className="col-xs-12 col-sm-4">
                                    <div className="row row-content">
                                        <div className="btn-group" id="guessBar">
                                            <GuessGameLevel handleSelect={(num, reward)=> this.handleSelect(num, reward)}/>
                                        </div>

                                    </div>
                                    <div className="row row-content">
                                        {this.state.animals.length !== 0 && <AnimalsPool animals={this.state.animals}/>}
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-8">
                                    <div className="row row-content" id="guessInput">
                                        <input type="text" value={this.state.guess} onChange={this.handleInput.bind(this)}/>
                                        <button className="btn btn-success" onClick={this.handleGuess.bind(this)} disabled={this.state.disabled}>Pick</button>
                                    </div>
                                    <div className="row row-content">
                                        <History player={this.state.player} computer={this.state.computer}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {this.state.player_win && <p><span className="guess_win"><span className="glyphicon glyphicon-ok">Win!!</span></span> You got the animal: <span className="guess_target">{this.state.target}</span>. <span className="guess_reward"> +{this.state.reward}!!</span></p>}
                            {this.state.computer_win && <p><span className="glyphicon glyphicon-remove"></span> Computer got the animal: <span className="guess_target">{this.state.target}</span>. <span className="guess_reward"> -{this.state.reward} :(</span></p>}
                            {this.state.typo && <p className="glyphicon glyphicon-alert"> Correct animal name needed!</p>}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}