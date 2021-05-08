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
  }, []);

  return <div className="container" id="mapContainer"></div>;
};

export default ExploreContainer;
