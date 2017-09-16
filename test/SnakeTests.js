// jshint esversion: 6

var assert = require("assert");
var fs = require("fs");
var vm = require("vm");
var chai = require("chai");

var pathes = ["./Helpers/Helpers.js", "./Entities/Direction.js", "./Entities/Snake.js"];

pathes.forEach(function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code);
});

describe("Snake tests", function () {
    it("constructor should not fail", function () {
        new Snake(4);
    });

    it("constructor should throw error 1", function () {
        let act = function () { new Snake(4.5); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 2", function () {
        let act = function () { new Snake(-1); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 3", function () {
        let act = function () { new Snake(1); };
        chai.expect(act).to.throw();
    });

    it("constructor should create snake with one head", function () {
        let snake = new Snake(5);
        let part = snake.head;

        assert(part instanceof SnakeHead);
        part = part.nextPart;

        while (part !== null) {
            assert(part instanceof SnakeBody);
            part = part.nextPart;
        }
    });

    it("constructor should create snake with correct size", function () {
        let snake = new Snake(5);
        assert(snake.size === 5);
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

    it("parts should return array", function() {
        let snake = new Snake(5);
        let parts = snake.parts;
        
        assert(parts.length === 5);

        for (let i = 0; i < 5; i++) {
            assert(parts[i] instanceof SnakeHead || parts[i] instanceof SnakeBody);
        }
    });

    it("canColise should return false", function() {
        let snake = new Snake(5);
        assert(snake.canColise === false);        
    });
});