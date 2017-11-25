// jshint esversion: 6

class GameFactory2D {
    create(params) {
        let player = new PlayerController(document, DefaultControls, Direction.NODIRECTION, params);

        let foodEngine = new FoodEngine(params.food, params.gameMap);
        foodEngine.update();

        let posionEngine = new FoodEngine(params.poison, params.gameMap);
        posionEngine.update();

        return {
            "camera": new CameraRenderer2D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": new FoodRenderer(params.food),
            "poison": new FoodRenderer(params.poison),
        };
    }
}

class GameFactory3D {
    create(params) {
        let player = new Player3DController(document, Default3DControls, Direction.RIGHT, params);

        let foodEngine = new FoodEngine(params.food, params.gameMap);
        foodEngine.update();

        let posionEngine = new FoodEngine(params.poison, params.gameMap);
        posionEngine.update();

        return {
            "camera": new CameraRenderer3D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": new FoodRenderer(params.food),
            "poison": new FoodRenderer(params.poison),
        };
    }
}