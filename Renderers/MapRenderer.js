// jshint esversion: 6

class MapRenderer {
    static get SIZE() {
        return 5;
    }

    constructor(map) {
        if (!(map instanceof GameMap)) {
            throw new Error("expects GameMap");
        }

        this._map = map;
    }

    render(scene) {
        let size = MapRenderer.SIZE;

        let deltaX = -this._map.width * size / 2;
        let deltaY = -this._map.height * size / 2;
        let deltaColor = (0xff0000 - 0x00ff00) / this._map.height;

        let texture = new THREE.TextureLoader().load("textures/map.jpg");
        let geometry = new THREE.BoxGeometry(size, size, size);
        this._cubes = [];

        for (let i = 0; i < this._map.height; i++) {
            let material = new THREE.MeshStandardMaterial({
                map: texture,
                color: deltaColor * (i + 1)
            });

            for (let j = 0; j < this._map.width; j++) {

                let cube = new THREE.Mesh(geometry, material);
                cube.position.set(size * j + deltaX, size * i + deltaY, 0);
                scene.add(cube);
                this._cubes.push(cube);
            }
        }
    }

    update(scene) {
        // empty
    }
}