// jshint esversion: 6

var assert = require("assert");
var fs = require("fs");
var vm = require("vm");
var chai = require("chai");

var pathes = ["./Helpers/Helpers.js", "./Entities/MovingObject.js", "./Entities/GameMap.js"];

pathes.forEach(function (path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code);
});

describe("GameMap tests", function () {
    it("constructor should create instance 1", function () {
        new GameMap();
    });

    it("constructor should create instance 2", function () {
        new GameMap(15);
    });

    it("constructor should create instance 3", function () {
        new GameMap(15, 20);
    });

    it("constructor should throw error 1", function () {
        let act = function () { new GameMap(-1, 20); };
        chai.expect(act).to.throw();
    });

    it("constructor should throw error 2", function () {
        let act = function () { new GameMap(1, -2); };
        chai.expect(act).to.throw();
    });

    it("width and height should return them", function () {
        let width = 16;
        let height = 19;
        let map = new GameMap(width, height);

        assert(map.width === width);
        assert(map.height === height);
    });

    it("addObject should do it without errors", function () {
        let pos = { x: 5, y: 5 };
        let obj = new MovingObject(null, pos);
        let map = new GameMap(15, 15);

        map.addObject(obj);
    });

    it("addObject should add if collision allowed", function () {
        let pos = { x: 5, y: 5 };
        let obj1 = new MovingObject({ canColise: true }, pos);
        let obj2 = new MovingObject({ canColise: true }, pos);
        let map = new GameMap(15, 15);

        map.addObject(obj1);
        map.addObject(obj2);
    });

    it("addObject should add if collision allowed 2", function () {
        let pos = { x: 5, y: 5 };
        let obj1 = new MovingObject({ canColise: true }, pos);
        let obj2 = new MovingObjectComposit([{ canColise: true }], pos, Direction.LEFT);
        let map = new GameMap(15, 15);

        map.addObject(obj1);
        map.addObject(obj2);
    });

    it("addObject should throw error 1", function () {
        let pos = { x: 5, y: 20 };
        let obj1 = new MovingObject({ canColise: true }, pos);
        let map = new GameMap(25, 15);

        let act = function () { map.addObject(obj1); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 2", function () {
        let pos = { x: 5, y: 2 };
        let obj1 = new MovingObject({ canColise: true }, pos);
        let map = new GameMap(3, 25);

        let act = function () { map.addObject(obj1); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 3", function () {
        let pos = { x: 5, y: 2 };
        let obj1 = new MovingObject({ canColise: true }, pos);
        let obj2 = new MovingObject({ canColise: false }, pos);
        let map = new GameMap(13, 25);

        let act = function () { map.addObject(obj1); map.addObject(obj2); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 4", function () {
        let pos = { x: 5, y: 2 };
        let obj1 = new MovingObject({ canColise: false }, pos);
        let obj2 = new MovingObject({ canColise: true }, pos);
        let map = new GameMap(13, 25);

        let act = function () { map.addObject(obj1); map.addObject(obj2); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 5", function () {
        let pos1 = { x: 3, y: 2 };
        let pos2 = { x: 1, y: 2 };
        let obj = { canColist: false };

        let obj1 = new MovingObject(obj, pos1);
        let obj2 = new MovingObjectComposit([obj, obj, obj, obj, obj], pos2, Direction.RIGHT);
        let map = new GameMap(13, 25);

        let act = function () { map.addObject(obj1); map.addObject(obj2); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 6", function () {
        let pos1 = { x: 3, y: 1 };
        let pos2 = { x: 1, y: 2 };
        let obj = { canColist: false };

        let obj1 = new MovingObjectComposit([obj, obj, obj], pos1, Direction.DOWN);
        let obj2 = new MovingObjectComposit([obj, obj, obj, obj, obj], pos2, Direction.RIGHT);
        let map = new GameMap(13, 25);

        let act = function () { map.addObject(obj1); map.addObject(obj2); };
        chai.expect(act).to.throw();
    });

    it("remove should do it", function () {
        let pos = { x: 3, y: 3 };
        let obj = new MovingObject(null, pos);
        let map = new GameMap(10, 10);
        map.addObject(obj);

        assert(map.removeObject(obj) === true);
    });

    it("remove should do nothing", function () {
        let map = new GameMap(10, 10);

        assert(map.removeObject(new MovingObject(null, { x: 3, y: 4 })) === false);
    });

    it("replace should do it", function () {
        let pos = { x: 3, y: 3 };
        let obj = new MovingObject(null, pos);
        let map = new GameMap(10, 10);
        map.addObject(obj);

        assert(map.replaceObject(obj) === true);
    });

    it("replace should do nothing", function () {
        let map = new GameMap(10, 10);

        assert(map.replaceObject(new MovingObject(null, { x: 3, y: 4 })) === false);
    });

    it("replace should throw error", function () {
        let pos1 = { x: 3, y: 1 };
        let pos2 = { x: 4, y: 2 };
        let obj = { canColist: false };

        let obj1 = new MovingObjectComposit([obj, obj, obj], pos1, Direction.DOWN);
        let obj2 = new MovingObjectComposit([obj, obj, obj, obj, obj], pos2, Direction.RIGHT);
        let map = new GameMap(13, 25);

        map.addObject(obj1);
        map.addObject(obj2);

        obj2.move(Direction.LEFT);
        let act = function () { map.replaceObject(obj2); };

        chai.expect(act).to.throw();
    });
});    