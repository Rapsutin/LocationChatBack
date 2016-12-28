'strict mode';
const pool = require('./db');
const util = require('util');


function postGISLocation(latitude, longitude) {
    return util.format('SRID=4326;POINT(%d %d)', latitude, longitude);
}

function getRooms(latitude, longitude, maxDistance) {
    queryString = `SELECT * FROM room WHERE ST_DWithin(location, ST_GeographyFromText($1), $2)`;
    currentLocation = postGISLocation(latitude, longitude);

    return pool.query(queryString, [currentLocation, maxDistance])
        .then(result => result.rows)
        .catch(error => console.error(error));
}

function getMessages(roomId) {
    queryString = `SELECT * FROM message WHERE room_id=$1 ORDER BY id DESC`;
    return pool.query(queryString, [roomId])
        .then(result => result.rows)
        .catch(error => console.error(error));
}

function saveMessage(roomId, message) {
    queryString = `INSERT INTO message (room_id, text) VALUES ($1, $2)`;
    return pool.query(queryString, [roomId, message]).catch(error => console.error(error));
}

module.exports = {
    getMessages: getMessages,
    saveMessage: saveMessage,
    getRooms: getRooms
};
