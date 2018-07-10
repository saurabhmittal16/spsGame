const socket = io.connect("http://localhost:3100");

const message = document.querySelector('#message'),
    send = document.querySelector('#send'),
    output = document.querySelector('#output'),
    link = document.querySelector('#link');

link.innerHTML = window.location.href;

const currUser = window.location.pathname.substr(1);

send.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        user: currUser
    });
    output.innerHTML += `<p><strong>YOU: </strong>${message.value}</p>`
    message.value = '';
})

message.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        send.click();
    }
    socket.emit('typing', currUser);
});

socket.on('chat', (data) => {
    if (data.user === currUser) {
        output.innerHTML += `<p><strong>THEM: </strong>${data.message}</p>`
    }
})
