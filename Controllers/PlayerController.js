// jshint esversion: 6

let DefaultControls = {
    UP: 87, // W
    RIGHT: 68, // D
    DOWN: 83, // S
    LEFT: 65 // A
};

class PlayerController {
    constructor(target, controls) {
        this._obj = null;
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
        this._obj = obj;
    }

    move() {
        if (this._obj !== null) {
            this._obj.move(this._direction);
        }
    }

    dispose() {
        this._target.removeEventListener("keydown", this._listener);
    }
}