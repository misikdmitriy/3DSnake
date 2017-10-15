// jshint esversion: 6

class FoodEngine {
    constructor(food, map) {
        if (!(food instanceof MovingObject)) {
            throw new Error("expected moving food");
        }

        this._food = food;
        this._map = map;

        let self = this;

        eventDispatcher.subscribe("foodAccepted", (params) => {
            if (params.food === params.food) {
                self.update();
            }
        });
    }

    update() {
        let updated = false;
        while (!updated) {
            this._food._pos.x = Math.floor(Math.random() * this._map.width);
            this._food._pos.y = Math.floor(Math.random() * this._map.height);

            updated = this._map.objectsOn(this._food.position.x, this._food.position.y).length === 0;
        }
    }

    get food() {
        return this._food;
    }

    dispose() {
        // ToDo: add dispose
    }
}