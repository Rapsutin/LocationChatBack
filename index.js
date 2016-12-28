'strict mode';

const express = require('express');
const bodyParser = require('body-parser');
const room = require('./room');

const app = express();
app.use(bodyParser.json());

const MAX_DISTANCE = 1000;

function getMessagesFromRoom(req, res) {
    console.log(req.params);
    roomId = parseInt(req.params.room);
    room.getMessages(roomId)
        .then(messages => res.json(messages));
}

function saveNewMessage(req, res, next) {
    console.log(req.params);
    console.log(req.body);
    roomId = parseInt(req.params.room);
    room.saveMessage(roomId, req.body.text)
        .then(next());
}
function getRoomsWithinMaxDistance(req, res) {
    console.log(req.params);
    room.getRooms(req.params.lat, req.params.lng, MAX_DISTANCE)
        .then(response => res.json(response));
}

app.get('/message/:room', getMessagesFromRoom);
app.post('/message/:room', saveNewMessage, getMessagesFromRoom);
app.get('/rooms/:lat/:lng', getRoomsWithinMaxDistance);

app.listen(3000, () => console.log('Up and running!'));
