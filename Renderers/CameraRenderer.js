// jshint esversion: 6

class CameraRenderer3D {
    constructor(movingSnake) {
        if (!(movingSnake instanceof MovingObjectComposit)) {
            throw new Error("expected Snake");
        }

        this._movingSnake = movingSnake;
    }

    render(scene) {
        this._camera = scene.camera;
        this.update();
    }

    update() {
        let mapSize = MapRenderer.SIZE;
        let snakeSize = SnakeRenderer.SIZE;

        let head = this._movingSnake.parts.filter(part => part.object instanceof SnakeHead)[0];

        this._camera.position.set(head.position.x * mapSize, head.position.y * mapSize, 1.5 * mapSize);
        this._camera.up = new THREE.Vector3(0, 0, 1);
        // this._camera.lookAt(new THREE.Vector3())
    }
}