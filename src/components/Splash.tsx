import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button'

import { getSplashVisible, setSplashVisible } from '../features/settings/settingsSlice'
import { setPaused } from '../features/experience/experienceSlice'

import bird from '../bird.png';
import styles from './Splash.module.css';

interface Props {
  
}

export const Splash = (props: Props) => {
  const dispatch = useDispatch()

  const splashVisible = useSelector(getSplashVisible)

  if (!splashVisible) return null

  return (
    <div className={styles.splash}>
      <img src={bird} className="App-logo" alt="logo" />
      <h1>Scuffle</h1>
      <Button
        label='Start Game'
        onClick={() => {
          dispatch(setSplashVisible(false))
          dispatch(setPaused(false))
        }}
      />
      <br/>
      <small>&copy; 2020 Budimir Bros</small>
    </div>
  )
}
