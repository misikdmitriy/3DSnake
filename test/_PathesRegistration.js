// jshint esversion: 6

let fs = require("fs");
let vm = require("vm");

let pathes = ["./Helpers/Helpers.js", "./Entities/MovingObject.js", "./Entities/GameMap.js",
    "./Entities/Direction.js", "./Entities/Food.js", "./Entities/Snake.js",
    "./Controllers/PlayerListener.js"];

pathes.forEach(function (path) {
    let code = fs.readFileSync(path);
    vm.runInThisContext(code);
});

describe("Init tests", function(){});