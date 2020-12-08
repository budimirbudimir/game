import React, { useRef } from "react";
import { useThree, useFrame, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Controls
export const CONTROLS_DAMPING_FACTOR = 0.1;
export const CONTROLS_ROTATE_SPEED = 0.5;

extend({ OrbitControls });

export default function SceneControls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  // update the controls for damping

  // @ts-ignore
  useFrame(() => controls.current.update());

  // Enable damping and rotateSpeed to have a more natural feeling
  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={CONTROLS_DAMPING_FACTOR}
      rotateSpeed={CONTROLS_ROTATE_SPEED}
    />
  );
}
