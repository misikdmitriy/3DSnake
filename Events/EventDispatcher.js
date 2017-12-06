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

    unsubscribe(event, listener) {
        let index = this._listeners[event].indexOf(listener);

        if (index > -1) {
            this._listeners[event].splice(index, 1);
        }
    }

    publish(event, params) {
        if (this._listeners[event]) {
            this._listeners[event].forEach(callback => {
                callback(params);
            });
        }
    }

    drop() {
        this._listeners = {};
    }
}

let eventDispatcher = new EventDispatcher();