// jshint esversion: 6

var assert = require("assert");
var fs = require("fs");
var vm = require("vm");
var chai = require("chai");

var pathes = ["./Helpers/Helpers.js", "./Entities/Snake.js"];

pathes.forEach(function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code);
});

describe("Snake tests", function () {
    it("constructor should not fail", function () {
        new Snake({ x: 1, y: 5 }, 4, Direction.LEFT);
    });

    it("constructor should throw error 1", function () {
        let act = function () { new Snake({ x: 1, y: 1 }, 4.5); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 2", function () {
        let act = function () { new Snake({ x: 1, y: 1 }, 4, 42); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 3", function () {
        let act = function () { new Snake({ x: 1, y: 1 }, -1); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 4", function () {
        let act = function () { new Snake({ x: 1.1, y: 1 }, 2); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 5", function () {
        let act = function () { new Snake({ x: 1, y: 1.5 }, 2); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 6", function () {
        let act = function () { new Snake({ x: 1, y: 1 }, 1); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 7", function () {
        let act = function () { new Snake({ x: 1, y: 1.5 }, 2, Direction.NODIRECTION); };
        chai.expect(act).to.throw();
    });

    it("constructor should create snake with one head", function () {
        let snake = new Snake({ x: 0, y: 0 }, 5);
        let part = snake.head;

        assert(part instanceof SnakeHead);
        part = part.nextPart;

        while (part !== null) {
            assert(part instanceof SnakeBody);
            part = part.nextPart;
        }
    });

    it("constructor should create snake with correct size", function () {
        let snake = new Snake({ x: 0, y: 0 }, 5);
        assert(snake.size === 5);
    });

    it("constructor should place snake left", function () {
        let pos = { x: 3, y: 0 };
        let snake = new Snake(pos, 2, Direction.LEFT);
        let part = snake.head;

        for (let i = 0; i < 2; i++) {
            assert(part.position.x === pos.x - i);
            assert(part.position.y === pos.y);
            part = part.nextPart;
        }
    });

    it("constructor should place snake right", function () {
        let pos = { x: 3, y: 0 };
        let snake = new Snake(pos, 2, Direction.RIGHT);
        let part = snake.head;

        for (let i = 0; i < 2; i++) {
            assert(part.position.x === pos.x + i);
            assert(part.position.y === pos.y);
            part = part.nextPart;
        }
    });

    it("constructor should place snake up", function () {
        let pos = { x: 3, y: 0 };
        let snake = new Snake(pos, 2, Direction.UP);
        let part = snake.head;

        for (let i = 0; i < 2; i++) {
            assert(part.position.x === pos.x);
            assert(part.position.y === pos.y - i);
            part = part.nextPart;
        }
    });

    it("constructor should place snake down", function () {
        let pos = { x: 3, y: 0 };
        let snake = new Snake(pos, 2, Direction.DOWN);
        let part = snake.head;

        for (let i = 0; i < 2; i++) {
            assert(part.position.x === pos.x);
            assert(part.position.y === pos.y + i);
            part = part.nextPart;
        }
    });

    it("last should return it", function() {
        let snake = EmptySnake;
        let last = snake.last;

        assert(last.nextPart === null);
    });

    it("head should return it", function() {
        let snake = EmptySnake;
        let head = snake.head;

        assert(head instanceof SnakeHead);
    });

    it("position should return head position", function() {
        let pos = {x: 5, y: 14};
        let snake = new Snake(pos, 6);
        let head = snake.head;

        assert(head.position.x === snake.position.x);
        assert(head.position.y === snake.position.y);
    });

    it("move should move left", function() {
        let pos = {x: 5, y: 14};
        let snake = new Snake(pos, 6, Direction.RIGHT);
        snake.move(Direction.LEFT);
        let part = snake.head;

        assert(snake.position.x === pos.x - 1);
        assert(snake.position.y === pos.y);

        for (let i = 0; i < 6; i++) {
            assert(part.position.x === pos.x + i - 1);
            assert(part.position.y === pos.y);

            part = part.nextPart;
        }
    });

    it("move should move right", function() {
        let pos = {x: 5, y: 14};
        let snake = new Snake(pos, 6, Direction.LEFT);
        snake.move(Direction.RIGHT);
        let part = snake.head;

        assert(snake.position.x === pos.x + 1);
        assert(snake.position.y === pos.y);

        for (let i = 0; i < 6; i++) {
            assert(part.position.x === pos.x - i + 1);
            assert(part.position.y === pos.y);

            part = part.nextPart;
        }
    });

    it("move should move up", function() {
        let pos = {x: 5, y: 14};
        let snake = new Snake(pos, 6, Direction.DOWN);
        snake.move(Direction.UP);
        let part = snake.head;

        assert(snake.position.x === pos.x);
        assert(snake.position.y === pos.y - 1);

        for (let i = 0; i < 6; i++) {
            assert(part.position.x === pos.x);
            assert(part.position.y === pos.y + i - 1);

            part = part.nextPart;
        }
    });

    it("move should move down", function() {
        let pos = {x: 5, y: 14};
        let snake = new Snake(pos, 6, Direction.UP);
        snake.move(Direction.DOWN);
        let part = snake.head;

        assert(snake.position.x === pos.x);
        assert(snake.position.y === pos.y + 1);

        for (let i = 0; i < 6; i++) {
            assert(part.position.x === pos.x);
            assert(part.position.y === pos.y - i + 1);

            part = part.nextPart;
        }
    });
});