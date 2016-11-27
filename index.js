const express = require('express');
const bodyParser = require('body-parser');
const geolib = require('geolib');
const app = express();
app.use(bodyParser.json());

var messages = [
];

function getMessages(ownLat, ownLng) {
    return messages.filter(message => {
        return geolib.getDistanceSimple(
            {latitude: parseFloat(ownLat), longitude: parseFloat(ownLng)},
            {latitude: parseFloat(message.location.latitude), longitude: parseFloat(message.location.longitude)}
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

app.post('/:lat/:lng', (req, res) => {
    console.log(req);
    message = req.body;
    message.timestamp = Date.now();
    messages.unshift(message);
    res.json(
        {
            messages: getMessages(req.params.lat, req.params.lng)
        }
    );
});

app.listen(3000, () => console.log('Up and running!'));
