const express = require('express');
const bodyParser = require('body-parser');
const Room = require('./room');
const app = express();
app.use(bodyParser.json());

var rooms = [new Room("Testing", "60.203", "24.975")];

app.get('/:room', (req, res) => {
    console.log(req.params);
    res.json(
        {
            messages: rooms[parseInt(req.params.room)].getMessages()
        }
    );
});

app.post('/:room', (req, res) => {
    console.log(req);
    room = rooms[parseInt(req.params.room)];
    room.newMessage(req.body.text);
    res.json(
        {
            messages: room.getMessages()
        }
    );
});

app.get('/rooms', () => {
    roomsAvailable = [];
    for(i = 0; i < rooms.length; i++) {
        roomsAvailable.push({id: i, name: rooms[i].name});
    }
    res.json(roomsAvailable);
});

app.listen(3000, () => console.log('Up and running!'));
