import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonSearchbar } from "@ionic/react";
import PizzaCard from "../components/PizzaCard";
import { personCircle, cart } from "ionicons/icons";
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
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#d50000" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h4 text-white" style={{ cursor: "default" }}>
            ¡Bienvenido a PizzaUP
            <div style={{ fontSize: "14px" }}>¿Qué desea?</div>
          </span>

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

          <div className="d-flex align-items-center">
            <button className="btn btn-link text-white position-relative me-2" onClick={() => setIsCartOpen(true)} style={{ textDecoration: "none" }}>
              <IonIcon icon={cart} style={{ fontSize: "28px", color: "white" }} />
              {items.length > 0 && (
                <span className="badge bg-warning text-dark position-absolute" style={{ top: "0", right: "0", transform: "translate(50%,-50%)" }}>
                  {items.length}
                </span>
              )}
            </button>

            <button className="btn btn-link text-white" onClick={() => history.push("/profile")} style={{ textDecoration: "none" }}>
              <IonIcon icon={personCircle} style={{ fontSize: "28px", color: "white" }} />
            </button>
          </div>
        </div>
      </nav>

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
            {filteredPizzas.map((pizza, index) => (
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
