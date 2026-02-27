import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonButtons,
  IonBackButton
} from "@ionic/react";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Signup: React.FC = () => {
  const history = useHistory();
  const { register } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignup = () => {
    setError(null);

    if (!name || !email || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

  
    register();

  
    history.push("/profile");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle style={{ color: "white" }}>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">Nombre de usuario</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p style={{ marginTop: "10px" }}>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: "20px" }}
          onClick={handleSignup}
        >
          Registrarse
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          color="medium"
          style={{ marginTop: "10px" }}
          onClick={() => history.push("/login")}
        >
          Ya tengo cuenta
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Signup;
