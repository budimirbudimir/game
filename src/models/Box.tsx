import React, { useRef, useState } from 'react'
// import { useDispatch } from 'react-redux'
import { useFrame } from 'react-three-fiber'

// import { addPoints } from '../features/experience/experienceSlice'

export interface BoxProps {
  position: [number, number, number]
  paused: boolean
  handleAddPoints: (p: number) => void
  generateObjectPosition: () => void
}

export const Box = (props: BoxProps) => {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef()

  // const dispatch = useDispatch()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // const [visible, setVisible] = useState(true)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // If object surpassed movement boundaries, destroy it and add points
    // if (mesh.current.position.z > -5 && visible) {
    if (mesh.current.position.z > -5) {
      console.log('surpassed movement boundaries', mesh.current.position.z)

      // later on, add collision calculations
      props.handleAddPoints(10)

      // destroyObject(), for now just hide
      // mesh.current.visible = false
      // setVisible(false)
      props.generateObjectPosition()
    }

    // Apply translation if experience isn't paused
    if (!props.paused && mesh.current.position.z < -5) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
      mesh.current.position.z = mesh.current.position.z += 0.1
      console.log('updating')
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      // visible={visible}
      // scale={active ? [1, 1, 1] : [.5, .5, .5]}
      // onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default Box