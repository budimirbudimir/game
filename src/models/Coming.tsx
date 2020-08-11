import React, { useState, useRef } from "react";
import { useFrame } from 'react-three-fiber'
import { useSpring } from "react-spring/three";
// import { a } from "react-spring/three";

interface ComingProps {
  children: any
  size?: number
}

// on click, it toggles it's children position up and down
export const Coming = ({ size = 1, ...props }: ComingProps) => {
  const group = useRef(null)

  const [clicked, set] = useState(false);
  const { position } = useSpring({ position: clicked ? size : -size });
  // get the half size to position it on top
  const halfSize = size / 2;
  const toggle = () => set((i: boolean) => !i);

  // useFrame(() => {
  //   if (group && group.current && group.current.position) group.current.position.z += 0.01
  // })

  return (
    <group
      {...props}
      ref={group}
      onPointerDown={toggle}
      // position={position.interpolate((s: number) => [0, s, halfSize])}
    >
      {props.children}
    </group>
  );
}
