import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy() {
        this.inputRef.current.disabled = false;   
        this.inputRef.current.select();  
        document.execCommand("copy");
        this.inputRef.current.disabled = true;        
    }

    componentDidMount() {
        this.inputRef.current.value = window.location.href;
        this.inputRef.current.disabled = true;       
        const currUser = window.location.pathname.substr(1);
        this.props.setUser(currUser);
    }

    render() {
        return (
            <div className="jumbotron" id="header">
                <div className="container">
                    <h1 id="title">
                        Stone Paper Scissors
                    </h1>
                    <p>Send this link to the player</p>
                    <input id="link" type="text" ref={this.inputRef} />
                    <span 
                        style={{cursor: 'pointer', marginLeft: '10px'}} 
                        onClick={this.handleCopy}
                    >
                        Copy
                    </span>
                </div>
            </div>
        );         
    }
}

export default Header;