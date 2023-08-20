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

  const registerKeyPress = (event) => {
    // Forwards
    if (event.keyCode === 87) {
      const layerList = Object.keys(dataState);
      const selectedLayerIndex = layerList.indexOf(selectedLayer);
      if (selectedLayerIndex === -1) {
        setSelectedLayer(layerList[0]);
        setSelectedCorner(0);
      } else if (
        selectedCorner === 3 &&
        selectedLayerIndex < layerList.length
      ) {
        setSelectedLayer(layerList[selectedLayerIndex + 1]);
        setSelectedCorner(0);
      } else if (selectedCorner === 3) {
        setSelectedCorner(0);
      } else {
        setSelectedCorner(selectedCorner + 1);
      }
    }

    // Backwards
    if (event.keyCode === 81) {
      const layerList = Object.keys(dataState);
      const selectedLayerIndex = layerList.indexOf(selectedLayer);
      if (selectedCorner === 0 && selectedLayerIndex !== 0) {
        setSelectedLayer(layerList[selectedLayerIndex - 1]);
        setSelectedCorner(0);
      } else if (selectedCorner === 0) {
        setSelectedCorner(3);
      } else {
        setSelectedCorner(selectedCorner - 1);
      }
    }
  };

  React.useEffect(() => {
    if (edit) window.addEventListener("keydown", registerKeyPress);
    return () => {
      if (edit) window.removeEventListener("keydown", registerKeyPress);
    };
  }, [registerKeyPress]);

  React.useEffect(() => {
    setDataState(data);
  }, [data]);

  const updateLayer = ({ id, corners, isEnd, zIndex }: any) => {
    setDataState((state) => {
      onChange && onChange({ layers: { ...state, [id]: corners }, isEnd });
      const newObject = state?.[id] ? { ...state[id] } : {};
      if (zIndex !== undefined) newObject["zIndex"] = zIndex;
      if (corners) newObject["corners"] = corners;

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

  console.log("ProjectionContext", ctx);
  return (
    <ProjectionContext.Provider value={ctx}>
      {children}
    </ProjectionContext.Provider>
  );
};

export default Projection;
