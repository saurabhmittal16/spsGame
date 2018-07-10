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

io.on('connect', (socket) => {
    socket.on('choice', (data) => {
        socket.broadcast.emit('option', data);
    });

    socket.on('again', (data) => {
        socket.broadcast.emit('play', data);
    })
})