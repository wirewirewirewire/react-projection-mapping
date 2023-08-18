import * as React from "react";
import Draggable from "react-draggable";

const Corner = ({ distortCoordinates, x, y, handleDrag, position }: any) => {
  const corner: React.CSSProperties = {
    position: "absolute",
    width: "20px",
    height: "20px",
    marginLeft: "-10px",
    marginTop: "-10px",
    border: "3px solid #0da8ff",
    color: "#fff",
    fontSize: "0.5em",
    cursor: "pointer",
    transition: "background 0.1s ease-in-out",
    /*&:hover {
    background: rgba(#0da8ff, 0.5);
  }*/
  };

  return (
    <Draggable
      defaultPosition={{
        x: distortCoordinates[0],
        y: distortCoordinates[1],
      }}
      onDrag={(e, ui) => handleDrag(ui, x, y, false)}
      onStop={(e, ui) => handleDrag(ui, x, y, true)}
      // bounds="parent"
      position={{ x: distortCoordinates[x], y: distortCoordinates[y] }}
    >
      <div
        style={corner}
        className={`react-projection-mapping__corner react-projection-mapping__corner--${position}`}
      >
        tl01
      </div>
    </Draggable>
  );
};

export default Corner;
