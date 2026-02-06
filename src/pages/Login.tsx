import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonTitle,
  IonText
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 🔹 Aquí luego conectas con tu API
    if (email === "test@test.com" && password === "1234") {
      localStorage.setItem("isAuth", "true");
      history.replace("/tab1");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{ marginTop: "80px" }}>
          <IonTitle style={{ textAlign: "center" }}>Iniciar Sesión</IonTitle>

          <IonItem>
            <IonLabel position="floating">Correo</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
            />
          </IonItem>

          {error && (
            <IonText color="danger">
              <p style={{ textAlign: "center" }}>{error}</p>
            </IonText>
          )}

          <IonButton expand="block" style={{ marginTop: "20px" }} onClick={handleLogin}>
            Entrar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
