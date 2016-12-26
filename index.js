const express = require('express');
const bodyParser = require('body-parser');
const Room = require('./room');
const app = express();
app.use(bodyParser.json());

const MAX_DISTANCE = 1000;

var rooms = [new Room("Kumpulan kampus", "60.203978", "24.96555"),
             new Room("Kauppakeskus Arabia", "60.20282", "24.96785"),
             new Room("Raha-automaattiyhdistys", "60.21906", "24.829")];

app.get('/message/:room', (req, res) => {
    console.log(req.params);
    res.json({
        messages: rooms[parseInt(req.params.room)].getMessages()
    });
});

app.post('/message/:room', (req, res) => {
    console.log(req);
    room = rooms[parseInt(req.params.room)];
    room.newMessage(req.body.text);
    res.json({
        messages: room.getMessages()
    });
});

app.get('/rooms/:lat/:lng', (req, res) => {
    console.log(req)
    roomsAvailable = [];
    for (i = 0; i < rooms.length; i++) {
        if (rooms[i].distance(req.params.lat, req.params.lng) < MAX_DISTANCE) {
            roomsAvailable.push({
                id: i,
                name: rooms[i].roomName
            });
        }
    }
    res.json(roomsAvailable);
});

app.listen(3000, () => console.log('Up and running!'));
