const companionConfig = {
  enabled: true,
  name: "Volt",
  size: 86,
  speechEnabled: true,
  physicsEnabled: true,
  idleAnimations: true,
  physics: {
    gravity: 980,
    friction: 0.985,
    airResistance: 0.994,
    bounce: 0.48,
    maxSpeed: 1350,
    settleSpeed: 42,
  },
  safeArea: {
    top: 92,
    edge: 14,
    bottom: 24,
  },
};

export default companionConfig;
