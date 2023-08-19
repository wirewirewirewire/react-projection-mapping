import * as React from "react";
import { ProjectionContextInterface, ProjectionContext } from "./Projection";

export default function useProjection() {
  const settings = React.useContext(ProjectionContext);
  return settings as ProjectionContextInterface;
}
