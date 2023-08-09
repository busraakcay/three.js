import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
// create scene
const scene = new THREE.Scene();

// where is the camera looking at
/**
 * @PerspectiveCamera
 *
 * @param1 field of view - extent of the scene - the value is in degrees
 * @param2 aspect ratio -  the width of the element divided by the height
 * @param3 near - @param4 far -> objects further away from the camera
 * than the value of far or closer than near won't be rendered
 */

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0); // Rotates the object to face a point in world space.

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 *  @MESH
 *  a mesh is an object that takes a geometry, and applies a material to it,
 *  which we then can insert to our scene, and move freely around.
 */

// Box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // how it looks
const cube = new THREE.Mesh(geometry, material); // this is our mesh

// Line - Blue
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-1, 1, 0));
points.push(new THREE.Vector3(1, 1, 0));
points.push(new THREE.Vector3(1, -1, 0));
points.push(new THREE.Vector3(-1, -1, 0));
points.push(new THREE.Vector3(-1, 1, 0));
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, lineMaterial);

//Line - Red
const lineMaterialRed = new THREE.LineBasicMaterial({ color: 0xfc0317 });
const pointsRed = [];
pointsRed.push(new THREE.Vector3(-1, 1, 0));
pointsRed.push(new THREE.Vector3(1, 1, 0));
pointsRed.push(new THREE.Vector3(1, -1, 0));
pointsRed.push(new THREE.Vector3(-1, -1, 0));
pointsRed.push(new THREE.Vector3(-1, 1, 0));
const lineGeometryRed = new THREE.BufferGeometry().setFromPoints(pointsRed);
const lineRed = new THREE.Line(lineGeometryRed, lineMaterialRed);

// add scene to see it
scene.add(line);
scene.add(lineRed);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // cube.rotation.z += 0.01;

  line.rotation.x += 0.01;
  // line.rotation.y += 0.01;
  // line.rotation.z += 0.01;

  // lineRed.rotation.x += 0.03;
  lineRed.rotation.y += 0.03;

  renderer.render(scene, camera);
}

// animate();
/**
 * check if it is supported and display a message to the user if it is not.
 * import the WebGL support detection module, and run the following
 * before attempting to render anything.
 */
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
