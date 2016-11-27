const express = require('express');
const bodyParser = require('body-parser');
const geolib = require('geolib');
const app = express();
app.use(bodyParser.json());

var messages = [
];

function getMessages(ownLat, ownLng) {
    messages.filter(message => {
        return geolib.getDistanceSimple(
            {latitude: ownLat, longitude: ownLng},
            message.location
        ) < 4000;
    });
}

app.get('/:lat/:lng', (req, res) => {
    console.log(req.params);
    res.json(
        {
            messages: getMessages(req.params.lat, req.params.lng)
        }
    );
});

app.post('/', (req, res) => {
    message = req.body;
    message.timestamp = Date.now();
    messages.unshift(message);
    res.json(
        {
            messages: getMessages()
        }
    );
});

app.listen(3000, () => console.log('Up and running!'));
