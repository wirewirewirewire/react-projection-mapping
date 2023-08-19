"use client";

import {
  Projection,
  Layer,
  SplitLayer,
  useProjection,
} from "react-projection-mapping";
// import sampleImageMapping from "./sample-image-mapping.jpg";
import sampleImageMapping from "./popsicle.svg";
import styles from "./demo.module.scss";
import Image from "next/image";
import ProjectionData from "./ProjectionData";
import { Checkbox } from "@wfp/react";
import { useState } from "react";

export default function Demo() {
  const update = ({ layers, isEnd }: any) => {
    console.log("update", layers, isEnd);
  };
  const [edit, setEdit] = useState(true);
  const [enabled, setEnabled] = useState(true);

  const data = {
    "tile-0": [334, -191, 514, -108, 334, -2, 518, 83],
    "tile-1": [315, -107, 461, -213, 317, 84, 461, -22],
    imageLayer: [-326, 175, -212, 93, -184, 236, -73, 157],

    //textLayer: [0, 0, 100, 0, 100, 100, 0, 100],
    //imageLayer: [0, 0, 100, 0, 100, 100, 0, 100],
  };
  return (
    <Projection data={data} onChange={update} edit={edit} enabled={enabled}>
      <div className={styles.preview}>
        <div className={styles.wrapperText}>
          {[...Array(2)].map((y, index) => (
            <SplitLayer
              key={index}
              id={`tile-${index}`}
              clip={[0, index === 0 ? 50 : 0, 0, index === 0 ? 0 : 50]}
            >
              <div>
                This is a text layer that is split so it can be wrapped around a
                corner. It can contain any html element including{" "}
                <a href="#">Links</a> or videos.
              </div>
            </SplitLayer>
          ))}
        </div>
        <div className={styles.wrapperImage}>
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

      <ProjectionData />
    </Projection>
  );
}
