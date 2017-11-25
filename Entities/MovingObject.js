// jshint esversion: 6

class CollisionException extends Error { 
    constructor(loser) {
        super();
        this._loser = loser;
        eventDispatcher.publish("gameOver");        
    }

    get loser() {
        return this._loser;
    }
}

class MovingObject {
    constructor(obj, position) {
        Helpers.throwIfNotInteger(position.x);
        Helpers.throwIfNotInteger(position.y);

        this._pos = {
            x: position.x,
            y: position.y
        };

        this._obj = obj;
        this._memento = new Memento();
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

    get availableMoves() {
        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    move(direction) {
        this._memento.state = { x: this._pos.x, y: this._pos.y };
        this._pos = nextPosition(direction, this.position);
    }

    resetPosition() {
        this._pos = this._memento.state;
    }

    dispose() {
        // empty method
    }
}

class MovingObjectComposit {
    constructor(objs, position, growDirection) {
        Helpers.throwIfStrictEqual(growDirection, Direction.NODIRECTION);
        Helpers.throwIfLess(objs.length, 1);

        this._objs = objs;

        this._movingObjs = [];
        let last = null;

        for (let i = 0; i < objs.length; i++) {
            this._movingObjs.push(new MovingObject(objs[i],
                last !== null ? nextPosition(growDirection, last.position) : position));
            last = this._movingObjs[this._movingObjs.length - 1];
        }

        let self = this;

        this._objectUpdated = params => {
            if (params.sender === self.object) {
                self._movingObjs.push(new MovingObject(params.object,
                    nextPosition(growDirection,
                        self._movingObjs[self._movingObjs.length - 1].position)));

                eventDispatcher.publish("movingObjectUpdated", {
                    sender: self.parts[0],
                    object: self._movingObjs[self._movingObjs.length - 1]
                });
            }
        };

        eventDispatcher.subscribe("objectUpdated", this._objectUpdated);
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
        if (direction === Direction.NODIRECTION) {
            return;
        }

        let nextPosition = this.position;

        this._movingObjs[0].move(direction);

        for (let i = 1; i < this._movingObjs.length; i++) {
            let savedPosition = this._movingObjs[i].position;
            this._movingObjs[i]._pos = nextPosition;

            this._movingObjs[i]._memento.state = savedPosition;
            nextPosition = savedPosition;
        }
    }

    resetPosition() {
        for (let i = 0; i < this._movingObjs.length; i++) {
            this._movingObjs[i].resetPosition();
        }
    }

    dispose() {
        eventDispatcher.unsubscribe("objectUpdated", this._objectUpdated);        
    }
}

class PartsMovingObject extends MovingObjectComposit {
    constructor(partsComposit, pos, growDirection) {
        super(partsComposit.parts, pos, growDirection);
    }
}