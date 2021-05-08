import { useEffect } from "react";

import "./ExploreContainer.scss";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  useEffect(() => {
    const API_KEY = "GqfwrZUEfxbwbnQUhtBMFivEysYIxelQ";
    const map = new window.wemapgl.WeMap({
      key: API_KEY,
      container: "mapContainer",
    });

    // this spreads the map to entire screen
    map.once("load", function() {
      window.dispatchEvent(new Event("resize"));
    });
  }, []);

  return <div className="container" id="mapContainer"></div>;
};

export default ExploreContainer;
