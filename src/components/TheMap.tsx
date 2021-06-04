import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useIonViewDidEnter, useIonToast, IonIcon, IonButtons } from "@ionic/react";
import { addOutline, carOutline, chevronForwardCircleOutline, removeOutline } from "ionicons/icons";
import { Geolocation } from "@ionic-native/geolocation";

import "./TheMap.scss";
import { API_KEY, SELECTOR } from "../constants/wemap";
import { RouteContext } from "../context/Route";

const TheMap: React.FC<{ destination: [number | undefined, number | undefined] }> = (props) => {
  const { destination } = props;

  const [enableTraffic, setEnableTraffic] = useState(false);
  const { setRouteData } = useContext(RouteContext);
  const routerHistory = useHistory();

  const [present] = useIonToast();

  useIonViewDidEnter(() => {
    document.querySelector(SELECTOR.BTN_ADD_WAYPOINT)?.setAttribute("href", "javascript:void(0)");
  }, []);

  useEffect(() => {
    if (destination !== void 0 && destination[0] !== undefined && destination[1] !== undefined) {
      (async () => {
        const {
          coords: { latitude, longitude },
        } = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        window.wemapgl.thedirections?.actions.setOriginFromCoordinates([longitude, latitude]);
        if (destination[0] !== undefined && destination[1] !== undefined) {
          window.wemapgl.thedirections?.actions.setDestinationFromCoordinates([destination[1], destination[0]]);
        }
      })();
    }
  }, [destination]);

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
      document.querySelector(SELECTOR.BTN_ADD_WAYPOINT)?.setAttribute("href", "javascript:void(0)");
    });
    const directions = new window.wemapgl.WeDirections({
      key: API_KEY,
      zoom: 15,
      controls: {
        instructions: false,
      },
      flyTo: true,
    });

    directions.on("route", (routeData) => {
      setRouteData(routeData?.route ?? []);
      present({
        duration: 5000,
        animated: true,
        position: "bottom",
        color: "primary",
        message: "",
        buttons: [
          {
            text: "Xem lộ trình",
            handler: () => routerHistory.push("/routing"),
            icon: chevronForwardCircleOutline,
            side: "start",
          },
        ],
      });
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
      if (!enableTraffic) {
        present("Hiển thị mật độ giao thông", 3000);
      }
      setEnableTraffic((enableTraffic) => !enableTraffic);
    },
    [setEnableTraffic, enableTraffic, present]
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
