const geolib = require('geolib');
export default class Room {

    constructor(roomName, lat, lng) {
        this.roomName = roomName;
        this.lat = lat;
        this.lng = lng;
        this.messages = [];
        this.rolling_id = 0;
    }

    newMessage(text) {
        this.messages.unshift({text: text});
    }

    getMessages() {
        return this.messages;
    }

    distance(lat, lng) {
        return geolib.getDistanceSimple(
            {latitude: parseFloat(lat), longitude: parseFloat(lng)},
            {latitude: parseFloat(this.lat), longitude: parseFloat(this.lng)}
        );
    }

}
