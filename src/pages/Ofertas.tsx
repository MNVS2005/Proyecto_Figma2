import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
  IonIcon
} from "@ionic/react";
import { arrowBack, cart } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import PizzaCard from "../components/PizzaCard";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";
import { useState } from "react";

const specialOffers = [
  {
    name: "Pizza Margarita",
    description: "¡OFERTA! Clásica pizza italiana con sabores tradicionales - 50% OFF",
    ingredients: "Tomate, mozzarella, albahaca",
    price: 4.49,
    image: "/margarita.png"
  },
  {
    name: "Pizza Pepperoni",
    description: "¡OFERTA! La favorita de todos con extra de pepperoni - 40% OFF",
    ingredients: "Tomate, mozzarella, pepperoni",
    price: 6.59,
    image: "/pepperoni.png"
  },
  {
    name: "Pizza Hawaiana",
    description: "¡OFERTA! Dulce y salada, una combinación única - 35% OFF",
    ingredients: "Tomate, mozzarella, jamón, piña",
    price: 7.79,
    image: "/hawaiana.png"
  },
  {
    name: "Pizza BBQ de pollo",
    description: "¡OFERTA! Sabor ahumado con un toque de barbacoa - 30% OFF",
    ingredients: "Salsa BBQ, mozzarella, pollo, cebolla roja, cilantro",
    price: 9.09,
    image: "/bbq%20pollo.png"
  },
  {
    name:"Pizza 4 Carnes",  
    description: "¡OFERTA! Una pizza con cuatro tipos de carne - 35% OFF",
    ingredients: "Carne molida, jamón, salchicha, chorizo",
    price: 8.99,
    image: "/4%20carnes.png"
  },
  {
    name: "Pizza Vegetariana",
    description: "¡OFERTA! Una opción fresca y saludable para los amantes de las verduras - 25% OFF",
    ingredients: "Tomate, mozzarella, pimientos, cebolla, champiñones, aceitunas",
    price: 7.49,
    image: "/vegetariana.png"
  }
];

const Ofertas: React.FC = () => {
  const history = useHistory();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000" } as any}>
          <IonButtons slot="start">
            <IonButton onClick={() => history.push("/tab1")}>
              <IonIcon icon={arrowBack} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>
          <IonTitle style={{ color: "white" }}>¡OFERTAS ESPECIALES!</IonTitle>
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
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: "16px", textAlign: "center" }}>
          <h2 style={{ color: "#d50000" }}>🔥 DESCUENTOS INCREÍBLES 🔥</h2>
          <p style={{ color: "#666" }}>Solo por tiempo limitado</p>
        </div>

        <IonGrid>
          <IonRow>
            {specialOffers.map((pizza, index) => (
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

export default Ofertas;
