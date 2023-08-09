import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

class ThreeDim {
  constructor() {
    /**
     * @name Scene
     * @description Create a new Scene object.
     * @remarks — This is where you place objects, lights and cameras.
     */
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Add an ambient light
    /**
     * @name AmbientLight
     * @description Creates a new AmbientLight.
     * @param color — Numeric value of the RGB component of the color. Default 0xffffff
     * @param intensity — Numeric value of the light's strength/intensity. Expects a Float. Default 1
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(ambientLight);

    /**
     * @name PerspectiveCamera
     * @description Creates a new PerspectiveCamera.
     * @remarks — Together these define the camera's viewing frustum.
     * @param fov — Camera frustum vertical field of view. Default 50.
     * @param aspect — Camera frustum aspect ratio. Default 1.
     * @param near — Camera frustum near plane. Default 0.1.
     * @param far — Camera frustum far plane. Default 2000.
     **/
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5); // Sets value of this vector.
    this.camera.lookAt(0, 0, 0); // Rotates the object to face a point in world space.
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);
  }

  /**
   * @name Mesh
   * @description A mesh is an object that takes a geometry, and applies a material to it.
   * @description We can insert the mesh to our scene, and move freely around.
   * @remarks — Together these define the camera's viewing frustum.
   * @param geometry — An instance of BufferGeometry. Default new THREE.BufferGeometry().
   * @param material — A single or an array of Material. Default new THREE.MeshBasicMaterial().
   **/

  box(properties) {
    const material = new THREE.MeshBasicMaterial({ color: properties.color });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, material);
    this.animate(cube, properties.rotation);
  }

  square(properties) {
    const material = new THREE.LineBasicMaterial({ color: properties.color });
    const points = [];
    points.push(new THREE.Vector3(-1, 1, 0));
    points.push(new THREE.Vector3(1, 1, 0));
    points.push(new THREE.Vector3(1, -1, 0));
    points.push(new THREE.Vector3(-1, -1, 0));
    points.push(new THREE.Vector3(-1, 1, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    this.animate(line, properties.rotation);
  }

  animate(mesh, rotationOfMesh = null) {
    this.scene.add(mesh); // Add mesh to scene to see it
    const animate = () => {
      if (rotationOfMesh != null) {
        let angle = rotationOfMesh.angle;
        rotationOfMesh.direction.forEach((direction) => {
          if (direction === "x") mesh.rotation.x += angle;
          else if (direction === "y") mesh.rotation.y += angle;
          else if (direction === "z") mesh.rotation.z += angle;
        });
      }
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    if (WebGL.isWebGLAvailable()) {
      animate();
    } else {
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById("container").appendChild(warning);
    }
  }
}

export default ThreeDim;
