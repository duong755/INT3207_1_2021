import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonIcon,
  IonList,
  IonItem,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import "./Routing.scss";
import { RouteContext } from "../context/Route";
import { InstructionIcon } from "../components/InstructionIcon";

function distanceToString(distance: number): string {
  if (distance >= 100) {
    return (distance/1000).toFixed(2).toString() + "km";
  }

  return distance.toFixed(0).toString() + "m";
}

const Routing: React.FC = () => {
  const { routeData } = useContext(RouteContext);
  const routerHistory = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lộ trình</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {routeData === undefined && (
          <div className="no-route">
            <IonIcon icon={arrowBack} size="large" onClick={() => routerHistory.push("/map")} />
            <IonText>Quay lại bản đồ để chọn đường</IonText>
          </div>
        )}
        {routeData instanceof Array && (
          <>
            <IonList lines="full">
              <IonListHeader>
                {(routeData[0].distance / 1000).toPrecision(2)}km - {(routeData[0].duration / 60).toFixed(0)} phút
              </IonListHeader>
              {routeData[0].legs[0].steps.map((step, index, array) => {
                return (
                  <IonItem key={step.distance}>
                    <IonLabel>
                      <h2 className="step">
                        <InstructionIcon name={step.maneuver.modifier} />
                        &nbsp;
                        <div>
                          {index === 0 && "(Điểm đầu)"}
                          {index + 1 === array.length && "(Điểm cuối)"}
                          {step.maneuver.instruction}
                          <p>{distanceToString(step.distance)}</p>
                        </div>
                      </h2>
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Routing;
