import React from "react";
import { useProjection } from "react-projection-mapping";
import ReactJson from "react-json-view";

export default function ProjectionData() {
  const projectionHook = useProjection();
  const {
    data,
    updateLayer,
    selectedLayer,
    selectedCorner,
    setSelectedLayer,
    setSelectedCorner,
  } = projectionHook;
  return (
    <div>
      <ReactJson collapsed={2} src={projectionHook} enableClipboard={true} />
    </div>
  );
}
