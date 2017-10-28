// jshint esversion: 6

class LightFactory {
    constructor() { }

    createLight(gameMap) {
        let size = MapRenderer.SIZE;

        if (!(gameMap instanceof GameMap)) {
            throw new Error("expected GameMap");
        }

        let result = [];

        result.push(ThreeHelpers.createDirectionalLight(0xffffff, 0.7, 1,
            size * gameMap.width / 2, size * gameMap.height / 2, size * 10));

        result.push(ThreeHelpers.createDirectionalLight(0xffffff, 0.7, 1,
            size * gameMap.width / 4, size * gameMap.height / 4, size * 2));

        result.push(new THREE.DirectionalLightHelper(result[0], 5));

        // for (let i = 0; i < gameMap.width; i += 5) {
        //     for (let j = 0; j < gameMap.height; j += 5) {
        //         result.push(ThreeHelpers.createDirectionalLight(0xffffff, 1.5, 30, 
        //             i * size, j * size, size));
        //     }
        // }

        return result;
    }
}