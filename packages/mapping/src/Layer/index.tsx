import * as React from "react";
import { transform2d } from "./distortContainer";
import useProjection from "../useProjection";
import Corner from "./Corner";

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

export default function Layer({
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
    selectedLayer,
    selectedCorner,
    setSelectedLayer,
    setSelectedCorner,
  } = useProjection();

  const distortCoordinates = data?.[id] || false;

  /* Set default coordinates */
  React.useEffect(() => {
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
  }, [layerRef.current]);

  React.useEffect(() => {
    if (!layerRef.current || !distortCoordinates?.corners) return;
    const transform = layerRef.current
      ? transform2d(layerRef.current, ...distortCoordinates.corners)
      : undefined;

    setTransform(transform);
  }, [layerRef.current, distortCoordinates]);

  const handleDrag = (ui, x, y, isEnd) => {
    if (!distortCoordinates) return;
    const cornersNew = [...distortCoordinates.corners];
    cornersNew[x] = ui.x;
    cornersNew[y] = ui.y;

    updateLayer({ id, corners: cornersNew, isEnd });
  };

  const distortContainerElement = edit
    ? distortContainerActive
    : distortContainer;

  if (!enabled) return children;

  const corner = {
    distortCoordinates,
    handleDrag,
    layer: id,
  };
  return (
    <div style={wrapper} className="react-projection-mapping__layer">
      <div
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
      </div>
      {edit && (
        <>
          <Corner {...corner} x={0} y={1} position="topLeft" corner={0} />
          <Corner {...corner} x={2} y={3} position="topRight" corner={1} />
          <Corner {...corner} x={4} y={5} position="bottomRight" corner={2} />
          <Corner {...corner} x={6} y={7} position="bottomLeft" corner={3} />
        </>
      )}
    </div>
  );
}
