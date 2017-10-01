// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let gameMap = new GameMap(50, 50);
    let mapRenderer = new MapRenderer(gameMap);
    
    let snake = new Snake(5);
    let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, false, Direction.LEFT);
    let snakeRenderer = new SnakeRenderer(movingSnake, gameMap);
    
    let cameraRenderer = new CameraRenderer2D(movingSnake);

    let player = new PlayerController(document, DefaultControls);
    player.object = movingSnake;
    player.map = gameMap;

    let renderers = CONFIG.debug ? [snakeRenderer, mapRenderer]
        : [snakeRenderer, cameraRenderer, mapRenderer];

    let controller = new GameController([player], 
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