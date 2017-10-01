// jshint esversion: 6

let DefaultControls = {
    UP: 83, // S
    RIGHT: 68, // D
    DOWN: 87, // W
    LEFT: 65 // A
};

let Default3DControls = {
    LEFT: 68, // D
    RIGHT: 65 // A
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

class BasePlayerController {
    constructor(target, controls, initialDirection) {
        this._obj = null;
        this._map = null;

        this._target = target;
        this._direction = initialDirection || Direction.NODIRECTION;
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

    subscribe() {
        this._target.addEventListener("keydown", this._listener);        
    }

    dispose() {
        this._target.removeEventListener("keydown", this._listener);
    }
}

class PlayerController extends BasePlayerController {
    constructor(target, controls, initialDirection) {
        super(target, controls, initialDirection);

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
    }
}

class Player3DController extends BasePlayerController {
    constructor(target, controls, initialDirection) {
        super(target, controls);

        this._direction = initialDirection || Direction.NODIRECTION;

        let self = this;
        this._listener = function (event) {
            if (event.defaultPrevented) {
                return;
            }

            let newDirection = self._direction;

            if (event.keyCode === controls.RIGHT) {
                newDirection *= 2;
                if (newDirection >= Direction.NODIRECTION) {
                    newDirection = Direction.UP;
                }
            }
            else if (event.keyCode === controls.LEFT) {
                newDirection /= 2;
                if (newDirection < Direction.UP) {
                    newDirection = Direction.LEFT;
                }
            }

            if (self._obj.availableMoves.indexOf(newDirection) !== -1) {
                self._direction = newDirection;
            }
        };
    }
}