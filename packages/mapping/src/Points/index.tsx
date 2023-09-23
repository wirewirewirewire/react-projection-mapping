import * as React from "react";
import useProjection from "../useProjection";
import Point from "./Point";

const wrapper: React.CSSProperties = {
  height: "100%",
};

const distortContainer: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const distortContainerActive: React.CSSProperties = {
  outline: "1px solid #0da8ff",
  width: "100%",
  height: "100%",
  position: "absolute",
};

export default function Points({
  edit: editLayer,
  enabled: enabledLayer,
  children,
  id,
}: any) {
  const layerRef = React.useRef<any>(null);
  const [transform, setTransform] = React.useState<any>(undefined);

  const {
    edit = editLayer,
    enabled = enabledLayer,
    data,
    updateLayer,
    setSelectedLayer,
    setSelectedCorner,
  } = useProjection();

  const distortCoordinates = data?.[id] || false;

  /* Set default coordinates */
  /*React.useEffect(() => {
    if (!layerRef.current || distortCoordinates) return;
    const position = layerRef.current.getBoundingClientRect();
    const p = [
      0,
      0,
      position.width,
      0,
      0,
      position.height,
      position.width,
      position.height,
    ];

    updateLayer({ id, corners: p, isEnd: true });
  }, [layerRef.current]);*/

  /* Update on new coordinates */
  /* React.useEffect(() => {
    if (!layerRef.current || !distortCoordinates?.corners) return;
    const transform = layerRef.current
      ? transform2d(layerRef.current, ...distortCoordinates.corners)
      : undefined;

    setTransform(transform);
  }, [layerRef.current, distortCoordinates]);*/

  /* On Drag */
  const handleDrag = (ui, x, y, index, isEnd) => {
    console.log("handle drag", ui, x, y, index, isEnd);
    const pointsNew = [...distortCoordinates.corners];
    pointsNew[index] = [ui.x, ui.y];
    /*if (!distortCoordinates) return;
    const cornersNew = [...distortCoordinates.corners];
    cornersNew[x] = ui.x;
    cornersNew[y] = ui.y;
*/
    updateLayer({ id, corners: pointsNew, isEnd });
  };

  const distortContainerElement = edit
    ? distortContainerActive
    : distortContainer;

  if (!enabled) return children;

  console.log("distortCoordinates", distortCoordinates);
  return (
    <div style={wrapper} className="react-projection-mapping__layer">
      {/*<div
        className="react-projection-mapping__distort"
        style={{
          transformOrigin: "0 0",
          transform: transform,
          ...distortContainerElement,
          zIndex: distortCoordinates?.zIndex,
        }}
        ref={layerRef}
        onClick={() => {
          setSelectedLayer(id);
          setSelectedCorner(0);
        }}
      >
        {children}
      </div>*/}
      {edit && distortCoordinates?.corners && (
        <>
          {distortCoordinates.corners.map((corner, index) => (
            <Point
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
    </div>
  );
}
