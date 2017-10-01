// jshint esversion: 6

let ThreeHelpers = {
    createDirectionalLight : function(color, intensity, x, y, z) {
        let light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        return light;
    },

    createPointLight: function(color, intensity, distance, x, y, z) {
        let light  = new THREE.PointLight(color, intensity, distance);
        light.position.set(x, y, z);
        return light;
    },

    createMaterial: function(params) {
        return new THREE.MeshLambertMaterial(params);
    }
};