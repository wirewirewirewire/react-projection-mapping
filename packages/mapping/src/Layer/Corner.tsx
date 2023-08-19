import * as React from "react";
import Draggable from "react-draggable";
import useProjection from "useProjection";

const Corner = ({
  distortCoordinates,
  x,
  y,
  handleDrag,
  position,
  layer,
  corner,
}: any) => {
  const {
    edit,
    selectedLayer,
    selectedCorner,
    setSelectedCorner,
    setSelectedLayer,
  } = useProjection();

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    width: "20px",
    height: "20px",
    marginLeft: "-10px",
    marginTop: "-10px",
    border:
      selectedCorner === corner && selectedLayer === layer
        ? "3px solid #FF2B2B"
        : "3px solid #0da8ff",
    color: "#fff",
    fontSize: "0.5em",
    cursor: "pointer",
    transition: "background 0.1s ease-in-out",
    /*&:hover {
    background: rgba(#0da8ff, 0.5);
  }*/
  };

  const move = (xMove = 0, yMove = 0, multiplier = 1) => {
    handleDrag(
      {
        x: distortCoordinates[x] + xMove * multiplier,
        y: distortCoordinates[y] + yMove * multiplier,
      },
      x,
      y,
      false
    );
  };

  const registerKeyPress = (event) => {
    event.preventDefault();
    console.log("cornerrrr", event.keyCode, selectedLayer, selectedCorner);

    if (selectedLayer !== layer || selectedCorner !== corner) return;
    // top

    let multiplier = 1;
    if (event.shiftKey) {
      multiplier = 10;
    }
    if (event.keyCode === 38) {
      move(0, -1, multiplier);
    }
    // left
    if (event.keyCode === 37) {
      move(-1, 0, multiplier);
    }
    // right
    if (event.keyCode === 39) {
      move(1, 0, multiplier);
    }
    // down
    if (event.keyCode === 40) {
      move(0, 1, multiplier);
    }

    /* */
  };

  React.useEffect(() => {
    if (edit) window.addEventListener("keydown", registerKeyPress);
    return () => {
      if (edit) window.removeEventListener("keydown", registerKeyPress);
    };
  }, [edit, registerKeyPress]);

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
        style={cornerStyle}
        className={`react-projection-mapping__corner react-projection-mapping__corner--${position}`}
        onClick={(e) => {
          setSelectedLayer(layer);
          setSelectedCorner(corner);
        }}
      ></div>
    </Draggable>
  );
};

export default Corner;
