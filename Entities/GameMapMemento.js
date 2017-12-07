// jshint esversion: 6

class GameMapMemento {
    saveState(map) {
        this._map = [];

        for (let i = 0; i < map.height; i++) {
            let pushable = [];
            for (let j = 0; j < map.width; j++) {
                pushable.push(map.objectsOn(j, i));
            }

            this._map.push(pushable);
        }
    }

    restoreState(map) {
        map._map = this._map;
    }
}