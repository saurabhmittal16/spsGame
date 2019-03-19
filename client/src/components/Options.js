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
                        <div 
                            key={el}
                            className='option'
                            onClick={() => this.props.send(index)} 
                        >
                            {el}
                        </div>
                    )
                )
            }
            </div>
        );
    }
}

export default Options;