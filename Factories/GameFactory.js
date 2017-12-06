// jshint esversion: 6

class FoodFactory {
    createFood(food, gameMap) {
        let foodEngine = new FoodEngine(food, gameMap);
        foodEngine.update();
    }

    createRenderer(food) {
        return new FoodRenderer(food);
    }
}

class GameFactory2D {
    create(params) {
        let player = new PlayerController(document, DefaultControls, Direction.NODIRECTION, params);
        let foodFactory = new FoodFactory();
        
        foodFactory.createFood(params.food, params.gameMap);
        foodFactory.createFood(params.poison, params.gameMap);

        return {
            "camera": new CameraRenderer2D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": foodFactory.createRenderer(params.food),
            "poison": foodFactory.createRenderer(params.poison),
        };
    }
}

class GameFactory3D extends FoodFactory {
    create(params) {
        let player = new Player3DController(document, Default3DControls, Direction.RIGHT, params);
        let foodFactory = new FoodFactory();

        foodFactory.createFood(params.food, params.gameMap);
        foodFactory.createFood(params.poison, params.gameMap);

        return {
            "camera": new CameraRenderer3D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": foodFactory.createRenderer(params.food),
            "poison": foodFactory.createRenderer(params.poison),
        };
    }
}