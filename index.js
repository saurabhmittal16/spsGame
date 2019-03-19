const express = require('express');
const socket = require('socket.io');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));

const port = process.env.PORT || 3100;

const server = app.listen(port, () => {
    console.log(`Running at port ${port}`);
})

const io = socket(server);

const id1 = Math.floor(Math.random()*10000000)

app.get('/', (req, res) => {
    res.redirect(`/${id1}`);
})

app.get('/:id', (req, res) => {
    res.render('index.ejs')
});

const lobbies = {};

io.on('connect', (socket) => {
    socket.on('new_connection', data => {
        if (lobbies[data]) { 
            lobbies[data].push(socket);
            lobbies[data][0].emit('join_connection', {
                to: 1
            });
            lobbies[data][1].emit('join_connection', {
                to: 0
            });
        } else {
            lobbies[data] = new Array(1);
            lobbies[data][0] = socket;
        }
        console.log(Object.keys(lobbies));
    });

    socket.on('choice', (data) => {
        const {option, lobby, to} = data;
        if (lobbies[lobby].length === 2) {
            lobbies[lobby][to].emit('option', {
                choice: option,
                from: 1 - to
            });
        }
    });

    socket.on('again', (data) => {
        const {lobby, to} = data;
        if (lobbies[lobby].length === 2) {
            lobbies[lobby][to].emit('play', {
                from: 1 - to
            });
        }
    })
})