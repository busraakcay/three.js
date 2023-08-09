import Load3DModel from "./Load3DModel";

new Load3DModel(
  "model", // elementId
  "../../can.glb", // modelPath
  7, // scaleX
  7, // scaleY
  7, // scaleZ
  7, // cameraField
  ["y", "z"], // rotationAxises
  0.01, // rotationSensitivity
  -0.8, // modelPosX
  0.515, // modelPosY
  0, // modelPosZ
  0.01, // positionSensitivity
  "top" // direction
);

// new Load3DModel(
//   "model", // elementId
//   "../../can.glb", // modelPath
//   8, // scaleX
//   8, // scaleY
//   8, // scaleZ
//   7, // cameraField
//   ["y", "z"], // rotationAxises
//   0.01, // rotationSensitivity
//   -1.397, // modelPosX
//   -0.55, // modelPosY
//   0, // modelPosZ

//   0.08, // positionSensitivity
//   "left" // direction
// );
