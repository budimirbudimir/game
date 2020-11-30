import React, { Suspense, useState, useEffect, lazy, ComponentType } from 'react'
import { useDispatch } from 'react-redux'
import { Canvas, useThree } from 'react-three-fiber'
import { Html, Text } from 'drei'

import { addPoints, updatePlayer, PlayerProps } from './experienceSlice'
import { OBJECT_GRID, PLAYER_GRID } from '../../utils/grid'

import { Lights } from '../../models/Lights'
// import { BoxProps } from '../../models/Box'
// import { CustomProps } from '../../models/Custom'
// import { MovingProps } from '../../models/Moving'
// import { Coming } from '../../models/Coming'

// import OrbitControls from '../../components/Controls'
import styles from './Experience.module.css'

// type Asset = ExoticComponent<BoxProps> & { readonly _result: (props: BoxProps) => Element; }

const Box: ComponentType<any> = lazy(() => import('../../models/Box')); // has imports from three/jsm
const Custom: ComponentType<any> = lazy(() => import('../../models/Custom')); // has imports from three/jsm
const Moving: ComponentType<any> = lazy(() => import('../../models/Moving')); // has imports from three/jsm

export const RAD_TO_DEG = 180 / Math.PI;
export const DEG_TO_RAD = Math.PI / 180;

interface ExperienceProps {
  paused: boolean
}

const getRandomIndexFromArray = (arr: any) => {
  const length = arr.length
  const index = Math.floor(Math.random() * length)
  console.log({ length, index })
  return index
}

const Loading3D = () => {
    // prepend // Project content behind the canvas (default: false)
    // center // Adds a -50%/-50% css transform (default: false)
    // fullscreen // Aligns to the upper-left corner, fills the screen (default:false)
    // scaleFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera.
    // zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
    // portal={domnodeRef} // Reference to target container (default=undefined)
    // {...groupProps} // All THREE.Group props are valid
    // {...divProps} // All HTMLDivElement props are valid
  return (
    <Html>
      <h1>hello</h1>
      <p>world</p>
    </Html>
  )
}
const ResponsiveText = () => {
  const { viewport } = useThree()
  return (
    <Text
      color={"#EC2D2D"}
      fontSize={16.5}
      maxWidth={(viewport.width / 100) * 90}
      lineHeight={0.75}
      letterSpacing={-0.08}
      textAlign={'justify'}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle">
      LOADING
    </Text>
  )
}

export const Experience = (props: ExperienceProps) => {
  const dispatch = useDispatch()

  const [hostileObjectPosition, setHostileObjectPosition]: any = useState([0, 0, 0])

  const handleAddPoints = (points: number) => dispatch(addPoints(points))

  const handleUpdatePlayer = (player: PlayerProps) => dispatch(updatePlayer(player))

  const generateObjectPosition = () => {
    const objectPositionsArray = Object.keys(OBJECT_GRID)
    const randomIndex = getRandomIndexFromArray(objectPositionsArray)
    const key = objectPositionsArray[randomIndex]
    const randomPosition = (OBJECT_GRID as any)[key]

    setHostileObjectPosition(randomPosition)
  }

  useEffect(() => {
    generateObjectPosition()

    // Cleanup
    // return () => {}
  }, [])

  // TODO Add container for scene to be able to access useFrame
  // TODO Separate Lights/Controls from Hostile Objects and Player Models
  return (
    <div className={styles.experience}>
      <Canvas>
        <Lights position={[10, 10, 10]} />
        {/* <OrbitControls /> */}

        <Box
          paused={props.paused}
          position={hostileObjectPosition}
          handleAddPoints={handleAddPoints}
          generateObjectPosition={generateObjectPosition}
        />

        {/* <Suspense fallback={<ResponsiveText/>}> */}
          <>
          <Moving size={2} id='first' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'first'}
              url={'./Flamingo.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_LEFT}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
        {/* </Suspense> */}

        {/* <Suspense fallback={null}> */}
          <Moving size={2} id='second' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'second'}
              url={'./Parrot.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_CENTER}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
        {/* </Suspense> */}

        {/* <Suspense fallback={null}> */}
          <Moving size={2} id='third' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'third'}
              url={'./Stork.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_RIGHT}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
          </>
        {/* </Suspense> */}
      </Canvas>
    </div>
  )
}