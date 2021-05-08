import { useEffect } from "react";

import "./ExploreContainer.scss";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  useEffect(() => {
    new window.wemapgl.WeMap({ key: "GqfwrZUEfxbwbnQUhtBMFivEysYIxelQ", container: "mapContainer" });
  }, []);

  return <div className="container" id="mapContainer"></div>;
};

export default ExploreContainer;
