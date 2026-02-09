import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonButton
} from "@ionic/react";

import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <IonAvatar style={{ margin: "0 auto", width: "100px", height: "100px" }}>
            <img src="https://i.pravatar.cc/150?img=3" alt="avatar" />
          </IonAvatar>
        </div>

        <IonItem>
          <IonLabel>
            <h2>Juan Pérez</h2>
            <p>juan@email.com</p>
          </IonLabel>
        </IonItem>

        <IonButton
            expand="block"
            color="danger"
            style={{ marginTop: "20px" }}
            onClick={() => {
              localStorage.removeItem("isAuth"); // 🔐 borrar sesión
              history.push("/login");         // 🚀 ir al login
            }} >
  Cerrar sesión
</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
