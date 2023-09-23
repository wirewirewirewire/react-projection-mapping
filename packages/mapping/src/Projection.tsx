import * as React from "react";

const defaultProjectionContext = {
  data: {},
  updateLayer: ({ id, corners }: any) => {
    console.warn("no updateLayer set");
  },
};

export interface ProjectionContextInterface {
  data?: { [key: string]: any };
  edit?: boolean;
  enabled?: boolean;
  updateLayer: ({ id, corners }: any) => void;
  selectedLayer?: string;
  selectedCorner?: number;
  setSelectedLayer?: (layer: string) => void;
  setSelectedCorner?: (corner: number) => void;
}

export const ProjectionContext =
  React.createContext<ProjectionContextInterface>(defaultProjectionContext);

/** The Projection props are basic properties for the provider */
type ProjectionProps = React.PropsWithChildren<{
  edit?: boolean;
  enabled?: boolean;
  data?: { [key: string]: any };
  onChange?: ({ isEnd, layers }: any) => void;
}>;

const Projection: React.FC<ProjectionProps> = ({
  children,
  data,
  edit,
  enabled,
  onChange,
  ...props
}) => {
  const [dataState, setDataState] = React.useState<any>(data);
  const [selectedLayer, setSelectedLayer] = React.useState<any>(undefined);
  const [selectedCorner, setSelectedCorner] = React.useState<any>(0);

  const registerKeyPressProjection = (event) => {
    const cornersLength = Array.isArray(dataState?.[selectedLayer]?.corners[0])
      ? dataState?.[selectedLayer]?.corners?.length
      : 4;
    // Forwards
    if (event.keyCode === 87) {
      const layerList = Object.keys(dataState);
      const selectedLayerIndex = layerList.indexOf(selectedLayer);

      console.log(
        "jump prepare",
        selectedLayerIndex,
        layerList.length,
        selectedCorner,
        cornersLength - 1
      );

      // If no layer: ump to first layer and first corner
      if (selectedLayerIndex === -1) {
        console.log("jump to first layer and first corner");
        setSelectedLayer(layerList[0]);
        setSelectedCorner(0);
      } else if (
        // If last point and next layer exists: Jump to next layer and first corner
        selectedCorner === cornersLength - 1 &&
        selectedLayerIndex < layerList.length
      ) {
        console.log(
          " If last point and next layer exists: Jump to next layer and first corner",
          selectedCorner + 1
        );
        setSelectedLayer(layerList[selectedLayerIndex + 1]);
        setSelectedCorner(0);
      } else if (
        // If last point and no next layer: Jump to first layer and first corner
        selectedLayerIndex === layerList.length &&
        selectedCorner === cornersLength
      ) {
        console.log(
          "If last point and no next layer: Jump to first layer and first corner: jump to first layer and first corner"
        );
        setSelectedLayer(layerList[0]);
        setSelectedCorner(0);
      } else {
        console.log("jump to next corner", selectedCorner + 1);
        // Jump to next corner
        setSelectedCorner(selectedCorner + 1);
      }

      console.log("jump result", selectedLayerIndex, selectedCorner);
    }

    // Backwards
    if (event.keyCode === 81) {
      const layerList = Object.keys(dataState);
      const selectedLayerIndex = layerList.indexOf(selectedLayer);
      // Jump to previous layer and last corner
      if (selectedCorner === 0 && selectedLayerIndex !== 0) {
        setSelectedLayer(layerList[selectedLayerIndex - 1]);
        setSelectedCorner(cornersLength - 1);
        // Jump to last corner
      } else if (selectedCorner === 0) {
        setSelectedCorner(cornersLength - 1);
      } else {
        setSelectedCorner(selectedCorner - 1);
      }
    }
  };

  React.useEffect(() => {
    if (edit) window.addEventListener("keydown", registerKeyPressProjection);
    return () => {
      if (edit)
        window.removeEventListener("keydown", registerKeyPressProjection);
    };
  }, [registerKeyPressProjection]);

  React.useEffect(() => {
    setDataState(data);
  }, [data]);

  type CornerType = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];

  type LayerType = {
    id: string;
    corners?: CornerType;
    zIndex?: number;
    isEnd?: boolean;
  };

  const updateLayer = ({ id, corners, isEnd, zIndex }: LayerType) => {
    setDataState((state) => {
      const newObject = state?.[id] ? { ...state[id] } : {};
      if (zIndex !== undefined) newObject["zIndex"] = zIndex;
      if (corners) newObject["corners"] = corners;

      onChange &&
        onChange({
          layers: { ...state, [id]: newObject },
          isEnd,
        });

      return {
        ...state,
        [id]: newObject,
      };
    });
  };

  const ctx = {
    ...defaultProjectionContext,
    ...props,
    data: dataState,
    edit,
    enabled,
    updateLayer,
    selectedLayer,
    selectedCorner,
    setSelectedLayer,
    setSelectedCorner,
  };

  return (
    <ProjectionContext.Provider value={ctx}>
      {children}
    </ProjectionContext.Provider>
  );
};

export default Projection;
