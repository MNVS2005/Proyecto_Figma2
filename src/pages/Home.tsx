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
import margaritaImg from "/assets/margarita.png";
import pepperoniImg from "/assets/pepperoni.png";
import hawaianaImg from "/assets/hawaiana.png";
const pizzas = [
  {
    name: "Pizza Margarita",
    description: "Clásica pizza italiana con sabores tradicionales",
    ingredients: "Tomate, mozzarella, albahaca",
    price: 8.99,
    image: margaritaImg
  },
  {
    name: "Pizza Pepperoni",
    description: "La favorita de todos con extra de pepperoni",
    ingredients: "Tomate, mozzarella, pepperoni",
    price: 10.99,
    image: pepperoniImg
  },
  {
    name: "Pizza Hawaiana",
    description: "Dulce y salada, una combinación única",
    ingredients: "Tomate, mozzarella, jamón, piña",
    price: 11.99,
    image: hawaianaImg
  }
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000", color: "white" }}>
          <IonTitle>
            ¡Bienvenido/a, USERNAME! <br />
            <small>¿Qué desea?</small>
          </IonTitle>
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

export default Home;
