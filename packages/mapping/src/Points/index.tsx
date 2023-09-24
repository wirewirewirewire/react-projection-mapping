import * as React from "react";
import useProjection from "../useProjection";
import Point from "./Point";

export default function Points({
  edit: editLayer,
  enabled: enabledLayer,
  id,
}: any) {
  const {
    edit = editLayer,
    enabled = enabledLayer,
    data,
    updateLayer,
  } = useProjection();

  const distortCoordinates = data?.[id] || false;

  /* Set default coordinates */
  React.useEffect(() => {
    if (distortCoordinates) return;

    const p = [
      [10, 10],
      [Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)],
    ];

    updateLayer({ id, corners: p, isEnd: true });
  }, [data]);

  /* On Drag */
  const handleDrag = (ui, x, y, index, isEnd) => {
    const pointsNew = [...distortCoordinates.corners];
    pointsNew[index] = [ui.x, ui.y];

    updateLayer({ id, corners: pointsNew, isEnd });
  };

  if (!enabled) return null;

  return (
    <>
      {edit && distortCoordinates?.corners && (
        <>
          {distortCoordinates.corners.map((corner, index) => (
            <Point
              key={index}
              distortCoordinates={distortCoordinates}
              handleDrag={handleDrag}
              index={index}
              layer={id}
              x={corner[0]}
              y={corner[1]}
            />
          ))}
        </>
      )}
    </>
  );
}
