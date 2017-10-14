// jshint esversion: 6

class GameFactory2D {
    create(params) {
        let player = new PlayerController(document, DefaultControls, Direction.NODIRECTION);
        player.object = params.movingSnake;
        player.map = params.gameMap;

        let foodEngine = new FoodEngine(params.food, params.gameMap.width, params.gameMap.height);
        foodEngine.update();

        player.addFood(foodEngine);

        params.gameMap.addObject(params.food);

        return {
            "camera": new CameraRenderer2D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": new FoodRenderer(params.food),
        };
    }
}

class GameFactory3D {
    create(params) {
        let player = new Player3DController(document, Default3DControls, Direction.RIGHT);
        player.object = params.movingSnake;
        player.map = params.gameMap;

        let foodEngine = new FoodEngine(params.food, params.gameMap.width, params.gameMap.height);
        foodEngine.update();
        
        player.addFood(foodEngine);

        params.gameMap.addObject(params.food);

        return {
            "camera": new CameraRenderer3D(params.movingSnake),
            "player": player,
            "snake": new SnakeRenderer(params.movingSnake, params.gameMap),
            "map": new MapRenderer(params.gameMap),
            "food": new FoodRenderer(params.food)
        };
    }
}