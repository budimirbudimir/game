import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { draco } from "drei"
import * as THREE from 'three'

export interface CustomProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  paused: boolean
  url: string
  // id: string
}

interface GLTFProps {
  scene: any
  animations: any[]
}

export const Custom = (props: CustomProps) => {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef()

  // Set up state for the hovered and active state
  // const [active, setActive] = useState(false)

  const [animationMixers, setAnimationMixers] = useState([])
  const [clock, setClock] = useState(null)

  // TODO Replace with local storage
  // const [animationsPlaying, setAnimationsPlaying] = useState(true)

  const gltf: GLTFProps = useLoader(GLTFLoader, props.url, draco())

  /**
   * @function setAnimationsPlayingFlag
   */
  const setAnimationsPlayingFlag = (isPlaying: boolean) => {
    localStorage.setItem('animationsPlayingFlag', JSON.stringify(isPlaying));
  }

  /**
   * @function getAnimationsPlayingFlag
   */
  const getAnimationsPlayingFlag = () => {
    return JSON.parse(localStorage.getItem('animationsPlayingFlag') || 'true');
  }

  /**
   * @function getAnimationsPlayingFlag
   */
  const playAnimations = (mixers = animationMixers, isCreating: boolean) => {
    if (mixers.length < 1) {
      console.warn('ERROR: Could not play animations.', {
        mixers,
        animationMixers,
        animations: gltf.animations,
      })
      return;
    }

    gltf.animations.forEach((animation, i) => {
      if (mixers[i]) {
        // @ts-ignore
        const action = mixers[i].clipAction(animation, mesh.current)
        action.setLoop(THREE.LoopRepeat);
        action.play();
      }
    })

    if (!isCreating) setAnimationsPlayingFlag(true)
  }

  /**
   * @function getAnimationsPlayingFlag
   */
  const stopAnimations = (mixers = animationMixers, isDestroying = false) => {
    if (mixers.length < 1) {
      console.warn('ERROR: Could not stop animations.', {
        mixers,
        animationMixers,
        animations: gltf.animations,
      })
    }

    gltf.animations.forEach((animation, i) => {
      if (mixers[i]) {
        // @ts-ignore
        gltf.animations.forEach(clip => mixers[i].uncacheClip(clip))
      }
    })

    if (!isDestroying) setAnimationsPlayingFlag(false)
  }

  useFrame((state, delta) => {
    if (animationMixers.length > 0 && clock) {
      // @ts-ignore
      const delta = clock.getDelta();
      for (var i = 0; i < animationMixers.length; i++) {
        // @ts-ignore
        animationMixers[i].update(delta);
      }
    }
  })

  useEffect(() => {
    const newMixers = gltf.animations.map(animation => new THREE.AnimationMixer(mesh.current));
    if (newMixers) setAnimationMixers(newMixers as any)

    setClock(new THREE.Clock() as any)
    const isPlaying = getAnimationsPlayingFlag()
    if (isPlaying) playAnimations(newMixers as any, true)

    window.dispatchEvent(new Event('geenee-arscene-arshape-augmented'))

    return () => {
      stopAnimations(newMixers as any, true)
      window.dispatchEvent(new Event('geenee-arscene-arshape-removed'))
    }
  // eslint-disable-next-line
  }, [gltf.animations])

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   if (!props.paused) {
  //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  //     console.log('updating')
  //   }
  // })

  // const { id, ...groupProps } = props

  return (
    <group
      {...props}
      scale={[1, 1, 1]}
      // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={() => setActive(!active)}
    >
      <primitive ref={mesh} object={gltf.scene} dispose={null} />
    </group>
  )
}

export default Custom