import { useLocation } from "react-router-dom";
import { IonContent, IonPage, useIonViewDidEnter } from "@ionic/react";
import { TheMap } from "../components/TheMap";
import "./Main.scss";

const Main: React.FC = () => {
  const routerLocation = useLocation<{ destination: [number | undefined, number | undefined] }>();

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <TheMap destination={routerLocation.state?.destination} />
      </IonContent>
    </IonPage>
  );
};

export default Main;
