import React, { Suspense, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Canvas } from 'react-three-fiber'

import { addPoints, updatePlayer, PlayerProps } from './experienceSlice'
import { OBJECT_GRID, PLAYER_GRID } from '../../utils/grid'

import { Lights } from '../../models/Lights'
import { Box } from '../../models/Box'
import { Custom } from '../../models/Custom'
import { Moving } from '../../models/Moving'
// import { Coming } from '../../models/Coming'

import OrbitControls from '../../components/Controls'
import styles from './Experience.module.css'

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
      <Canvas resize={{ scroll: false }}>
        <Lights position={[10, 10, 10]} />
        <OrbitControls />

        <Box
          paused={props.paused}
          position={hostileObjectPosition}
          handleAddPoints={handleAddPoints}
          generateObjectPosition={generateObjectPosition}
        />

        <Suspense fallback={null}>
          <Moving size={2} id='first' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'first'}
              url={'./Flamingo.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_LEFT}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
        </Suspense>

        <Suspense fallback={null}>
          <Moving size={2} id='second' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'second'}
              url={'./Parrot.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_CENTER}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
        </Suspense>

        <Suspense fallback={null}>
          <Moving size={2} id='third' handleUpdatePlayer={handleUpdatePlayer}>
            <Custom
              key={'third'}
              url={'./Stork.glb'}
              paused={props.paused}
              position={PLAYER_GRID.BOTTOM_RIGHT}
              rotation={[0, 180 * DEG_TO_RAD, 0]}
            />
          </Moving>
        </Suspense>
      </Canvas>
    </div>
  )
}