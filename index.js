// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let gameMap = new GameMap(50, 50);
    let mapRenderer = new MapRenderer(gameMap);
    let snake = new Snake(5);
    let movingSnake = new PartsMovingObject(snake, { x: 5, y: 5 }, false, Direction.LEFT);
    let snakeRenderer = new SnakeRenderer(movingSnake);
    let cameraRenderer = new CameraRenderer3D(movingSnake);

    mapRenderer.render(threeProxy);
    snakeRenderer.render(threeProxy);
    cameraRenderer.render(threeProxy);

    if (CONFIG.debug) {
        threeProxy.addTrackball();
    }

    let lightFactory = new LightFactory();
    lightFactory.createLight(gameMap).forEach(light => {
        threeProxy.add(light);
    });
})();