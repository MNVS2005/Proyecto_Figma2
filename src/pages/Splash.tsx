import {
  IonPage,
  IonContent
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const Splash: React.FC = () => {
  const history = useHistory();
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 600);
    const t2 = setTimeout(() => setShowText(true), 1600);
    const t3 = setTimeout(() => history.replace("/tab1"), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="splash-content">
        <div className={`logo ${showLogo ? "show" : ""}`} ref={logoRef}>
          <img src="/assets/logo.png" alt="Logo" />
        </div>

        <div className={`welcome-text ${showText ? "show" : ""}`} ref={textRef}>
          ¡Te damos la bienvenida!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
