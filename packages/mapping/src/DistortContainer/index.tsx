import * as React from "react";
import { transform2d } from "./distortContainer";
import Draggable from "react-draggable";
import useDistortControl from "../DistortControl/useDistortControl";
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

export default function DistortContainer({ children, id }: any) {
  const distortContainerRef = React.useRef<any>(null);
  const [transform, setTransform] = React.useState<any>(undefined);

  const { article, updateDistortion } = useDistortControl();

  const distortCoordinates = article?.distort?.[id] || false;

  React.useEffect(() => {
    if (!distortContainerRef.current) return;
    const p = [];
    const position = distortContainerRef.current.getBoundingClientRect();

    p[0] = 0;
    p[1] = 0;
    p[2] = position.width;
    p[3] = 0;
    p[4] = position.width;
    p[5] = position.height;
    p[6] = 0;
    p[7] = position.height;

    // TL
    p[0] = 0;
    p[1] = 0;
    p[2] = position.width;
    p[3] = 0;
    p[4] = 0;
    p[5] = position.height;
    p[6] = position.width;
    p[7] = position.height;

    updateDistortion({ id, corners: p, isEnd: true });
  }, [distortContainerRef.current]);

  const distortActive =
    article?.distortActive !== undefined ? article?.distortActive : true;

  React.useEffect(() => {
    if (!distortContainerRef.current || !distortCoordinates) return;
    const transform = distortContainerRef.current
      ? transform2d(distortContainerRef.current, ...distortCoordinates)
      : undefined;

    setTransform(transform);
  }, [distortContainerRef.current, distortCoordinates]);

  const handleDrag = (ui, x, y, isEnd) => {
    const cornersNew = [...distortCoordinates];
    cornersNew[x] = ui.x;
    cornersNew[y] = ui.y;

    updateDistortion({ id, corners: cornersNew, isEnd });
  };

  const distortContainerElement = distortActive
    ? distortContainerActive
    : distortContainer;

  return (
    <div style={wrapper}>
      <div
        style={{
          transformOrigin: "0 0",
          transform: transform,
          ...distortContainerElement,
        }}
        ref={distortContainerRef}
      >
        {children}
      </div>
      {distortActive && (
        <>
          <Corner
            distortCoordinates={distortCoordinates}
            handleDrag={handleDrag}
            x={0}
            y={1}
            position="topLeft"
          />
          <Corner
            distortCoordinates={distortCoordinates}
            handleDrag={handleDrag}
            x={2}
            y={3}
            position="topRight"
          />
          <Corner
            distortCoordinates={distortCoordinates}
            handleDrag={handleDrag}
            x={4}
            y={5}
            position="bottomRight"
          />
          <Corner
            distortCoordinates={distortCoordinates}
            handleDrag={handleDrag}
            x={6}
            y={7}
            position="bottomLeft"
          />
        </>
      )}
    </div>
  );
}
