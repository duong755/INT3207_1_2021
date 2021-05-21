import { useEffect } from "react";

import "./TheMap.scss";
import { API_KEY } from "../constants/wemap";

const TheMap: React.FC<any> = () => {
  useEffect(() => {
    const map = new window.wemapgl.WeMap({
      key: API_KEY,
      container: "mapContainer",
    });
    window.dispatchEvent(new Event("resize"));
    // this spreads the map to entire screen
    map.once("load", function () {
      window.dispatchEvent(new Event("resize"));
    });
    const directions = new window.wemapgl.WeDirections({
      key: API_KEY,
      controls: {
        instructions: false,
      }
    });
    map.addControl(directions, "top-left");
  }, []);

  return <div className="container" id="mapContainer"></div>;
};

export { TheMap };
