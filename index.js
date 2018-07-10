const express = require('express');
const socket = require('socket.io');
const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 3100;

const server = app.listen(port, () => {
    console.log(`Running at port ${port}`);
})

const io = socket(server);

app.get('/', (req, res) => {
    res.render('main.ejs', {
        id1: '1'
    });
});


app.get('/play', (req, res) => {
    if (req.query.uid === "1")
    {
        res.send("Let's Play");
    } else {
        res.redirect('/');
    }
})