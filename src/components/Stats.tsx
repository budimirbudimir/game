import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import styles from "./Stats.module.css";

const HARDCODED_DATA_TABLE = [
  {
    user: "usr1",
    clan: "cln1",
    pts: 10,
  },
  {
    user: "usr2",
    clan: "cln2",
    pts: 20,
  },
  {
    user: "usr3",
    clan: "cln3",
    pts: 30,
  },
];

interface Props {}

export const Stats = (props: Props) => {
  return (
    <div className={styles.stats}>
      <h3>Stats</h3>

      <DataTable value={HARDCODED_DATA_TABLE}>
        <Column field="user" header="User" />
        <Column field="clan" header="Clan" />
        <Column field="pts" header="Points" />
      </DataTable>
    </div>
  );
};
