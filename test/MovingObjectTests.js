// jshint esversion: 6

var assert = require("assert");
var fs = require("fs");
var vm = require("vm");
var chai = require("chai");

var pathes = ["./Helpers/Helpers.js", "./Entities/Direction.js", "./Entities/MovingObject.js"];

pathes.forEach(function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code);
});

describe("Moving object tests", function () {
    it("constructor should not fail", function () {
        let obj = new MovingObject(null, { x: 1, y: 2 });
    });

    it("constructor should throw error 1", function () {
        let act = function () { new MovingObject(null, { x: 1.5, y: 2 }); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 2", function () {
        let act = function () { new MovingObject(null, { x: 1, y: 2.3 }); };
        chai.expect(act).to.throw();
    });

    it("position should return it", function () {
        let pos = { x: 43, y: 56 };
        let obj = new MovingObject(null, pos);

        let result = obj.position;

        assert(result.x === pos.x);
        assert(result.y === pos.y);
    });

    it("object should return reference to aggregated object", function () {
        let aggregate = {};
        let obj = new MovingObject(aggregate, { x: 1, y: 2 });

        assert(obj.object === aggregate);
    });

    it("move should move up", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos);
        obj.move(Direction.UP);

        assert(obj.position.x === pos.x);
        assert(obj.position.y === pos.y - 1);
    });

    it("move should move down", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos);
        obj.move(Direction.DOWN);

        assert(obj.position.x === pos.x);
        assert(obj.position.y === pos.y + 1);
    });

    it("move should move left", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos);
        obj.move(Direction.LEFT);

        assert(obj.position.x === pos.x - 1);
        assert(obj.position.y === pos.y);
    });

    it("move should move right", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos);
        obj.move(Direction.RIGHT);

        assert(obj.position.x === pos.x + 1);
        assert(obj.position.y === pos.y);
    });

    // TODO: finish tests
});