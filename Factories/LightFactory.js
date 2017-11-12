// jshint esversion: 6

class LightFactory {
    constructor() { }

    createLight(gameMap) {
        let size = MapRenderer.SIZE;

        if (!(gameMap instanceof GameMap)) {
            throw new Error("expected GameMap");
        }

        let result = [];

        let light1 = ThreeHelpers.createPointLight(0xffee88, 1, 1,
            size * gameMap.width / 2, size * gameMap.height / 2, size * 5);
        let light2 = ThreeHelpers.createPointLight(0xffffee, 0.5, 1,
            size * 0, size * gameMap.height, size * 5);
        let light3 = ThreeHelpers.createPointLight(0xffffee, 0.5, 1,
            size * gameMap.width, size * gameMap.height, size * 5);
        let light4 = ThreeHelpers.createPointLight(0xffffee, 0.5, 1,
            size * 0, size * 0, size * 5);
        let light5 = ThreeHelpers.createPointLight(0xffffee, 0.5, 1,
            size * gameMap.width, size * 0, size * 5);

        result.push(light1);
        result.push(light2);
        result.push(light3);
        result.push(light4);
        result.push(light5);

        return result;
    }
}