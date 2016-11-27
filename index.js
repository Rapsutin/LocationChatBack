const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

var messages = [
];

function getMessages() {
    return messages;
}

app.get('/', (req, res) => {
    res.json(
        {
            messages: getMessages()
        }
    );
});

app.post('/', (req, res) => {
    message = req.body;
    message.timestamp = Date.now();
    messages.push(message);
    res.json(
        {
            messages: getMessages()
        }
    );
});

app.listen(3000, () => console.log('Up and running!'));
