// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(640, 480);

    function startGame() {
        let gameMap = new GameMap(15, 15);

        let snake = new Snake(5);
        let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, false, Direction.LEFT);

        let food = new GoodFood();
        let movingFood = new MovingObject(food, { x: 6, y: 5 }, true);

        let gameObjects = new GameFactory3D().create({
            movingSnake: movingSnake,
            gameMap: gameMap,
            food: movingFood,
            realSnake: snake
        });

        let renderers = CONFIG.debug ? [gameObjects.snake, gameObjects.map, gameObjects.food]
            : [gameObjects.snake, gameObjects.camera, gameObjects.map, gameObjects.food];

        gameObjects.player.subscribe();

        let controller = new GameController([gameObjects.player],
            renderers, threeProxy, CONFIG.speed);

        if (CONFIG.debug) {
            threeProxy.addTrackball();
            gameObjects.camera.render(threeProxy);
        }

        let lightFactory = new LightFactory();
        lightFactory.createLight(gameMap).forEach(light => {
            threeProxy.add(light);
        });
    }

    let scoreRegistrator = new ScoreRegistrator();

    $("#startGame").click(function () {
        startGame();

        $("#menu").hide();
    });

    $("#showScores").click(function () {
        $("#menu").hide();
        $("#scores").show();

        console.log(scoreRegistrator.getScores());
    });

    window.onerror = function (msg, url, line, col, error) {
        if (error instanceof GameOverError) {
            let snake = error.loser;
            scoreRegistrator.register(snake.parts.length);

            threeProxy.dispose();

            $("#menu").show();
        }
    };
})();