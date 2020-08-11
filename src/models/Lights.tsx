import React from 'react'

interface Props {
  position: [number, number, number]
}

export const Lights = (props: Props) => {
  return (
    <>
      <ambientLight />
      <pointLight position={props.position} />
    </>
  )
}
