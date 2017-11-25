// jshint esversion: 6

let assert = require("assert");
let chai = require("chai");

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

    it("addObject should add objects", function () {
        let pos = { x: 5, y: 5 };
        let obj1 = new MovingObject(null, pos);
        let obj2 = new MovingObject(null, pos);
        let map = new GameMap(15, 15);

        map.addObject(obj1);
        map.addObject(obj2);
    });

    it("addObject should add objects 2", function () {
        let pos = { x: 5, y: 5 };
        let obj1 = new MovingObject(null, pos);
        let obj2 = new MovingObjectComposit([{}], pos, Direction.LEFT);
        let map = new GameMap(15, 15);

        map.addObject(obj1);
        map.addObject(obj2);
    });

    it("addObject should throw error 1", function () {
        let pos = { x: 5, y: 20 };
        let obj1 = new MovingObject(null, pos);
        let map = new GameMap(25, 15);

        let act = function () { map.addObject(obj1); };
        chai.expect(act).to.throw();
    });

    it("addObject should throw error 2", function () {
        let pos = { x: 5, y: 2 };
        let obj1 = new MovingObject(null, pos);
        let map = new GameMap(3, 25);

        let act = function () { map.addObject(obj1); };
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

    it("objects should return all map objects 1", function() {
        let pos1 = { x: 3, y: 1 };
        let pos2 = { x: 4, y: 2 };

        let obj1 = new MovingObjectComposit([{}, {}, {}], pos1, Direction.DOWN);
        let obj2 = new MovingObjectComposit([{}, {}, {}, {}, {}], pos2, Direction.RIGHT);
        let map = new GameMap(13, 25);

        map.addObject(obj1);
        map.addObject(obj2);

        let objs = map.objects;

        assert(objs.length === 8);
        assert(objs.indexOf(obj1.parts[0]) !== -1);
        assert(objs.indexOf(obj1.parts[1]) !== -1);
        assert(objs.indexOf(obj1.parts[2]) !== -1);
        assert(objs.indexOf(obj2.parts[0]) !== -1);
        assert(objs.indexOf(obj2.parts[1]) !== -1);
        assert(objs.indexOf(obj2.parts[2]) !== -1);
        assert(objs.indexOf(obj2.parts[3]) !== -1);
        assert(objs.indexOf(obj2.parts[4]) !== -1);
    });

    it("objects should return all map objects 2", function() {
        let pos = { x: 3, y: 1 };

        let obj1 = new MovingObject(null, pos);
        let obj2 = new MovingObject(null, pos);
        let map = new GameMap(10, 10);

        map.addObject(obj1);
        map.addObject(obj2);

        let objs = map.objects;

        assert(objs.length === 2);
        assert(objs.indexOf(obj1) !== -1);
        assert(objs.indexOf(obj2) !== -1);
    });

    it("objectsOn should return array", function() {
        let pos = { x: 3, y: 1 };

        let obj1 = new MovingObject(null, pos);
        let obj2 = new MovingObject(null, pos);
        let map = new GameMap(10, 10);

        map.addObject(obj1);
        map.addObject(obj2);

        let objs = map.objectsOn(pos.x, pos.y);

        assert(objs.length === 2);
        assert(objs.indexOf(obj1) !== -1);
        assert(objs.indexOf(obj2) !== -1);
    });

    it("objectsOn should return empty array", function() {
        let map = new GameMap(10, 10);

        let objs = map.objectsOn(1, 1);

        assert(objs.length === 0);
    });

    it("isEmpty should return true", function() {
        let map = new GameMap(10, 10);

        assert(map.isEmpty(1, 1) === true);
    });

    it("isEmpty should return true", function() {
        let pos = { x: 3, y: 1 };
        let obj1 = new MovingObject(null, pos);
        let map = new GameMap(10, 10);

        map.addObject(obj1);

        assert(map.isEmpty(pos.x, pos.y) === false);
    });
});    