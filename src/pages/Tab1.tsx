import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from "@ionic/react";

import PizzaCard from "../components/PizzaCard";
import { personCircle } from "ionicons/icons";
import { IonIcon, IonButtons } from "@ionic/react";
import { useHistory } from "react-router-dom";
const pizzas = [
  {
    name: "Pizza Margarita",
    description: "Clásica pizza italiana con sabores tradicionales",
    ingredients: "Tomate, mozzarella, albahaca",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1601924928584-63b9d90a8b6f"
  },
  {
    name: "Pizza Pepperoni",
    description: "La favorita de todos con extra de pepperoni",
    ingredients: "Tomate, mozzarella, pepperoni",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953c"
  },
  {
    name: "Pizza Hawaiana",
    description: "Dulce y salada, una combinación única",
    ingredients: "Tomate, mozzarella, jamón, piña",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65"
  }
];

const Tab1: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000", color: "white" }}>
          <IonTitle>
            ¡Bienvenido a PizzaUP <br />
            <div style={{ fontSize: "14px" }}>¿Qué desea?</div>
          </IonTitle>
          <IonButtons slot="end">
              <IonButton onClick={() => history.push("/profile")}>
                <IonIcon icon={personCircle} style={{ fontSize: "28px", color: "white" }} />
              </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: "16px", textAlign: "center" }}>
          <IonButton
            shape="round"
            size="large"
            style={{ "--background": "#ff8a50" }}
          >
            ¡OFERTAS ESPECIALES!
          </IonButton>
        </div>

        <IonGrid>
          <IonRow>
            {pizzas.map((pizza, index) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={index}>
                <PizzaCard {...pizza} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
