import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

import '../style/bootstrap.min.css';
import '../style/style.css';

import Header from './Header';
import Scoreboard from './Scoreboard';
import Options from './Options';
import Result from './Result';

const findResult = (y, t) => {
    switch (y) {
        case 0:
            switch (t) {
                case 0:
                    return 0;
                case 1:
                    return 2;
                case 2:
                    return 1;
                default: console.log('None')                    
            }
            break;
        case 1:
            switch (t) {
                case 0:
                    return 1;
                case 1:
                    return 0;
                case 2:
                    return 2;
                default: console.log('None')                    
            }
            break;
        case 2:
            switch (t) {
                case 0:
                    return 2;
                case 1:
                    return 1;
                case 2:
                    return 0;
                default: console.log('None')                    
            }
            break;
        default: console.log('None')
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3100",
            partnerJoined: false,
            to: null,
            userID: null,
            yourScore: 0,
            theirScore: 0,
            yourChoice: null,
            theirChoice: null,
            result: null
        }
        this.setUser = this.setUser.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('new_connection', window.location.pathname.substr(1));

        socket.on('join_connection', (data) => {
            console.log('Partner joined')
            this.setState({
                partnerJoined: true,
                to: data.to
            });
        });

        socket.on('option', data => {
            this.setState({
                theirChoice: data.choice
            });
            this.evaluateResult();
        });
    }

    setUser(id) {
        this.setState({
            userID: id
        });
    }

    evaluateResult() {
        console.log(this.state);
        if (this.state.yourChoice !== null && this.state.theirChoice !== null) {
            let result = findResult(this.state.yourChoice, this.state.theirChoice);
            let y = this.state.yourScore;
            let t = this.state.theirScore;
            if (result === 1)
                y++;
            else if (result === 2)
                t++;
            this.setState({
                result: result,
                yourScore: y,
                theirScore: t
            });
        }
    }

    send(val) {
        const socket = socketIOClient(this.state.endpoint);
        this.setState({
            yourChoice: val
        }, () => {
            socket.emit('choice', {
                option: val,
                lobby: this.state.userID,
                to: this.state.to
            });
            this.evaluateResult();
        });
    }

    render() {
        return (
            <div>
                <Header setUser={this.setUser} />
                {
                    this.state.partnerJoined ? (
                        <div className="container">
                            <Scoreboard 
                                your={this.state.yourScore} 
                                their={this.state.theirScore} 
                            />
                            <Options send={this.send} />
                            {
                                this.state.theirChoice !== null && 
                                this.state.yourChoice !== null && 
                                this.state.result !== null && (
                                    <Result {...this.state} />
                                )
                            }
                        </div>
                    ) : (
                        <div style={{marginTop: '200px'}}>Waiting for partner to join...</div>
                    )
                }
            </div>
        );
    }
}

export default App;