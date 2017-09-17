// jshint esversion: 6

class GameController {
    constructor(controllers, renderers, scene) {
        this._controllers = controllers;
        this._renderers = renderers;
        this._scene = scene;

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

        setInterval(this._tact, CONFIG.speed);
    }

    dispose() {
        clearInterval(this._tact);

        controllers.forEach(controller => {
            controller.dispose();
        });
    }
}