import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3100"
        }
    }

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('choice', "Saurabh");
    }
    
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <button onClick={this.send}>Send</button>
            </div>
        );
    }
}

export default App;