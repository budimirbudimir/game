import * as THREE from "three";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";

interface BirdProps {
  speed: number
  factor: number
  position: [number, number, number]
}

interface GLTFProps {
  scene: any
}

// https://github.com/react-spring/gltfjsx
export const Bird = ({ speed, factor, ...props }: BirdProps) => {
  const mesh = useRef();
  const gltf: GLTFProps = useLoader(GLTFLoader, './Parrot.glb', draco());
  // const mixer = useMemo(() => new THREE.AnimationMixer(), [])
  // useEffect(
  //   () => void mixer.clipAction(gltf.animations[0], group.current).play(),
  //   []
  // );
  // useFrame((state, delta) => {
  //   mixer.update(delta * speed);
  // });

  return (
    <primitive
      {...props}
      ref={mesh}
      object={gltf.scene}
      // position={[0, 0, 0]}
      // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={() => setActive(!active)}
      // onPointerOver={() => setHover(true)}
      // onPointerOut={() => setHover(false)}
    />
  );
}
