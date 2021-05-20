import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { TheMap } from "../components/TheMap";
import "./Main.scss";

const Tab1: React.FC = () => {
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon slot="start" className="icon-search-button" icon={searchOutline} size="large" />
          <IonTitle>The Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TheMap />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
