import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class Load3DModel {
  constructor(
    elementId = "model",
    modelPath = "../../can.glb",
    scaleX = 8,
    scaleY = 8,
    scaleZ = 8,
    cameraField = 7,
    rotationAxises = ["y"],
    rotationSensitivity = 0.01,
    modelPosX = -0.5,
    modelPosY = 0.515,
    modelPosZ = 0,
    positionSensitivity = 0.01,
    direction = "top"
  ) {
    /* CREATE SCENE */
    const scene = new THREE.Scene();
    scene.background = null; // SET BACKGROUND TO NULL

    /* CREATE CAMERA & SET PERSPECTIVES */
    const camera = new THREE.PerspectiveCamera(
      cameraField,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10); // SET CAMERA POSITION

    /* CREATE RENDERER & SET SIZE & APPEND TO ELEMENT */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(elementId).appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    const clock = new THREE.Clock();

    let model;
    let modelMoving = false;
    let modelStopTimeout;
    let scrollDirection = "";
    let prevScrollY = 0;

    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      scene.add(model);
      model.scale.set(scaleX, scaleY, scaleZ);
      model.position.set(modelPosX, modelPosY, modelPosZ);

      const positionAnimationDuration = 10; // ANIMATION DURATION TIME
      let targetPosition = ""; // CREATE ANIMATION TARGET LATER - DIRECTION SPECIFIC
      let positionAnimationStartTime = 0;
      let isPositionAnimating = false;

      document.addEventListener("scroll", () => {
        /* YOU CAN ADD SOME PROPERY TO THE OBJECT MODEL */
        const objectModel = document.getElementById(elementId);
        /*  */
        const scrollY = window.scrollY;
        /* ROTATE MODEL BY SCROLL AMOUNT */
        const scrollAmount = scrollY - prevScrollY;

        rotationAxises.map((axis) => {
          if (axis === "x") model.rotation.x += rotationSensitivity;
          if (axis === "y") model.rotation.y += rotationSensitivity;
          if (axis === "z") model.position.z -= rotationSensitivity * 0.01;
        });

        modelMoving = true;
        if (modelMoving) {
          scrollDirection = scrollY > prevScrollY ? "down" : "up";
          if (direction === "top") {
            if (scrollDirection === "down") {
              // SCROLL DOWN

              model.position.y -= positionSensitivity;

              if (scrollY > 0 && model.position.y > 0.4) {
                if (!isPositionAnimating) {
                  targetPosition = new THREE.Vector3(-0.8, -0.55, 0);
                  isPositionAnimating = true;
                  positionAnimationStartTime = Date.now();
                  model.rotation.y += 20;
                  model.position.z += 0.1;
                }
              }

              if (model.position.y < -0.2) {
                targetPosition = new THREE.Vector3(0.9, -1.3, 0);
                isPositionAnimating = true;
                positionAnimationStartTime = Date.now();
                model.rotation.y += 20;
                model.position.z += 0.1;
              }

              /* ADD SOME ANIMATIONS IF YOU NEED */
              // objectModel.style.animation = `translateModel 2s linear`;
            } else {
              // SCROLL UP

              model.position.y += positionSensitivity;

              if (model.position.y < -0.15) {
                targetPosition = new THREE.Vector3(-0.8, -0.55, 0);
                isPositionAnimating = true;
                positionAnimationStartTime = Date.now();
                model.rotation.y += 20;
              }

              if (scrollY === 0) {
                targetPosition = new THREE.Vector3(
                  modelPosX,
                  modelPosY,
                  modelPosZ
                );
                isPositionAnimating = true;
                positionAnimationStartTime = Date.now();
                model.rotation.y += 20;
              }
            }
          }
          if (direction === "left") {
            if (scrollDirection === "down") {
              // SCROLL DOWN
            } else {
              // SCROLL UP
            }
          }
        }

        clearTimeout(modelStopTimeout);
        modelStopTimeout = setTimeout(() => {
          modelMoving = false;
        }, 100);
        prevScrollY = scrollY;
      });

      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        mixer.update(delta);

        /* ANIMATE 3D MODEL  */
        if (isPositionAnimating) {
          const elapsedAnimationTime =
            (Date.now() - positionAnimationStartTime) / 1000;
          const completedAnimationTime =
            (Date.now() - positionAnimationStartTime) / 150;
          if (completedAnimationTime < positionAnimationDuration) {
            const progress = elapsedAnimationTime / positionAnimationDuration;
            model.position.lerp(targetPosition, progress);
          } else {
            // ANIMATION COMPLETED
            console.log("Animation completed");
            model.position.copy(targetPosition);
            isPositionAnimating = false;
          }
        }

        renderer.render(scene, camera);
      }
      /* ADD SOME LIGHT TO SEE 3D MODEL */
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);

      scene.add(directionalLight);

      const mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      animate();
    });
  }
}

export default Load3DModel;
