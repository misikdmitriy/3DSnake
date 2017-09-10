// jshint esversion: 6

class IncorrectSnakePartException { }

var Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 4,
    NODIRECTION: 8
};

function nextPosition(direction, pos) {
    switch (direction) {
        case Direction.UP:
            return {
                x: pos.x,
                y: pos.y - 1
            };
        case Direction.RIGHT:
            return {
                x: pos.x + 1,
                y: pos.y
            };
        case Direction.DOWN:
            return {
                x: pos.x,
                y: pos.y + 1
            };
        case Direction.LEFT:
            return {
                x: pos.x - 1,
                y: pos.y
            };
        case Direction.NODIRECTION:
            return {
                x: pos.x,
                y: pos.y
            };
        default:
            throw new Error("unknown direction");
    }
}

class SnakePart {
    constructor(pos) {
        Helpers.throwIfNotInteger(pos.x);
        Helpers.throwIfNotInteger(pos.y);

        this.pos = {
            x: pos.x,
            y: pos.y
        };

        this.nextPart = null;
    }

    get isLast() {
        return this.nextPart === null;
    }

    setNextPart(nextPart) {
        this._checkNextPart(nextPart);

        this.nextPart = nextPart;
    }

    move(direction) {
        this.pos = nextPosition(direction, this.pos);
    }

    _checkNextPart(nextPart) {
        if (this.pos.x === nextPart.pos.x && Math.abs(this.pos.y - nextPart.pos.y) === 1 ||
            this.pos.y === nextPart.pos.y && Math.abs(this.pos.x - nextPart.pos.x) === 1 ||
            this.pos.x === nextPart.pos.x && this.pos.y === nextPart.pos.y) {
            return;
        }

        throw new IncorrectSnakePartException();
    }
}

class SnakeHead extends SnakePart {
    constructor(pos) {
        super(pos);
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class SnakeBody extends SnakePart {
    constructor(pos) {
        super(pos);
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class Snake {
    constructor(pos, size, growDirection) {
        this.head = new SnakeHead(pos);
        this._size = size || 4;

        Helpers.throwIfNotPositive(this.size);
        Helpers.throwIfNotInteger(this.size);

        this.position = {
            x: pos.x,
            y: pos.y
        };

        for (let i = 1; i < this.size; i++) {
            this._addPart(growDirection || Direction.LEFT);
        }
    }

    get last() {
        let lastPart = this.head;

        while (lastPart.nextPart !== null) {
            lastPart = lastPart.nextPart;
        }

        return lastPart;
    }

    get size() {
        return this._size;
    }

    get position() {
        return {
            x: this.head._pos.x,
            y: this.head._pos.y
        };
    }

    set position(pos) {
        this._pos = {};
        this._pos.x = pos.x;
        this._pos.y = pos.y;
    }

    move(direction) {
        var part = this.head;

        while (part !== null) {
            part.move(direction);
            part = part.nextPart;
        }
    }

    incrementSnake(direction) {
        this._size++;
        this._addPart(direction);
    }

    _addPart(direction) {
        direction = direction || Direction.NODIRECTION;
        var lastPart = this.last;
        lastPart.setNextPart(new SnakeBody(nextPosition(direction, lastPart.pos)));
    }
}