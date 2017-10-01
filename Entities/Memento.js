// jshint esversion: 6

class Memento {
    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }
}