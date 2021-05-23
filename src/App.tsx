import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { informationCircleOutline, map, searchOutline, compassOutline } from "ionicons/icons";

import Main from "./pages/Main";
import Search from "./pages/Search";
import Routing from "./pages/Routing";
import Info from "./pages/Info";
import { API_KEY } from "./constants/wemap";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

const App: React.FC = () => {
  useEffect(() => {
    const map = new window.wemapgl.WeMap({
      key: API_KEY,
      container: "hiddenMap",
    });
    const directions = new window.wemapgl.WeDirections({
      key: API_KEY,
    });
    map.addControl(directions, "top-left");
    window.wemapgl.thedirections = directions;
  }, []);

  return (
    <IonApp>
      <div id="hiddenMap" style={{ display: "none" }}></div>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/map">
              <Main />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/routing">
              <Routing />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route exact path="/">
              <Redirect to="/map" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="map" href="/map">
              <IonIcon icon={map} />
              <IonLabel>Bản đồ</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={searchOutline} />
              <IonLabel>Tìm kiếm</IonLabel>
            </IonTabButton>
            <IonTabButton tab="routing" href="/routing">
              <IonIcon icon={compassOutline}></IonIcon>
              <IonLabel>Lộ trình</IonLabel>
            </IonTabButton>
            <IonTabButton tab="info" href="/info">
              <IonIcon icon={informationCircleOutline} />
              <IonLabel>Thông tin khác</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
