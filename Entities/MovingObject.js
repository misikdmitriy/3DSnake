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

    move(direction) {
        this._pos = nextPosition(direction, this.position);
    }
}

class MovingObjectComposit extends MovingObject {
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
        return this._movingObjs[0].position;
    }

    get object() {
        return this._objs[0];
    }

    get objects() {
        return this._objs;
    }

    move(direction) {
        let nextPosition = {
            x: this._movingObjs[0].position.x,
            y: this._movingObjs[0].position.y
        };

        this._movingObjs[0].move(direction);

        for (let i = 1; i < this._movingObjs.length; i++) {
            let savedPosition = this._movingObjs[i].position;
            this._movingObjs[i]._pos = nextPosition;

            nextPosition = {
                x: savedPosition.x,
                y: savedPosition.y
            };
        }
    }
}