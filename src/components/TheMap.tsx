import React, { useCallback, useEffect, useState } from "react";

import "./TheMap.scss";
import { API_KEY } from "../constants/wemap";
import { IonButtons, IonIcon } from "@ionic/react";
import { addOutline, carOutline, removeOutline } from "ionicons/icons";

const TheMap: React.FC<any> = () => {
  const [enableTraffic, setEnableTraffic] = useState(false);

  useEffect(() => {
    const map = new window.wemapgl.WeMap({
      key: API_KEY,
      container: "mapContainer",
      zoom: 15,
      reverse: true,
      traffic: enableTraffic,
    });

    // this spreads the map to entire screen
    map.once("load", function () {
      window.dispatchEvent(new Event("resize"));
      document.querySelector("#wemap-directions-add-button > a")?.setAttribute("href", "javascript:void(0)");
    });
    const directions = new window.wemapgl.WeDirections({
      key: API_KEY,
      zoom: 15,
      controls: {
        instructions: false,
      },
    });
    map.addControl(directions, "top-left");

    window.wemapgl.themap = map;
    window.wemapgl.thedirections = directions;
  }, [enableTraffic]);

  const handleZoomIn = useCallback((event: React.MouseEvent) => {
    window.wemapgl.themap?.zoomIn();
  }, []);

  const handleZoomOut = useCallback((event: React.MouseEvent) => {
    window.wemapgl.themap?.zoomOut();
  }, []);

  const handleToggleTraffic = useCallback(
    (event: React.MouseEvent) => {
      setEnableTraffic((enableTraffic) => !enableTraffic);
    },
    [setEnableTraffic]
  );

  return (
    <div className="container" id="mapContainer">
      <IonButtons className="btn-group-zoom">
        <IonIcon slot="icon-only" icon={carOutline} size="large" onClick={handleToggleTraffic}></IonIcon>
        <IonIcon slot="icon-only" icon={addOutline} size="large" onClick={handleZoomIn}></IonIcon>
        <IonIcon slot="icon-only" icon={removeOutline} size="large" onClick={handleZoomOut}></IonIcon>
      </IonButtons>
    </div>
  );
};

export { TheMap };
