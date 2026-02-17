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
import { personCircle, cart } from "ionicons/icons";
import { IonIcon, IonButtons } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";
import { useState } from "react";
const pizzas = [
  {
    name: "Pizza Margarita",
    description: "Clásica pizza italiana con sabores tradicionales",
    ingredients: "Tomate, mozzarella, albahaca",
    price: 8.99,
    image: "/margarita.png"
  },
  {
    name: "Pizza Pepperoni",
    description: "La favorita de todos con extra de pepperoni",
    ingredients: "Tomate, mozzarella, pepperoni",
    price: 10.99,
    image: "/pepperoni.png"
  },
  {
    name: "Pizza Hawaiana",
    description: "Dulce y salada, una combinación única",
    ingredients: "Tomate, mozzarella, jamón, piña",
    price: 11.99,
    image: "/hawaiana.png"
  },
  {
    name: "Pizza Vegetariana",
    description: "Una opción fresca y saludable para los amantes de las verduras",
    ingredients: "Tomate, mozzarella, pimientos, cebolla, champiñones, aceitunas",
    price: 9.99,
    image: "/vegetariana.png"
  },
  {
    name: "Pizza BBQ de pollo",
    description: "Sabor ahumado con un toque de barbacoa",
    ingredients: "Salsa BBQ, mozzarella, pollo, cebolla roja, cilantro",
    price: 12.99,
    image: "/bbq pollo.png"
  },
  {
    name:"Pizza 4 Carnes",
    description: "Para los amantes de la carne, una explosión de sabor",
    ingredients: "Tomate, mozzarella, pepperoni, jamón, salchicha, bacon",
    price: 13.99,
    image: "/4 carnes.png"
  }
  
];

const Tab1: React.FC = () => {
  const history = useHistory();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000", color: "white" }}>
          <IonTitle>
            ¡Bienvenido a PizzaUP <br />
            <div style={{ fontSize: "14px" }}>¿Qué desea?</div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsCartOpen(true)} style={{ position: "relative" }}>
              <IonIcon icon={cart} style={{ fontSize: "28px", color: "white" }} />
              {items.length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  backgroundColor: "#ff8a50",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  {items.length}
                </div>
              )}
            </IonButton>
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
            onClick={() => history.push("/ofertas")}
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

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </IonPage>
  );
};

export default Tab1;
