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
  IonSearchbar
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
    id: 1,
    name: "Pizza Margarita",
    description: "Clásica pizza italiana con sabores tradicionales",
    ingredients: "Tomate, mozzarella, albahaca",
    price: 8.99,
    image: "/margarita.png"
  },
  {
    id: 2,
    name: "Pizza Pepperoni",
    description: "La favorita de todos con extra de pepperoni",
    ingredients: "Tomate, mozzarella, pepperoni",
    price: 10.99,
    image: "/pepperoni.png"
  },
  {
    id: 3,
    name: "Pizza Hawaiana",
    description: "Dulce y salada, una combinación única",
    ingredients: "Tomate, mozzarella, jamón, piña",
    price: 11.99,
    image: "/hawaiana.png"
  },
  {
    id: 4,
    name: "Pizza Vegetariana",
    description: "Una opción fresca y saludable para los amantes de las verduras",
    ingredients: "Tomate, mozzarella, pimientos, cebolla, champiñones, aceitunas",
    price: 9.99,
    image: "/vegetariana.png"
  },
  {
    id: 5,
    name: "Pizza BBQ de pollo",
    description: "Sabor ahumado con un toque de barbacoa",
    ingredients: "Salsa BBQ, mozzarella, pollo, cebolla roja, cilantro",
    price: 12.99,
    image: "/bbq pollo.png"
  },
  {
    id: 6,
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
  const [search, setSearch] = useState(""); // Estado para búsqueda

  // Filtra las pizzas según el término de búsqueda
  const filteredPizzas = search.trim() === ""
    ? pizzas
    : pizzas.filter(
        (pizza) =>
          pizza.name.toLowerCase().includes(search.toLowerCase()) ||
          pizza.ingredients.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000", color: "white" }}>
          <IonTitle>
            ¡Bienvenido/a a PizzUp! <br />
            <div style={{ fontSize: "14px" }}>¿Qué desea?</div>
          </IonTitle>
            {/* Input de búsqueda */}
          <div style={{ flex: 1, maxWidth: 300, margin: "0 16px" }}>
            <IonSearchbar
              value={search}
              onIonChange={e => setSearch(e.detail.value!)}
              placeholder="Buscar pizza..."
              inputmode="search"
              style={{ "--background": "#fff3e0", "--color": "#d50000", borderRadius: 20 }}
            />
          </div>

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
        {filteredPizzas.map((pizza) => (
          <IonCol size="12" sizeMd="6" sizeLg="4" key={pizza.id}>
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
