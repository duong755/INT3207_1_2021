import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Info.scss";

const MEMBERS = [
  {
    studentId: "17020191",
    name: "Ngô Quang Dương",
  },
  {
    studentId: "18020877",
    name: "Nguyễn Văn Mạnh",
  },
  {
    studentId: "18020044",
    name: "Phạm Tuấn Nghĩa",
  },
  {
    studentId: "18021186",
    name: "Vương Tiến Thành",
  },
  {
    studentId: "18020265",
    name: "Nguyễn Đức Quốc Đại",
  },
];

const Info: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Thành viên</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Thành viên</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {MEMBERS.map((member) => {
            return (
              <IonItem key={member.studentId}>
                <IonLabel>
                  <h2>{member.name}</h2>
                  <p>{member.studentId}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Info;
