import { IonContent, IonHeader, IonPage, IonSearchbar, IonToolbar } from "@ionic/react";
import "./Search.scss";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Search;
