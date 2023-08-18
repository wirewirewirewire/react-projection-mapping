import * as React from "react";
import { useState, createContext, PropsWithChildren } from "react";

// import { updateArticle } from "api/api";

const defaultDistortContext = {
  initialized: false,
  theme: `light`,
  actualTheme: `light`,
  article: {},
  updateDistortion: ({ id, corners }: any) => {
    console.warn("setTheme not initialized");
  },
};

export interface DistortContextInterface {
  article: any;
  updateDistortion: ({ id, corners }: any) => void;
}

export const DistortControlContext = createContext<DistortContextInterface>(
  defaultDistortContext
);

/** The UN Core props are basic properties for the provider */
type UNCoreProps = PropsWithChildren<{
  data?: any;
}>;

export const DistortControl: React.FC<UNCoreProps> = ({
  children,
  data,
  ...props
}) => {
  const [articleData, setArticleData] = useState(data);
  const [disableUpdate, setDisableUpdate] = useState(false);

  /*
  React.useEffect(() => {
    setArticleData(data);
  }, [data]);*/

  /* useSubscription(POST_UPDATED, {
    client: subClient,
    onError: (err) => console.error(err),
    onSubscriptionData: ({ subscriptionData }) => {
      if (disableUpdate) return;
      setArticleData({ ...articleData, ...subscriptionData.data.postUpdated });
    },
  }); */

  const updateDistortion = async ({ id, corners, isEnd }: any) => {
    const newJson = articleData || {};
    if (!newJson?.distort) newJson.distort = {};
    newJson.distort[id] = corners;
    setDisableUpdate(true);
    setArticleData({ ...articleData, ...newJson });

    if (isEnd === true) {
      // console.log("updateArticle", newJson, articleData);
      /* await updateArticle({
        id: article?.id,
        data: newJson,
      });*/
    }
  };

  const ctx = {
    ...defaultDistortContext,
    ...props,
    article: articleData,
    updateDistortion,
    initialized: true,
  };
  return (
    <DistortControlContext.Provider value={ctx}>
      {children}
    </DistortControlContext.Provider>
  );
};
