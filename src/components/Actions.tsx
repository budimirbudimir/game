import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

import { setSplashVisible } from '../features/settings/settingsSlice'
import { setPaused, setPoints } from '../features/experience/experienceSlice'

import styles from './Actions.module.css'

interface ActionsProps {
  continue: () => void
}

export const Actions = (props: ActionsProps) => {
  const dispatch = useDispatch()

  const [dialogVisible, setDialogVisible] = useState(false)

  return (
    <div className={styles.buttonContainer}>
      <h3>Actions</h3>
      <div className="p-grid p-fluid">
        <div className="p-col-12">
          <div className="p-inputgroup">
            <Button
              label="Continue"
              icon="pi pi-play"
              className="p-button-success"
              onClick={props.continue}
            />
          </div>
        </div>

        <div className="p-col-12">
          <div className="p-inputgroup">
            <Button
              label="Save"
              className="p-button-secondary"
              onClick={() => alert('saving game')}
            />
          </div>
        </div>

        <div className="p-col-12">
          <div className="p-inputgroup">
            <Button
              label="Preferences"
              className="p-button-secondary"
              onClick={() => alert('opening preferences')}
            />
          </div>
        </div>

        <div className="p-col-12">
          <div className="p-inputgroup">
            <Button
              label="Exit"
              icon="pi pi-power-off"
              className="p-button-danger"
              onClick={() => setDialogVisible(true)}
            />
          </div>
        </div>

        <Dialog
          header="Exit?"
          footer={
            <div>
              <Button label="Yes" onClick={() => setDialogVisible(false)} />
              <Button label="No" onClick={() => setDialogVisible(false)} />
            </div>
          }
          visible={dialogVisible}
          style={{ width: '50vw' }}
          modal={true}
          onHide={() => {
            setDialogVisible(false)
            dispatch(setSplashVisible(true))
            dispatch(setPaused(true))
            dispatch(setPoints(0))
          }}
        >
          Are you sure you want to quit the game? <br/>
          You progress may be lost.
        </Dialog>
      </div>
    </div>
  )
}

