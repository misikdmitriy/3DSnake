// jshint esversion: 6

class LightFactory {
    constructor() { }

    createLight(gameMap) {
        let size = MapRenderer.SIZE;
        
        if (!(gameMap instanceof GameMap)) {
            throw new Error("expected GameMap");
        }

        let result = [];

        for (let i = 0; i < gameMap.width; i += 5) {
            for (let j = 0; j < gameMap.height; j += 5) {
                result.push(ThreeHelpers.createPointLight(0xffffff, 1.5, 30, 
                    i * size, j * size, size));
            }
        }

        return result;
    }
}