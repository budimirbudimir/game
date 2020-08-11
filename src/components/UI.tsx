import React from 'react'

import { Counter } from '../features/counter/Counter'

import styles from './UI.module.css'
import logo from '../logo.svg';

interface Props {
}

export const UI = (props: Props) => {
  return (
    <div className={styles.ui}>
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
    </div>
  )
}
