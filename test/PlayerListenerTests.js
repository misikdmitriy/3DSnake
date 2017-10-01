// jshint esversion: 6

let assert = require("assert");
let chai = require("chai");
let jsdom = require('jsdom-global');

describe("PlayerController tests", function () {
    jsdom();

    it("constructor should add listeners", function () {
        let playerListener = new PlayerController(document, DefaultControls);
        let event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
    });

    it("event listener should be added", function () {
        let playerListener = new PlayerController(document, DefaultControls);
        let i = 0;
        playerListener.object = {
            move: function (dir) { i = dir; },
            availableMoves: [Direction.UP]
        };
        playerListener.map = {
            addObject: function () { },
            replaceObject: function () { return true; }
        };

        let event = new CustomEvent("keydown");
        event.keyCode = DefaultControls.UP;
        document.dispatchEvent(event);

        playerListener.move();

        assert(i === Direction.UP);
    });

    it("event listener should reset position", function () {
        let playerListener = new PlayerController(document, DefaultControls);
        let i = 0;
        playerListener.object = {
            move: function () { },
            availableMoves: [Direction.UP],
            resetPosition: function () { i++; }
        };
        playerListener.map = {
            addObject: function () { },
            replaceObject: function () { return false; }
        };

        let event = new CustomEvent("keydown");
        event.keyCode = DefaultControls.UP;
        document.dispatchEvent(event);

        let act = function () { playerListener.move(); };

        chai.expect(act).to.throw();        
        assert(i > 0);
    });
});