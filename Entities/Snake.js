// jshint esversion: 6

class IncorrectSnakePartException extends Error { }

var Direction = {
    UP: 1,
    RIGHT: 2,
    DOWN: 4,
    LEFT: 8,
    NODIRECTION: 16
};

function nextPosition(direction, position) {
    switch (direction) {
        case Direction.UP:
            return {
                x: position.x,
                y: position.y - 1
            };
        case Direction.RIGHT:
            return {
                x: position.x + 1,
                y: position.y
            };
        case Direction.DOWN:
            return {
                x: position.x,
                y: position.y + 1
            };
        case Direction.LEFT:
            return {
                x: position.x - 1,
                y: position.y
            };
        case Direction.NODIRECTION:
            return {
                x: position.x,
                y: position.y
            };
        default:
            throw new Error("unknown direction");
    }
}

class SnakePart {
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

    constructor(position) {
        Helpers.throwIfNotInteger(position.x);
        Helpers.throwIfNotInteger(position.y);

        this._pos = {
            x: position.x,
            y: position.y
        };

        this._nextPart = null;
    }

    get isLast() {
        return this.nextPart === null;
    }

    get position() {
        return {
            x: this._pos.x,
            y: this._pos.y
        };
    }

    get nextPart() {
        return this._nextPart;
    }

    set nextPart(nextPart) {
        this._checkNextPart(nextPart);

        this._nextPart = nextPart;
    }

    move(direction) {
        this._pos = nextPosition(direction, this.position);
    }

    _checkNextPart(nextPart) {
        if (this.position.x === nextPart.position.x && Math.abs(this.position.y - nextPart.position.y) === 1 ||
            this.position.y === nextPart.position.y && Math.abs(this.position.x - nextPart.position.x) === 1 ||
            this.position.x === nextPart.position.x && this.position.y === nextPart.position.y) {
            return;
        }

        throw new IncorrectSnakePartException();
    }
}

class SnakeHead extends SnakePart {
    constructor(position) {
        super(position);
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class SnakeBody extends SnakePart {
    constructor(position) {
        super(position);
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class Snake {
    constructor(position, size, growDirection) {
        this._head = new SnakeHead(position);

        this._size = size;

        Helpers.throwIfNotInteger(this.size);
        Helpers.throwIfLess(this.size, 2);
        Helpers.throwIfStrictEqual(growDirection, Direction.NODIRECTION);

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

    get head() {
        return this._head;
    }

    get position() {
        return this.head.position;
    }

    move(direction) {
        var head = this.head;
        var part = this.head;

        while (part !== null) {
            part.move(direction);
            if (head !== part && SnakePart.isColise(head, part)) {
                throw new IncorrectSnakePartException("colission detected");
            }
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
        lastPart.nextPart = new SnakeBody(nextPosition(direction, lastPart.position));
    }
}

var EmptySnake = new Snake({ x: 0, y: 0 }, 2);