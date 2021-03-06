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

        let self = this;

        eventDispatcher.subscribe("movingObjectUpdated", params => {
            if (this._movingSnake.parts[0] === params.sender) {
                self._renderBody(params.object,
                    self._movingSnake.parts[self._movingSnake.parts.length - 1],
                    self._scene);
            }
        });
    }

    render(scene) {
        this._bodies = [];
        this._head = null;
        this._scene = scene;

        for (let i = 0; i < this._movingSnake.parts.length; i++) {
            let part = this._movingSnake.parts[i];
            let next = i < this._movingSnake.parts.length - 1 ? this._movingSnake.parts[i + 1]
                : this._movingSnake.parts[i - 1];

            if (part.object instanceof SnakeHead) {
                this._renderHead(part, scene);
            } else if (part.object instanceof SnakeBody) {
                this._renderBody(part, next, scene);
            } else {
                throw new Error("unknown snake part");
            }
        }
    }

    _renderHead(head, scene) {
        let size = SnakeRenderer.SIZE;

        let geometry = new THREE.BoxBufferGeometry(size, size, size);
        let texture = new THREE.TextureLoader().load("textures/snake.jpg");        
        let material = ThreeHelpers.createMaterial({
            map: texture
        });
        this._head = new THREE.Mesh(geometry, material);
        this._head.castShadow = true;

        this._updateHead(head);

        scene.add(this._head);
    }

    _renderBody(body, next, scene) {
        let size = SnakeRenderer.SIZE;

        let geometry = new THREE.BoxBufferGeometry(size, size, size);
        let texture = new THREE.TextureLoader().load("textures/snake.jpg");                
        let material = ThreeHelpers.createMaterial({ 
            map: texture
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        this._bodies.push({ body: body, mesh: mesh });

        this._updateBody(body, next);

        scene.add(mesh);
    }

    update(scene) {
        for (let i = 0; i < this._movingSnake.parts.length; i++) {
            let part = this._movingSnake.parts[i];
            let next = i < this._movingSnake.parts.length - 1 ? this._movingSnake.parts[i + 1]
                : this._movingSnake.parts[i - 1];

            if (part.object instanceof SnakeHead) {
                this._updateHead(part, scene);
            } else if (part.object instanceof SnakeBody) {
                this._updateBody(part, next, scene);
            } else {
                throw new Error("unknown snake part");
            }
        }
    }

    _updateHead(head) {
        let mapSize = MapRenderer.SIZE;

        this._head.position.set(head.position.x * mapSize, head.position.y * mapSize, mapSize / 2);
        this._head.rotation.set(0, Math.PI / 4, Math.PI / 4);
    }

    _updateBody(body, next) {
        let mapSize = MapRenderer.SIZE;

        let dPos = {
            dx: body.position.x - next.position.x,
            dy: body.position.y - next.position.y,
        };

        let mesh = this._bodies.filter(obj => obj.body === body)[0].mesh;
        mesh.position.set(body.position.x * mapSize, body.position.y * mapSize, mapSize / 2);
        mesh.rotation.set(Math.PI / 4 * dPos.dx, Math.PI / 4 * dPos.dy, 0);
    }
}