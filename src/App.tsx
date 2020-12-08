import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setPaused,
  getPaused,
  getPoints,
} from "./features/experience/experienceSlice";

import { Settings } from "./features/settings/Settings";
import { Experience } from "./features/experience/Experience";
import { Splash } from "./components/Splash";
import styles from "./App.module.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const paused = useSelector(getPaused);
  const points = useSelector(getPoints);

  return (
    <div className="App">
      <div className={styles.score}>{`${points}pts`}</div>
      <div
        className={styles.pauseButton}
        onClick={() => dispatch(setPaused(!paused))}
      >
        {!paused ? "||" : "|>"}
      </div>
      <header className="App-header">
        {paused && <Settings />}
        <Experience paused={paused} />
      </header>
      <Splash />
    </div>
  );
};

export default App;
