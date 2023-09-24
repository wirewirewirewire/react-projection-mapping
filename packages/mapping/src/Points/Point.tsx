import * as React from "react";
import Draggable from "react-draggable";
import useProjection from "useProjection";

const Point = ({
  distortCoordinates = { corners: [] },
  x,
  y,
  handleDrag,
  index,
  layer,
  corner,
}: any) => {
  const {
    edit,
    selectedLayer,
    selectedCorner,
    setSelectedCorner,
    setSelectedLayer,
    updateLayer,
  } = useProjection();

  const infoStyle: React.CSSProperties = {
    background: "#fff",
  };

  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    width: "20px",
    height: "20px",
    marginLeft: "-10px",
    marginTop: "-10px",
    border:
      selectedCorner === index && selectedLayer === layer
        ? "3px solid #FF2B2B"
        : "3px solid #0da8ff",
    boxShadow:
      selectedCorner === index && selectedLayer === layer
        ? "0px 0 4px 3px rgba(0, 0, 0, 0.1)"
        : undefined,
    // color: "#fff",
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
        x: x + xMove * multiplier,
        y: y + yMove * multiplier,
      },

      x,
      y,
      index,
      true
    );
  };

  const registerKeyPress = (event) => {
    event.preventDefault();

    if (selectedLayer !== layer || selectedCorner !== index) return;
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

    // zIndex up
    if (event.keyCode === 65) {
      updateLayer({
        id: layer,
        isEnd: true,
        zIndex:
          (distortCoordinates.zIndex === undefined
            ? 0
            : distortCoordinates.zIndex) - 1,
      });
    }
    if (event.keyCode === 83) {
      updateLayer({
        id: layer,
        isEnd: true,
        zIndex:
          (distortCoordinates.zIndex === undefined
            ? 0
            : distortCoordinates.zIndex) + 1,
      });
    }
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
        x: x,
        y: y,
      }}
      onDrag={(e, ui) => handleDrag(ui, x, y, index, false)}
      onStop={(e, ui) => handleDrag(ui, x, y, index, true)}
      // bounds="parent"
      position={{
        x: x,
        y: y,
      }}
    >
      <div
        style={cornerStyle}
        className={`react-projection-mapping__corner react-projection-mapping__corner--index--${index} react-projection-mapping__layer--${layer}`}
        onClick={() => {
          setSelectedLayer(layer);
          setSelectedCorner(index);
        }}
      >
        {corner === 0 && (
          <div className="react-projection-mapping__info" style={infoStyle}>
            {distortCoordinates.zIndex}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Point;
