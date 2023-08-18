import * as React from "react";

import Draggable from "react-draggable";
import useDistortControl from "../DistortControl/useDistortControl";
import DistortContainer from "DistortContainer";

export default function DistortSplit({ clip, children, id, style }: any) {
  const distortContainerRef = React.useRef<any>(null);
  const [transform, setTransform] = React.useState<any>(undefined);

  const { article, updateDistortion } = useDistortControl();
  const distortCoordinates = article?.json?.distort?.[id] || [
    0, 70, 500, 50, 50, 300, 500, 500,
  ];

  const distortActive =
    article?.json?.distortActive !== undefined
      ? article?.json?.distortActive
      : true;

  /*
  React.useEffect(() => {
    if (!distortContainerRef.current || !distortCoordinates) return;
    const transform = distortContainerRef.current
      ? transform2d(distortContainerRef.current, ...distortCoordinates)
      : undefined;

    setTransform(transform);
  }, [distortContainerRef.current, distortCoordinates]);
  */

  const handleDrag = (ui, x, y, isEnd) => {
    const cornersNew = [...distortCoordinates];
    cornersNew[x] = ui.x;
    cornersNew[y] = ui.y;

    updateDistortion({ id, corners: cornersNew, isEnd });
  };

  const stylesBorder: React.CSSProperties = {
    position: "absolute",
    border: "1px solid blue",
    pointerEvents: "none",
    // zIndex: 100000,
    top: `${clip[0]}%`,
    left: `${clip[3]}%`,
    bottom: `${clip[2]}%`,
    right: `${clip[1]}%`,
  };

  const stylesWrapper: React.CSSProperties = {
    position: "absolute",
    border: "1px solid green",
    //pointerEvents: "none",
    // zIndex: 100000,
    top: `${clip[0]}%`,
    left: `${clip[3]}%`,
    bottom: `${clip[2]}%`,
    right: `${clip[1]}%`,
    // overflow: "hidden",
  };

  const width = 100 - clip[1] - clip[3];
  const height = 100 - clip[2] - clip[0];

  const styles: React.CSSProperties = {
    position: "absolute",
    top: `-${clip[0] * ((1 / height) * 100)}%`,
    left: `-${clip[3] * ((1 / width) * 100)}%`,
    // bottom: `${clip[2]}%`,
    // right: `${clip[1]}%`,
    width: "100vw",
    height: "100vh",
    clipPath: `inset(${clip[0]}% ${clip[1]}% ${clip[2]}%  ${clip[3]}%)`,
  };

  return (
    <div className="distort__wrapper" style={stylesWrapper}>
      <DistortContainer id={id}>
        <div className="distort__split" style={styles}>
          <div className="distort__split__controls" style={stylesBorder}></div>
          <div
            style={{ transformOrigin: "0 0", transform: transform }}
            ref={distortContainerRef}
          >
            {children}
          </div>
        </div>
      </DistortContainer>
    </div>
  );
}
