// jshint esversion: 6

class IncorrectSnakePartException extends Error { }

class SnakePart {
    constructor() {
        this._nextPart = null;
    }

    get isLast() {
        return this.nextPart === null;
    }

    get nextPart() {
        return this._nextPart;
    }

    set nextPart(nextPart) {
        this._checkNextPart(nextPart);

        this._nextPart = nextPart;
    }

    _checkNextPart(nextPart) {
        // empty
    }
}

class SnakeHead extends SnakePart {
    constructor() {
        super();
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class SnakeBody extends SnakePart {
    constructor() {
        super();
    }

    _checkNextPart(nextPart) {
        super._checkNextPart(nextPart);

        if (nextPart instanceof SnakeHead) {
            throw new IncorrectSnakePartException();
        }
    }
}

class Snake {
    constructor(size) {
        this._head = new SnakeHead();

        this._size = size;

        Helpers.throwIfNotInteger(this.size);
        Helpers.throwIfLess(this.size, 2);

        for (let i = 1; i < this.size; i++) {
            this._addPart();
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

    get parts() {
        let array = [];
        let part = this.head;

        while (part !== null) {
            array.push(part);
            part = part.nextPart;
        }

        return array;
    }

    incrementSnake(direction) {
        this._size++;
        this._addPart(direction);
    }

    _addPart(direction) {
        this.last.nextPart = new SnakeBody();
    }
}

var EmptySnake = new Snake(2);