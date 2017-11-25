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
        eventDispatcher.publish("gameOver");
    }

    get loser() {
        return this._loser;
    }
}

class BasePlayerController {
    constructor(target, controls, initialDirection, params) {
        this._obj = params.movingSnake;
        this._map = params.gameMap;
        this._snake = params.realSnake;
        this._feed = [];

        this._map.addObject(this._obj);

        this._target = target;
        this._direction = initialDirection || Direction.NODIRECTION;

        let self = this;
    }

    move() {
        if (this._obj !== null && this._map !== null) {
            this._obj.move(this._direction);
            if (!this._map.replaceObject(this._obj)) {
                this._obj.resetPosition();
                throw new GameOverError(this._obj.object);
            } else {
                let objects = this._map.objectsOn(this._obj.position.x, this._obj.position.y);
                if (objects.length > 1) {
                    objects.forEach(element => {
                        let obj = element.object;
                        this._snake.accept(obj);
                        this._map.replaceObject(element);
                    });
                }
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
    constructor(target, controls, initialDirection, params) {
        super(target, controls, initialDirection, params);

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
    constructor(target, controls, initialDirection, params) {
        super(target, controls, initialDirection, params);

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