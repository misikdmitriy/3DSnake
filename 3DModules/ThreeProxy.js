// jshint esversion: 6 

class ThreeProxy {
    constructor(width, height) {
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);



        this.animate();
    }

    animate() {
        let self = this;

        let innerAnimate = function () {
            requestAnimationFrame(innerAnimate);
            
            if (self.trackballControls) {
                var delta = self.clock.getDelta();
                self.trackballControls.update(delta);
            }

            self.renderer.render(self.scene, self.camera);
        };

        innerAnimate();
    }

    addMesh(mesh) {
        this.scene.add(mesh);
    }

    addTrackball() {
        this.trackballControls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this.clock = new THREE.Clock();

        this.trackballControls.target.set(0, 0, 0);
        this.trackballControls.rotateSpeed = 1.0;
        this.trackballControls.zoomSpeed = 1.0;
        this.trackballControls.panSpeed = 1.0;
        this.trackballControls.staticMoving = true;
    }

    addLight(light) {
        this.scene.add(light);
    }

    setCameraPosition(x, y, z) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }
}