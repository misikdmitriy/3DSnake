// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(640, 480);

    function startGame() {
        let gameMap = new GameMap(15, 15);

        let snake = new Snake(5);
        let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, Direction.LEFT);

        let food = new GoodFood();
        let poison = new PoisonFood();

        let movingFood = new MovingObject(food, { x: 6, y: 5 });
        let movingPosion = new MovingObject(poison, { x: 6, y: 6 });

        let gameObjects = new GameFactory2D().create({
            movingSnake: movingSnake,
            gameMap: gameMap,
            food: movingFood,
            poison: movingPosion,
            realSnake: snake
        });

        let renderers = CONFIG.debug ? [gameObjects.snake, gameObjects.map, gameObjects.food, 
            gameObjects.poison]
            : [gameObjects.snake, gameObjects.camera, gameObjects.map, gameObjects.food, 
                gameObjects.poison];

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

        let scores = scoreRegistrator.scores;

        $("#scores").empty();

        if (scores && scores.length) {
            for (let i = 0; i < scores.length; i++) {
                $("#scores").append('<span class="score">' + i + '. ' + scores[i] + '</span>');
            }
        }
        else {
            $("#scores").append('<span class="score">No scores</span>');
        }

        $("#scores").append('<span id="quit">Back</span>');
        $("#quit").click(function() {
            $("#menu").show();
            $("#scores").hide();
        });
    });

    $("#resetScores").click(function() {
        scoreRegistrator.removeAll();
    });

    window.onerror = function (msg, url, line, col, error) {
        if (error instanceof GameOverError || error instanceof CollisionException) {
            scoreRegistrator.register(error.size);

            threeProxy.dispose();

            $("#menu").show();
        }
    };
})();