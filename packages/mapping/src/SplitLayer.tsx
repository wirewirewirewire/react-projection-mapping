import * as React from "react";
import Layer from "Layer";

export default function DistortSplit({ clip, children, id, style }: any) {
  const distortContainerRef = React.useRef<any>(null);
  const orignalRef = React.useRef<any>(null);
  const [originalContainer, setOriginalContainer] = React.useState<any>(null);

  /* Set default coordinates */
  React.useEffect(() => {
    if (!orignalRef.current) return;
    const position = orignalRef.current.getBoundingClientRect();
    setOriginalContainer(position);
  }, [orignalRef.current]);

  const stylesBorder: React.CSSProperties = {
    position: "absolute",
    //border: "1px solid blue",
    pointerEvents: "none",
    // zIndex: 100000,
    top: `${clip[0]}%`,
    left: `${clip[3]}%`,
    bottom: `${clip[2]}%`,
    right: `${clip[1]}%`,
  };

  const stylesOriginal: React.CSSProperties = {
    width: "100%",
    height: "100%",
  };

  const stylesWrapper: React.CSSProperties = {
    position: "absolute",
    top: `${clip[0]}%`,
    left: `${clip[3]}%`,
    bottom: `${clip[2]}%`,
    right: `${clip[1]}%`,
  };

  const width = 100 - clip[1] - clip[3];
  const height = 100 - clip[2] - clip[0];

  const styles: React.CSSProperties = {
    position: "absolute",
    top: `-${clip[0] * ((1 / height) * 100)}%`,
    left: `-${clip[3] * ((1 / width) * 100)}%`,
    width: originalContainer?.width,
    height: originalContainer?.height,
    clipPath: `inset(${clip[0]}% ${clip[1]}% ${clip[2]}%  ${clip[3]}%)`,
  };

  return (
    <div className="distort__original" style={stylesOriginal} ref={orignalRef}>
      <div className="distort__wrapper" style={stylesWrapper}>
        <Layer id={id}>
          <div className="distort__split" style={styles}>
            <div
              className="distort__split__controls"
              style={stylesBorder}
            ></div>
            <div ref={distortContainerRef}>{children}</div>
          </div>
        </Layer>
      </div>
    </div>
  );
}
