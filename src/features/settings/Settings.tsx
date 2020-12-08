import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPaused, getPaused } from "../experience/experienceSlice";
import { Stats } from "../../components/Stats";
import { Actions } from "../../components/Actions";

import styles from "./Settings.module.css";

interface StatsProps {}

export const Settings = (props: StatsProps) => {
  const dispatch = useDispatch();

  const paused = useSelector(getPaused);

  return (
    <div className={styles.settings}>
      <h1>Scuffle</h1>
      <div className={styles.verticalSplit}>
        <Stats />
        <Actions continue={() => dispatch(setPaused(!paused))} />
      </div>
      <small style={{ fontSize: "0.5em" }}>&copy; 2020 Budimir Bros</small>
    </div>
  );
};
