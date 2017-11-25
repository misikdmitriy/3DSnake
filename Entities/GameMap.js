// jshint esversion: 6

class MapCollisionException extends Error { }

class GameMap {
    constructor(width, height) {
        this._width = width || 10;
        this._height = height || 10;

        Helpers.throwIfNotPositive(this._width);
        Helpers.throwIfNotPositive(this._height);

        this._map = [];

        for (let i = 0; i < this._height; i++) {
            let pushable = [];
            for (let j = 0; j < this._width; j++) {
                pushable.push([]);
            }

            this._map.push(pushable);
        }
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get objects() {
        let result = [];
        let addPromise = obj => {
            if (result.indexOf(obj) === -1) {
                result.push(obj);
            }
        };

        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                this._map[i][j].forEach(addPromise);
            }
        }

        return result;
    }

    addObject(object) {
        let self = this;

        object.parts.forEach(obj => {
            let pos = obj.position;

            Helpers.throwIfGreater(pos.x, self.width);
            Helpers.throwIfGreater(pos.y, self.height);
            Helpers.throwIfLess(pos.x, 0);
            Helpers.throwIfLess(pos.y, 0);

            self._map[pos.y][pos.x].push(object);
        });
    }

    removeObject(object) {
        let result = false;

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                let index = this._map[i][j].indexOf(object);

                if (index !== -1) {
                    result = true;
                    this._map[i][j].splice(index, 1);
                }
            }
        }

        return result;
    }

    replaceObject(object) {
        let memento = new GameMapMemento();
        memento.setState(this);

        try {
            if (this.removeObject(object)) {
                this.addObject(object);
                return true;
            }
        }
        catch (err) {
            memento.updateState(this);
        }

        return false;
    }

    objectsOn(x, y) {
        return this._map[y][x];
    }

    isEmpty(x, y) {
        return this._map[y][x].length === 0;
    }
}