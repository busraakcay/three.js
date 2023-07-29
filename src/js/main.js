import ThreeDim from "./ThreeDim";

const threeDim = new ThreeDim();
threeDim.box({
  color: 0x00ff00,
  rotation: { direction: ["x", "y"], angle: 0.01 },
});
threeDim.square({
  color: 0x0000ff,
  rotation: { direction: ["x"], angle: 0.01 },
});
threeDim.square({
  color: 0xfc0317,
  rotation: { direction: ["y"], angle: 0.01 },
});

