import * as React from "react";
import { DistortContextInterface, DistortControlContext } from ".";

export default function useDistortControl() {
  const settings = React.useContext(DistortControlContext);
  return settings as DistortContextInterface;
}
