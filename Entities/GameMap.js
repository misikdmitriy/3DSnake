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
            this._map.push(new Array(this._width).fill(null));
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
        for (let i = 0; i < this._height; i++) {
            for (let j = 0; j < this._width; j++) {
                if (this._map[i][j] !== null) {
                    let obj = this._map[i][j];

                    if (result.indexOf(obj) !== -1) {
                        result.push(obj);
                    }
                }
            }
        }

        return result;
    }

    addObject(object) {
        let self = this;

        object.parts.forEach(function (obj) {
            var pos = obj.position;

            Helpers.throwIfGreater(pos.x, self.width);
            Helpers.throwIfGreater(pos.y, self.height);

            let currentObj = self._map[pos.y][pos.x];
            
            if (currentObj === null || (currentObj.canColise && obj.canColise)) {
                self._map[pos.y][pos.x] = object;
            } else {
                throw new MapCollisionException();
            }
        });
    }

    removeObject(object) {
        let result = false;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this._map[i][j] === object) {
                    result = true;
                    this._map[i][j] = null;
                }
            }
        }

        return result;
    }

    replaceObject(object) {
        if (this.removeObject(object)) {
            this.addObject(object);
            return true;            
        }

        return false;
    }

    isEmpty(x, y) {
        return this._map[y][x] === null;
    }
}