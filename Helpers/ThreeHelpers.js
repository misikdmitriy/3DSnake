// jshint esversion: 6

let ThreeHelper = {
    createDirectionalLight : function(color, intensity, x, y, z) {
        var light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        return light;
    }
};