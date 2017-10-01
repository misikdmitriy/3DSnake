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

        let geometry = new THREE.BoxGeometry(size, size, size);
        this._cubes = [];

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        for (let i = 0; i < this._map.height; i++) {
            let material = ThreeHelpers.createMaterial({
                color: getRandomColor()
            });

            for (let j = 0; j < this._map.width; j++) {

                let cube = new THREE.Mesh(geometry, material);
                cube.position.set(size * j, size * i, 0);
                scene.add(cube);
                this._cubes.push(cube);
            }
        }
    }

    update() {
        // empty
    }
}