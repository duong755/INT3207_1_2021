import React, { createContext, PropsWithChildren, useState } from "react";
import { RouteDetail } from "../WeDirections";

const RouteContext = createContext<{
  routeData: RouteDetail[] | undefined;
  setRouteData: (route: RouteDetail[] | undefined) => any;
}>({ routeData: [], setRouteData: () => {} });

const RouteProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [routeData, setRouteData] = useState<RouteDetail[] | undefined>();

  return (
    <RouteContext.Provider value={{ routeData: routeData, setRouteData: setRouteData }}>
      {props.children}
    </RouteContext.Provider>
  );
};

export { RouteContext, RouteProvider };
