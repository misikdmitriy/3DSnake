// jshint esversion: 6

let DefaultControls = {
    UP: 0x57, // W
    RIGHT: 0x44, // D
    DOWN: 0x53, // S
    LEFT: 0x41 // A
};

class PlayerListener {
    constructor(target, controls) {
        this._obj = null;
        this._target = target;
        this._direction = Direction.NODIRECTION; 

        let self = this;
        this._listener = function (event) {
            console.log(event.keyCode);
            if (event.defaultPrevented) {
                return;
            }

            let newDirection = null;

            if (event.keyCode === controls.UP) {
                newDirection = Direction.UP;
            }
            else if (event.keyCode === controls.RIGTH) {
                newDirection = Direction.RIGTH;
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