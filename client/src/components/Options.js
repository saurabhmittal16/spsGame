import React from 'react';

const options = [
    'Stone',
    'Paper',
    'Scissors'
];

class Options extends React.Component {
    render() {
        return (
            <div id="options">
            {
                options.map(
                    (el, index) => (
                        <button 
                            key={el}
                            onClick={() => this.props.send(index)}
                            className='option'
                            disabled={this.props.dis}
                        >
                            {el}
                        </button>
                    )
                )
            }
            </div>
        );
    }
}

export default Options;