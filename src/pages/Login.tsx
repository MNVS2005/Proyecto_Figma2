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
    // Acceso sin verificación ni API
    localStorage.setItem("isAuth", "true");
    history.replace("/tab1");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="alert alert-danger py-1 text-center">{error}</div>
        )}
        <button type="submit" className="btn btn-danger w-100 mt-2">Entrar</button>
      </form>
      <div className="text-center mt-3">
        ¿No tienes cuenta? <a href="/signup">Regístrate</a>
      </div>
    </div>
  );
};

export default Login;
