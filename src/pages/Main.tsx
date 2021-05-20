import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import { TheMap } from "../components/TheMap";
import "./Main.scss";

const Main: React.FC = () => {
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <TheMap />
      </IonContent>
    </IonPage>
  );
};

export default Main;
