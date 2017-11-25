// jshint esversion: 6

class GameOverError extends Error {
    constructor(loserSize) {
        super();
        this._loserSize = loserSize;
        eventDispatcher.publish("gameOver");
    }

    get size() {
        return this._loserSize;
    }
}