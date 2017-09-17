// jshint esversion: 6

class SnakeRenderer {
    static get SIZE() {
        return 5;
    }

    constructor(movingSnake) {
        if (!(movingSnake instanceof MovingObjectComposit)) {
            throw new Error("expected Snake");
        }

        this._movingSnake = movingSnake;
    }

    render(scene) {
        this._bodies = [];
        this._head = null;

        this._movingSnake.parts.forEach(part => {
            if (part.object instanceof SnakeHead) {
                this._renderHead(part, scene);
            } else if (part.object instanceof SnakeBody) {
                this._renderBody(part, scene);
            } else {
                throw new Error("unknown snake part");
            }
        });
    }

    _renderHead(head, scene) {
        let radius = SnakeRenderer.SIZE / 2;

        let texture = new THREE.TextureLoader().load("textures/snakehead.jpg");
        let geometry = new THREE.SphereGeometry(radius, 32, 32);
        let material = ThreeHelpers.createMaterial({ map: texture });
        this._head = new THREE.Mesh(geometry, material);

        this._updateHead(head);

        scene.add(this._head);
    }

    _renderBody(body, scene) {
        let radius = SnakeRenderer.SIZE / 2;

        let geometry = new THREE.SphereGeometry(radius, 32, 32);
        let material = ThreeHelpers.createMaterial({ color: 0x00ff00 });
        let mesh = new THREE.Mesh(geometry, material);
        this._bodies.push({ body: body, mesh: mesh });

        this._updateBody(body);

        scene.add(mesh);
    }

    update() {
        this._movingSnake.parts.forEach(part => {
            if (part.object instanceof SnakeHead) {
                this._updateHead(part);
            } else if (part.object instanceof SnakeBody) {
                this._updateBody(part);
            } else {
                throw new Error("unknown snake part");
            }
        });
    }

    _updateHead(head) {
        let mapSize = MapRenderer.SIZE;

        this._head.position.set(head.position.x * mapSize, head.position.y * mapSize, mapSize / 2);
    }

    _updateBody(body) {
        let mapSize = MapRenderer.SIZE;

        let mesh = this._bodies.filter(obj => obj.body === body)[0].mesh;
        mesh.position.set(body.position.x * mapSize, body.position.y * mapSize, mapSize / 2);
    }
}