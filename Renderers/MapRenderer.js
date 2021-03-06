// jshint esversion: 6

class MapRenderer {
    static get SIZE() {
        return 5;
    }

    static get HEIGHT() {
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
            let texture = new THREE.TextureLoader().load("textures/grass.jpg");

            let material = ThreeHelpers.createMaterial({
                // color: getRandomColor(),
                map: texture
            });

            for (let j = 0; j < this._map.width; j++) {

                let cube = new THREE.Mesh(geometry, material);
                cube.receiveShadow = true;
                cube.position.set(size * j, size * i, 0);
                scene.add(cube);
                this._cubes.push(cube);
            }
        }

        this.drawWall(scene);
    }

    drawWall(scene) {
        let size = MapRenderer.SIZE;
        var height = MapRenderer.HEIGHT;

        let geometry = new THREE.BoxGeometry(size, size, size);

        let texture = new THREE.TextureLoader().load("textures/wall.jpg");
        let material = ThreeHelpers.createMaterial({
            // color: 0xFFFFFF,
            map: texture
        });

        for (let i = 0; i < this._map.height; i++) {
            for (let j = 0; j < height; j++) {
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(-size, size * i, j * size);
                scene.add(mesh);
            }

            for (let j = 0; j < height; j++) {
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(this._map.width * size, size * i, j * size);
                scene.add(mesh);
            }
        }

        for (let i = 0; i < this._map.width; i++) {
            for (let j = 0; j < height; j++) {
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(size * i, -size, j * size);
                scene.add(mesh);
            }

            for (let j = 0; j < height; j++) {
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(size * i, size * this._map.height, j * size);
                scene.add(mesh);
            }
        }
    }

    update() {
        // empty
    }
}