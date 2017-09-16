// jshint esversion: 6

let assert = require("assert");
let chai = require("chai");

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

    it("canColise should return true", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos, true);

        assert(obj.canColise === true);
    });

    it("canColise should return false", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObject(null, pos, false);

        assert(obj.canColise === false);
    });

    it("parts should return array with this", function () {
        let pos = { x: 3, y: 4 };
        let obj = new MovingObject(null, pos);

        assert(obj.parts[0] === obj);
    });

    it("isColise should return false", function () {
        let pos = { x: 3, y: 4 };
        let obj = new MovingObject(null, pos);

        assert(obj.isColise === false);
    });

    it("availableMoves should return all moves", function () {
        let pos = { x: 3, y: 4 };
        let obj = new MovingObject(null, pos);

        let moves = obj.availableMoves;

        assert(moves.length === 4);
    });
});

describe("Moving objects composit tests", function () {
    it("constructor shpuld not fail", function () {
        let composit = new MovingObjectComposit([{}], { x: 5, y: 6 }, false, Direction.UP);
    });

    it("constructor should fail", function () {
        let act = function () { new MovingObjectComposit([], { x: 5, y: 6 }, false, Direction.NODIRECTION); };
        chai.expect(act).to.throw();
    });

    it("position should return it", function () {
        let pos = { x: 5, y: 6 };
        let composit = new MovingObjectComposit([{}], pos, true, Direction.UP);
        assert(composit.position.x == pos.x);
        assert(composit.position.y == pos.y);
    });

    it("object should return first object", function () {
        let objs = [{}];
        let composit = new MovingObjectComposit(objs, { x: 5, y: 6 }, true, Direction.UP);

        assert(composit.object === objs[0]);
    });

    it("objects should return array", function () {
        let objs = [{}, {}, {}];
        let composit = new MovingObjectComposit(objs, { x: 5, y: 6 }, true, Direction.UP);

        assert(composit.objects.length === objs.length);
    });

    it("move should replace main", function () {
        let objs = [{}, {}];
        let pos = { x: 4, y: 0 };
        let composit = new MovingObjectComposit(objs, pos, true, Direction.LEFT);
        composit.move(Direction.UP);

        assert(composit.position.x === pos.x);
        assert(composit.position.y === pos.y - 1);
    });

    it("move should throw exception if collision detected", function () {
        let pos = { x: 4, y: 0 };
        let composit = new MovingObjectComposit([{}, {}, {}], pos, false, Direction.RIGHT);

        let act = function () { composit.move(Direction.RIGHT); };

        chai.expect(act).to.throw();
    });

    it("canColise should return true", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObjectComposit([{}], pos, true, Direction.LEFT);

        assert(obj.canColise === true);
    });

    it("canColise should return false", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObjectComposit([{}], pos, false, Direction.LEFT);

        assert(obj.canColise === false);
    });

    it("isColise should return false", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObjectComposit([{}], pos, false, Direction.RIGHT);

        assert(obj.isColise === false);
    });

    it("isColise should return true", function () {
        let pos = { x: 1, y: 2 };
        let obj = new MovingObjectComposit([{}, {}, {}, {}, {}], pos, true, Direction.RIGHT);

        obj.move(Direction.UP);
        obj.move(Direction.RIGHT);
        obj.move(Direction.DOWN);

        assert(obj.isColise === true);
    });
});

describe("PartsMovingObject tests", function () {
    it("constructor should create composit", function () {
        let snake = new Snake(4);
        let obj = new PartsMovingObject(snake, { x: 1, y: 1 }, true, Direction.UP);

        assert(obj instanceof MovingObjectComposit);
        assert(obj.objects.length === snake.parts.length);
        assert(obj.objects[0] === snake.parts[0]);
    });
});