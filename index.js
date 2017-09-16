// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let mapRenderer = new MapRenderer(new GameMap());

    mapRenderer.render(threeProxy.scene);

    threeProxy.setCameraPosition(0, 0, 50);

    threeProxy.addTrackball();

    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, 15, 0, 0));
    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, -15, 0, 0));
    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, 0, 15, 0));
    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, 0, -15, 0));
    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, 0, 0, 15));
    threeProxy.addLight(ThreeHelper.createDirectionalLight(0xffffff, 0.5, 0, 0, -15));
})();