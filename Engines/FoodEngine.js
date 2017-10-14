// jshint esversion: 6

class FoodEngine {
    constructor(food, mapWidth, mapHeight) {
        if (!(food instanceof MovingObject)) {
            throw new Error("expected moving food");            
        }

        this._food = food;
        this._mapWidth = mapWidth;
        this._mapHeight = mapHeight;

        let self = this;

        eventDispatcher.subscribe("foodAccepted", (params) => {
            if (params.food === params.food) {
                self.update();
            }
        });
    }

    update() {
        this._food._pos.x = Math.floor(Math.random() * this._mapWidth);
        this._food._pos.y = Math.floor(Math.random() * this._mapHeight);
    }

    get food() {
        return this._food;
    }

    dispose() {
        // ToDo: add dispose
    }
}