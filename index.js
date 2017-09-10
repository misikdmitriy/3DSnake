// jshint esversion: 6

(function () {
    "use strict";

    let threeProxy = new ThreeProxy(600, 400);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);

    threeProxy.addMesh(cube);
    threeProxy.setCameraPosition(0, 0, 5);
})();