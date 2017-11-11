// jshint esversion: 6

class LightFactory {
    constructor() { }

    createLight(gameMap) {
        let size = MapRenderer.SIZE;

        if (!(gameMap instanceof GameMap)) {
            throw new Error("expected GameMap");
        }

        let result = [];

        let light1 = ThreeHelpers.createDirectionalLight(0xffee88, 1, 1,
            size * gameMap.width / 2, size * gameMap.height / 2, size);
        let light2 = ThreeHelpers.createDirectionalLight(0xffffff, 1, 1,
            size * gameMap.width / 2, size * gameMap.height / 2, size);

        light2.rotation.set(Math.PI / 4, Math.PI / 4, 0);

        result.push(light1);
        result.push(light2);

        return result;
    }
}