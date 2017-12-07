// jshint esversion: 6 

class ThreeFacade {
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

    dispose() {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    }

    add(obj) {
        this.scene.add(obj);
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
}