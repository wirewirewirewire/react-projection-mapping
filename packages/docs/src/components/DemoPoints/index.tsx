"use client";

import {
  Projection,
  Points,
  SplitLayer,
  useProjection,
  Layer,
} from "react-projection-mapping";
import sampleImageMapping from "./popsicle.svg";
import styles from "./demo.module.scss";
import Image from "next/image";

import { Checkbox } from "@wfp/react";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const ProjectionDataWithNoSSR = dynamic(() => import("./ProjectionData"), {
  ssr: false,
});

export default function DemoPoints() {
  const update = ({ layers, isEnd }: any) => {
    console.log("update", layers, isEnd);
  };
  const [edit, setEdit] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const data = {
    "points-0": {
      corners: [
        [25, 50],
        [50, 75],
        [75, 80],
        [100, 40],
        [125, 30],
        [150, 60],
        [175, 50],
      ],
      zIndex: 3,
    },

    imageLayer: {
      corners: [334, -191, 514, -108, 334, -2, 518, 83],
      zIndex: 3,
    },

    //textLayer: [0, 0, 100, 0, 100, 100, 0, 100],
    //imageLayer: [0, 0, 100, 0, 100, 100, 0, 100],
  };
  return (
    <Projection data={data} onChange={update} edit={edit} enabled={enabled}>
      <div className={styles.preview}>
        <div className={styles.wrapperText}></div>

        <div className={styles.newPoints}>
          <Points id="points-without-data" />
        </div>
        <div className={styles.wrapperImage}>
          <Points id="points-0" />

          <Layer id="imageLayer">
            <Image
              priority
              alt="Picture of some flag in the Salar de Uyuni"
              src={sampleImageMapping}
              className={styles.image}
            />
          </Layer>
        </div>
      </div>
      <Checkbox
        name="edit"
        labelText="Edit"
        onChange={(e) => setEdit(e.target.checked)}
        checked={edit}
      />
      <Checkbox
        name="enabled"
        labelText="Enabled"
        onChange={(e) => setEnabled(e.target.checked)}
        checked={enabled}
      />
      <ProjectionDataWithNoSSR />
    </Projection>
  );
}
