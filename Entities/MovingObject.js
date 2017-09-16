// jshint esversion: 6

class CollisionException extends Error { }

class MovingObject {
    static isColise(part1, part2) {
        return part1.position.x === part2.position.x &&
            part1.position.y === part2.position.y;
    }

    constructor(obj, position, canColise) {
        Helpers.throwIfNotInteger(position.x);
        Helpers.throwIfNotInteger(position.y);

        this._pos = {
            x: position.x,
            y: position.y
        };

        this._obj = obj;
        this._canColise = canColise || false;
    }

    get position() {
        return {
            x: this._pos.x,
            y: this._pos.y
        };
    }

    get object() {
        return this._obj;
    }

    get objects() {
        return [this._obj];
    }

    get parts() {
        return [this];
    }

    get canColise() {
        return this._canColise === true;
    }

    get isColise() {
        return false;
    }

    get availableMoves() {
        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    move(direction) {
        this._pos = nextPosition(direction, this.position);
    }
}

class MovingObjectComposit {
    static isColise(part1, part2) {
        for (let i = 0; i < part1.parts.length; i++) {
            for (let j = 0; j < part2.parts.length; j++) {
                if (MovingObject.isColise(part1.parts[i], part2.parts[j])) {
                    return true;
                }
            }
        }

        return false;
    }

    constructor(objs, position, canColise, growDirection) {
        Helpers.throwIfStrictEqual(growDirection, Direction.NODIRECTION);
        Helpers.throwIfLess(objs.length, 1);

        this._objs = objs;

        this._movingObjs = [];
        let last = null;

        for (let i = 0; i < objs.length; i++) {
            this._movingObjs.push(new MovingObject(objs[i],
                last !== null ? nextPosition(growDirection, last.position) : position,
                canColise));
            last = this._movingObjs[this._movingObjs.length - 1];
        }
    }

    get position() {
        return this._movingObjs[0].position;
    }

    get object() {
        return this._objs[0];
    }

    get objects() {
        return this._objs;
    }

    get parts() {
        return this._movingObjs;
    }

    get availableMoves() {
        let head = this._movingObjs[0];
        let next = this._movingObjs[1];

        if (head.position.x === next.position.x) {
            if (head.position.y === next.position.y + 1) {
                return [Direction.RIGHT, Direction.DOWN, Direction.LEFT];
            }
            if (head.position.y === next.position.y - 1) {
                return [Direction.UP, Direction.RIGHT, Direction.LEFT];
            }
        }
        if (head.position.y === next.position.y) {
            if (head.position.x === next.position.x + 1) {
                return [Direction.UP, Direction.RIGHT, Direction.DOWN];
            }
            if (head.position.x === next.position.x - 1) {
                return [Direction.UP, Direction.DOWN, Direction.LEFT];
            }
        }

        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    move(direction) {
        let nextPosition = this.position;

        this._movingObjs[0].move(direction);

        for (let i = 1; i < this._movingObjs.length; i++) {
            let savedPosition = this._movingObjs[i].position;
            this._movingObjs[i]._pos = nextPosition;

            nextPosition = savedPosition;
        }

        if (!this.canColise && this.isColise) {
            throw new CollisionException();
        }
    }

    get isColise() {
        for (let i = 0; i < this.parts.length - 1; i++) {
            for (let j = i + 1; j < this.parts.length; j++) {
                if (MovingObject.isColise(this.parts[i], this.parts[j])) {
                    return true;
                }
            }
        }

        return false;
    }

    get canColise() {
        return this._movingObjs[0].canColise;
    }
}

class PartsMovingObject extends MovingObjectComposit {
    constructor(partsComposit, pos, canColise, growDirection) {
        super(partsComposit.parts, pos, canColise, growDirection);
    }
}