// jshint esversion: 6

class LightFactory {
    constructor() { }

    createLight(gameMap) {
        // ToDo: impl
        
        if (!(gameMap instanceof GameMap)) {
            throw new Error("expected GameMap");
        }

        return [ThreeHelpers.createDirectionalLight(0xffffff, 0.5, 15, 0, 0),
                ThreeHelpers.createDirectionalLight(0xffffff, 0.5, -15, 0, 0),
                ThreeHelpers.createDirectionalLight(0xffffff, 0.5, 0, 15, 0),
                ThreeHelpers.createDirectionalLight(0xffffff, 0.5, 0, -15, 0),
                ThreeHelpers.createDirectionalLight(0xffffff, 0.5, 0, 0, 15),
                ThreeHelpers.createDirectionalLight(0xffffff, 0.5, 0, 0, -15)];
    }
}