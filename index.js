const express = require('express');
const app = express();

var messages = [
    'yy',
    'kaaa'
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
    messages.push(req.body);
    res.json(
        {
            messages: getMessages()
        }
    );
});

app.listen(3000, () => console.log('Up and running!'));
