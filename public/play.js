const socket = io.connect("http://localhost:3100");

const options = document.querySelectorAll('.option'),
    resultBox = document.querySelector('#resultBox'),
    resultP = document.querySelector('#result'),
    youChose = document.querySelector('#youChose'),
    theyChose = document.querySelector('#theyChose'),
    yourScoreSpan = document.querySelector('#yourScoreSpan'),
    theirScoreSpan = document.querySelector('#theirScoreSpan'),
    playAgainBtn = document.querySelector('#reset');

let yourChoice = undefined,
    yourScore = 0,
    youPlayAgain = false,
    theirChoice = undefined,
    theirScore = 0,
    theyPlayAgain = false,
    result = undefined;

link.innerHTML = window.location.href;
const currUser = window.location.pathname.substr(1);

options.forEach((option) => {
    option.addEventListener('click', (e) => {
        yourChoice = e.path[0].innerHTML.toLowerCase();
        socket.emit('choice', {
            choice: yourChoice,
            user: currUser
        })
        findResult(yourChoice, theirChoice);
    });
});

playAgainBtn.addEventListener('click', () => {
    socket.emit('again', {
        user: currUser
    });
    youPlayAgain = true;
    playAgainBtn.innerHTML = "WAITING..";
    reset(youPlayAgain, theyPlayAgain);
});

socket.on('option', (data) => {
    if (data.user === currUser) {
        theirChoice = data.choice;
        findResult(yourChoice, theirChoice);
    }
})

socket.on('play', (data) => {
    if (data.user === currUser) {
        theyPlayAgain = true;
        reset(youPlayAgain, theyPlayAgain);
    }
});

const reset = (y, t) => {
    if (y && t) {
        yourChoice = undefined;
        theirChoice = undefined;
        result = undefined;
        resultBox.style.display = "none";
        playAgainBtn.innerHTML = "Play Again";
        youPlayAgain = false;
        theyPlayAgain = false;

    }

}

const findResult = (y, t) => {
    if (y && t) {
        switch (y) {
            case "stone":
                switch (t) {
                    case "stone":
                        result = "TIE";
                        break;
                    case "paper":
                        result = "THEY WON";
                        theirScore++;
                        break;
                    case "scissors":
                        result = "YOU WON";
                        yourScore++;
                        break;
                }
                break;
            case "paper":
                switch (t) {
                    case "stone":
                        result = "YOU WON";
                        yourScore++;
                        break;
                    case "paper":
                        result = "TIE";
                        break;
                    case "scissors":
                        result = "THEY WON";
                        theirScore++;
                        break;
                }
                break;
            case "scissors":
                switch (t) {
                    case "stone":
                        result = "THEY WON";
                        theirScore++;
                        break;
                    case "paper":
                        result = "YOU WON";
                        yourScore++;
                        break;
                    case "scissors":
                        result = "TIE";
                        break;
                }
        }
        resultBox.style.display = "block";
        youChose.innerHTML = y;
        theyChose.innerHTML = t;
        yourScoreSpan.innerHTML = yourScore;
        theirScoreSpan.innerHTML = theirScore;
        resultP.innerHTML = result;
    }
}