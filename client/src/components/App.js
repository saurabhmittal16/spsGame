import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

import '../style/bootstrap.min.css';
import '../style/style.css';

import Header from './Header';
import Scoreboard from './Scoreboard';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3100",
            userID: null,
            yourScore: 0,
            theirScore: 0
        }
        this.setUser = this.setUser.bind(this);
    }

    setUser(id) {
        this.setState({
            userID: id
        });
    }

    send() {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('choice', "Saurabh");
    }
    
    render() {
        return (
            <div>
                <Header setUser={this.setUser} />
                <div className="container">
                    <Scoreboard your={this.state.yourScore} their={this.state.theirScore} />
                    <div id="options" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div className="option">Stone</div>
                        <div className="option">Paper</div>
                        <div className="option">Scissors</div>
                    </div>
                    <div id="resultBox">
                        <p>You chose ->
                            <span id="youChose"></span>
                        </p>
                        <p>They chose ->
                            <span id="theyChose"></span>
                        </p>
                        <div id="result" className="alert" role="alert">
                            THEY WON
                        </div>
                        <button id="reset" className="btn btn-secondary btn-lg btn-block">Play Again</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;