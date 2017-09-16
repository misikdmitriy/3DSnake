// jshint esversion: 6

class MovingObject {
    static isColise(part1, part2) {
        return part1.position.x === part2.position.x &&
            part1.position.y === part2.position.y;
    }

    static availableMoves(part1, part2) {
        if (part1.position.x === part2.position.x) {
            if (part1.position.y === part2.position.y + 1) {
                return [Direction.RIGHT, Direction.DOWN, Direction.LEFT];
            }
            if (part1.position.y === part2.position.y - 1) {
                return [Direction.UP, Direction.RIGHT, Direction.LEFT];
            }
        }
        if (part1.position.y === part2.position.y) {
            if (part1.position.x === part2.position.x + 1) {
                return [Direction.UP, Direction.RIGHT, Direction.DOWN];
            }
            if (part1.position.x === part2.position.x - 1) {
                return [Direction.UP, Direction.DOWN, Direction.LEFT];
            }
        }

        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    constructor(obj, position) {
        Helpers.throwIfNotInteger(position.x);
        Helpers.throwIfNotInteger(position.y);

        this._pos = {
            x: position.x,
            y: position.y
        };

        this._obj = obj;
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
        return this._obj.canColise;
    }

    move(direction) {
        this._pos = nextPosition(direction, this.position);
    }
}

class MovingObjectComposit {
    constructor(objs, position, growDirection) {
        Helpers.throwIfStrictEqual(growDirection, Direction.NODIRECTION);

        this._objs = objs;

        this._movingObjs = [];
        let last = null;

        for (let i = 0; i < objs.length; i++) {
            this._movingObjs.push(new MovingObject(objs[i],
                last !== null ? nextPosition(growDirection, last.position) : position));
            last = this._movingObjs[this._movingObjs.length - 1];
        }
    }

    get position() {
        return this._movingObjs.length > 0 ? this._movingObjs[0].position : null;
    }

    get object() {
        return this._objs.length > 0 ? this._objs[0] : null;
    }

    get objects() {
        return this._objs;
    }

    get parts() {
        return this._movingObjs;
    }

    move(direction) {
        let nextPosition = this.position;

        if (this._movingObjs.length > 0) {
            this._movingObjs[0].move(direction);
        }

        for (let i = 1; i < this._movingObjs.length; i++) {
            let savedPosition = this._movingObjs[i].position;
            this._movingObjs[i]._pos = nextPosition;

            nextPosition = savedPosition;
        }
    }

    get canColise() {
        return this._objs.reduce(function (prev, curr) {
            return prev && curr.canColise; 
        }, true);
    }
}