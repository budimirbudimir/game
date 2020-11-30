import React, { useState } from "react";
import { useSpring } from "react-spring/three";
import { a } from "react-spring/three";

import { PlayerProps } from '../features/experience/experienceSlice'

export interface MovingProps {
  children: any
  size?: number
  handleUpdatePlayer: (player: PlayerProps) => void
  id: string
}

// on click, it toggles it's children position up and down
export const Moving = ({ size = 1, ...props }: MovingProps) => {
  const [clicked, set] = useState(false);
  const { position } = useSpring({ position: clicked ? size : -size });
  // get the half size to position it on top
  const halfSize = size / 2;
  
  const toggle = () => {
    set((i: boolean) => !i)
    console.log({ position })
    props.handleUpdatePlayer({
      id,
      position: position.value
    })
  };

  const { id, handleUpdatePlayer, ...groupProps } = props

  return (
    <a.group
      {...groupProps}
      onPointerDown={toggle}
      position={position.interpolate((s: number) => [0, s, halfSize])}
    >
      {props.children}
    </a.group>
  );
}

export default Moving