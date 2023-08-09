import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const myModel = "../../assets/glbtest.glb";

const scene = new THREE.Scene();
scene.background = null; // Set the scene background to null for transparency
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Set alpha to true for transparency
renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.4);
document.getElementById("container").appendChild(renderer.domElement);

const loader = new GLTFLoader();
const clock = new THREE.Clock(); // Initialize the clock

let model;
const mouseMovement = new THREE.Vector2();
let modelMoving = false;
let modelStopTimeout;

loader.load(myModel, (gltf) => {
  model = gltf.scene;
  scene.add(model);

  // Check the model's size and position
  model.scale.set(0.1, 0.1, 0.1);
  model.position.set(0, 0, -5); // Move the model along the negative z-axis

  // Check the model's animations
  const mixer = new THREE.AnimationMixer(model);
  gltf.animations.forEach((clip) => {
    mixer.clipAction(clip).play();
  });

  // Check for lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // document.addEventListener("wheel", (event) => {
  //   const sensitivity = 0.05; // Adjust the sensitivity to control scaling speed

  //   // Detect the scroll direction (positive for scrolling up, negative for scrolling down)
  //   const scrollDirection = Math.sign(event.deltaY);

  //   // Update the model scale based on the scroll direction
  //   model.rotation.y += scrollDirection * sensitivity;
  //   modelMoving = true;

  //   // Set a timeout to stop the model after a brief delay (adjust the delay as needed)
  //   clearTimeout(modelStopTimeout);
  //   modelStopTimeout = setTimeout(() => {
  //     modelMoving = false;
  //   }, 100);
  // });

  const container = document.querySelector(".container");

  let scrollPosition = 0;
  let rotationValue = 0;

  document.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const scrollAmount = scrollTop - scrollPosition;
    scrollPosition = scrollTop;

    const sensitivity = 0.005; // Adjust the sensitivity to control the model's movement speed

    // Move the model along the y-axis based on the scroll amount
    model.position.z += scrollAmount * sensitivity;

    // Rotate the model around the y-axis based on the scroll amount
    model.rotation.y += scrollAmount * sensitivity;

    rotationValue += scrollAmount * sensitivity;
    modelMoving = true;

    // Set a timeout to stop the model after a brief delay (adjust the delay as needed)
    clearTimeout(modelStopTimeout);
    modelStopTimeout = setTimeout(() => {
      modelMoving = false;
    }, 100);

    // if (modelMoving) {
    //   container.style.animation = `moveCircle 6s linear infinite, rotateCircle 10s linear infinite`;
    // }
  });

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    mixer.update(delta);

    // Move the model in the y-direction when the wheel is moving
    // if (modelMoving) {
    //   const speed = 0.01;
    //   model.position.x += speed;
    // }
    renderer.render(scene, camera);
  }

  animate();
});

camera.position.set(0, 0, 10);
