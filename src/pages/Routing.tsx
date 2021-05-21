import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

import "./Routing.scss";

const Routing: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chỉ đường</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Routing;
