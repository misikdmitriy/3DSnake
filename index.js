// jshint esversion: 6

(function () {
    "use strict";

    let threeFacade = new ThreeFacade(640, 480);

    function startGame() {
        let gameMap = new GameMap(15, 15);

        let snake = new Snake(5);
        let movingSnake = new PartsMovingObject(snake, { x: 4, y: 5 }, Direction.LEFT);

        let food = new GoodFood();
        let poison = new PoisonFood();

        let movingFood = new MovingObject(food, { x: 0, y: 0 });
        let movingPosion = new MovingObject(poison, { x: 0, y: 0 });

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
            renderers, threeFacade, CONFIG.speed);

        if (CONFIG.debug) {
            threeFacade.addTrackball();
            gameObjects.camera.render(threeFacade);
        }

        let lightFactory = new LightFactory();
        lightFactory.createLight(gameMap).forEach(light => {
            threeFacade.add(light);
        });

        let foodFactory = new FoodFactory();

        eventDispatcher.subscribe("foodAccepted", () => {
            let food = new PoisonFood();
            let movingFood = new MovingObject(food, { x: 0, y: 0 });
            foodFactory.createFood(movingFood, gameMap);
            controller.addRenderer(foodFactory.createRenderer(movingFood));
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
        $("#quit").click(function () {
            $("#menu").show();
            $("#scores").hide();
        });
    });

    $("#resetScores").click(function () {
        scoreRegistrator.removeAll();
    });

    window.onerror = function (msg, url, line, col, error) {
        if (error instanceof GameOverError || error instanceof CollisionException) {
            scoreRegistrator.register(error.size);

            threeFacade.dispose();

            $("#menu").show();

            eventDispatcher.drop();
        }
    };
})();