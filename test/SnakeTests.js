// jshint esversion: 6

var assert = require("assert");
var fs = require("fs");
var vm = require("vm");
var chai = require("chai");

var pathes = ["./Entities/Snake.js", "./Helpers/Helpers.js"];

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
        let act = function () { new Snake({ x: 1.1, y: 1 }, 1); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 5", function () {
        let act = function () { new Snake({ x: 1, y: 1.5 }, 1); };
        chai.expect(act).to.throw();
    });

    it("constructor should create snake with one head", function () {
        let snake = new Snake({ x: 0, y: 0 }, 5, Direction.RIGHT);
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
});