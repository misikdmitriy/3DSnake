// jshint esversion: 6

let ThreeHelpers = {
    createPointLight : function(color, intensity, x, y, z) {
        let light = new THREE.PointLight(color, intensity, 200, 2);
        light.position.set(x, y, z);
        light.castShadow = true;
        return light;
    },

    createMaterial: function(params) {
        return new THREE.MeshLambertMaterial(params);
    }
};