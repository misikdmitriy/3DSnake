// jshint esversion: 6

class GameController {
    static get BOOST() {
        return 0.98;
    }

    constructor(controllers, renderers, scene, speed) {
        this._controllers = controllers;
        this._renderers = renderers;
        this._scene = scene;
        this._speed = speed;

        let self = this;

        renderers.forEach(renderer => {
            renderer.render(scene);
        });

        this._tact = function () {
            self._controllers.forEach(controller => {
                controller.move();
            });

            self._renderers.forEach(renderer => {
                renderer.update();
            });
        };

        this._timer = setInterval(this._tact, this._speed);

        this._foodAcceptedListener = params => {
            self.accelerate();
        };

        this._gameOverListener = params => {
            self.dispose();
        };

        eventDispatcher.subscribe("foodAccepted", this._foodAcceptedListener);
        eventDispatcher.subscribe("gameOver", this._gameOverListener);
    }

    accelerate() {
        clearInterval(this._timer);
        this._speed *= GameController.BOOST;
        this._timer = setInterval(this._tact, this._speed);
    }

    dispose() {
        clearInterval(this._timer);

        this._controllers.forEach(controller => {
            controller.dispose();
        });

        eventDispatcher.unsubscribe("foodAccepted", this._foodAcceptedListener);
        eventDispatcher.unsubscribe("gameOver", this._gameOverListener);
    }
}