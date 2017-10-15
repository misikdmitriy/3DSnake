// jshint esversion: 6

class EventDispatcher {
    constructor() {
        this._listeners = {};
    }

    subscribe(event, listener) {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(listener);
    }

    publish(event, params) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(callback => {
                callback(params);
            });
        }
    }
}

let eventDispatcher = new EventDispatcher();