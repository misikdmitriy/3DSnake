// jshint esversion: 6

let DefaultControls = {
    UP: 83, // S
    RIGHT: 68, // D
    DOWN: 87, // W
    LEFT: 65 // A
};

class GameOverError extends Error {
    constructor(loser) {
        super();
        this._loser = loser;
    }

    get loser() {
        return this._loser;
    }
}

class PlayerController {
    constructor(target, controls) {
        this._obj = null;
        this._map = null;

        this._target = target;
        this._direction = Direction.NODIRECTION;

        let self = this;
        this._listener = function (event) {
            if (event.defaultPrevented) {
                return;
            }

            let newDirection = null;

            if (event.keyCode === controls.UP) {
                newDirection = Direction.UP;
            }
            else if (event.keyCode === controls.RIGHT) {
                newDirection = Direction.RIGHT;
            }
            else if (event.keyCode === controls.DOWN) {
                newDirection = Direction.DOWN;
            }
            else if (event.keyCode === controls.LEFT) {
                newDirection = Direction.LEFT;
            }

            if (self._obj !== null && self._obj.availableMoves.indexOf(newDirection) !== -1) {
                self._direction = newDirection;
            }
        };

        this._target.addEventListener("keydown", this._listener);
    }

    get object() {
        return this._obj;
    }

    set object(obj) {
        if (this._map !== null && this._obj !== null) {
            this._map.removeObject(this._obj);
        }

        this._obj = obj;

        if (this._map !== null) {
            this._map.addObject(this._obj);
        }
    }

    get map() {
        return this._map;
    }

    set map(map) {
        if (this._map !== null && this._obj !== null) {
            this._map.removeObject(this._obj);
        }

        this._map = map;

        if (this._obj !== null) {
            this._map.addObject(this._obj);
        }
    }

    move() {
        if (this._obj !== null && this._map !== null) {
            this._obj.move(this._direction);
            if (!this._map.replaceObject(this._obj)) {
                this._obj.resetPosition();
                throw new GameOverError(this._obj);
            }
        }
    }

    dispose() {
        this._target.removeEventListener("keydown", this._listener);
    }
}