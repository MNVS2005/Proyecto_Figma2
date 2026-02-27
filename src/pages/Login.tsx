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
  IonText
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { useUser } from "../context/UserContext";

const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setError(null);

    if (!email || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    login();
    history.replace("/profile");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle style={{ color: "white" }}>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem style={{ marginTop: "15px" }}>
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
          style={{ marginTop: "25px" }}
          onClick={handleLogin}
        >
          Entrar
        </IonButton>

        <IonText style={{ display: "block", marginTop: "20px", textAlign: "center" }}>
          ¿No tienes cuenta?
        </IonText>

        <IonButton
          expand="block"
          fill="clear"
          color="primary"
          onClick={() => history.push("/signup")}
        >
          Registrarse
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Login;
