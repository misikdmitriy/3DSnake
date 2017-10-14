// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let gameMap = new GameMap(15, 15);

    let snake = new Snake(5);
    let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, false, Direction.LEFT);

    let food = new GoodFood();
    let movingFood = new MovingObject(food, { x: 6, y: 5 }, true);

    let gameObjects = new GameFactory3D().create({
        movingSnake: movingSnake,
        gameMap: gameMap,
        food: movingFood
    });

    let renderers = CONFIG.debug ? [gameObjects.snake, gameObjects.map, gameObjects.food]
        : [gameObjects.snake, gameObjects.camera, gameObjects.map, gameObjects.food];

    gameObjects.player.subscribe();

    let controller = new GameController([gameObjects.player],
        renderers, threeProxy);

    if (CONFIG.debug) {
        threeProxy.addTrackball();
        gameObjects.camera.render(threeProxy);
    }

    let lightFactory = new LightFactory();
    lightFactory.createLight(gameMap).forEach(light => {
        threeProxy.add(light);
    });
})();