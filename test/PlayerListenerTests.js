// jshint esversion: 6

let assert = require("assert");
let chai = require("chai");
let jsdom = require('jsdom-global');

describe("PlayerController tests", function () {
    jsdom();

    it("constructor should add listeners", function () {
        let playerListener = new PlayerController(document, DefaultControls, Direction.NODIRECTION,
            {
                gameMap: {
                    addObject: function () { }
                }
            });
        let event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
    });

    it("event listener should be added", function () {
        let i = 0;

        let playerListener = new PlayerController(document, DefaultControls, Direction.NODIRECTION,
            {
                gameMap: {
                    addObject: function () { },
                    replaceObject: function () { return true; },
                    objectsOn: function () { return []; }
                },
                movingSnake: {
                    move: function (dir) { i = dir; },
                    availableMoves: [Direction.UP],
                    position: { x: 1, y: 2 }
                }
            });
        playerListener.subscribe();

        let event = new CustomEvent("keydown");
        event.keyCode = DefaultControls.UP;
        document.dispatchEvent(event);

        playerListener.move();

        assert(i === Direction.UP);
    });

    it("event listener should reset position", function () {
        let i = 0;
        let playerListener = new PlayerController(document, DefaultControls, Direction.NODIRECTION,
            {
                gameMap: {
                    move: function () { },
                    availableMoves: [Direction.UP],
                    addObject: function () { },
                    resetPosition: function () { i++; },
                    replaceObject: function () { return false; }
                },
                movingSnake: {
                    move: function () { },
                    availableMoves: [Direction.UP],
                    resetPosition: function () { i++; }
                }
            });
        playerListener.subscribe();

        let event = new CustomEvent("keydown");
        event.keyCode = DefaultControls.UP;
        document.dispatchEvent(event);

        let act = function () { playerListener.move(); };

        chai.expect(act).to.throw();
        assert(i > 0);
    });
});