// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let gameMap = new GameMap(50, 50);

    let snake = new Snake(5);
    let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, false, Direction.LEFT);

    let gameObjects = new GameFactory2D().create({ movingSnake: movingSnake, gameMap: gameMap });

    let renderers = CONFIG.debug ? [gameObjects.snake, gameObjects.map]
        : [gameObjects.snake, gameObjects.camera, gameObjects.map];

    gameObjects.player.subscribe();

    let controller = new GameController([gameObjects.player],
        renderers, threeProxy);

    if (CONFIG.debug) {
        threeProxy.addTrackball();
        cameraRenderer.render(threeProxy);
    }

    let lightFactory = new LightFactory();
    lightFactory.createLight(gameMap).forEach(light => {
        threeProxy.add(light);
    });
})();