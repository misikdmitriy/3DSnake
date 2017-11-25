// jshint esversion: 6

class FoodRenderer {
    constructor(food) {
        if (!(food instanceof MovingObject)) {
            throw new Error("expected moving food");
        }

        this._food = food;
    }

    render(scene) {
        let size = SnakeRenderer.SIZE / 2;

        let color = null;
        if (this._food.object instanceof GoodFood) {
            color = 0xFFFFFF;
        } else {
            color = 0xFF0000;
        }

        let geometry = new THREE.ConeGeometry(size, size * Math.tan(Math.PI / 3), 4);
        let material = ThreeHelpers.createMaterial({ color: color });
        this._mesh = new THREE.Mesh(geometry, material);

        scene.add(this._mesh);

        this.update();
    }

    update() {
        let size = MapRenderer.SIZE;

        this._mesh.position.set(this._food.position.x * size, this._food.position.y * size,
            size);
        this._mesh.rotation.set(0, Math.PI / 2, Math.PI / 2);
    }
}