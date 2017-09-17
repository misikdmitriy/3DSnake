// jshint esversion: 6

let ThreeHelpers = {
    createDirectionalLight : function(color, intensity, x, y, z) {
        var light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        return light;
    },

    createMaterial: function(params) {
        return new THREE.MeshLambertMaterial(params);
    }
};