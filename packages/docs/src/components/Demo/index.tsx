"use client";

import { DistortControl, DistortContainer } from "react-projection-mapping";
import styles from "./demo.module.scss";

export default function Demo() {
  const update = () => {};
  const data = {
    distort: {
      tl01: [0, 0, 100, 0, 100, 100, 0, 100],
    },
  };
  return (
    <DistortControl data={data} update={update} editing={true} enabled={true}>
      Your containers
      <div className={styles.wrapper}>
        <DistortContainer>
          <div>sdaasdas</div>
        </DistortContainer>
      </div>
    </DistortControl>
  );
}
