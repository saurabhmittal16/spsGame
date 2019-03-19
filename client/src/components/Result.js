import React from 'react';

const resultMap = {
    0: "TIE",
    1: "YOU WON",
    2: "THEY WON"
};

// const findResult = (y, t) => {
//     switch (y) {
//         case 0:
//             switch (t) {
//                 case 0:
//                     return 0;
//                 case 1:
//                     return 2;
//                 case 2:
//                     return 1;
//                 default: console.log('None')                    
//             }
//             break;
//         case 1:
//             switch (t) {
//                 case 0:
//                     return 1;
//                 case 1:
//                     return 0;
//                 case 2:
//                     return 2;
//                 default: console.log('None')                    
//             }
//             break;
//         case 2:
//             switch (t) {
//                 case 0:
//                     return 2;
//                 case 1:
//                     return 1;
//                 case 2:
//                     return 0;
//                 default: console.log('None')                    
//             }
//             break;
//         default: console.log('None')
//     }
// }

const Result = (props) => (
    <div id="resultBox">
        <p>You chose ->
            <span id="youChose">{props.yourChoice}</span>
        </p>
        <p>They chose ->
            <span id="theyChose">{props.theirChoice}</span>
        </p>
        <div id="result" className="alert" role="alert">
            {resultMap[props.result]}
        </div>
        <button id="reset" className="btn btn-secondary btn-lg btn-block">Play Again</button>
    </div>
);
export default Result;