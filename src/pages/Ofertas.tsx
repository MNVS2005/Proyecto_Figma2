import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
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
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#d50000" }}>
        <div className="container-fluid">
          <button className="btn btn-link text-white me-2" onClick={() => history.push("/tab1")}
            style={{ textDecoration: "none" }}>
            <IonIcon icon={arrowBack} style={{ fontSize: "28px", color: "white" }} />
          </button>
          <span className="navbar-brand mb-0 h4 text-white" style={{ cursor: "default" }}>
            ¡OFERTAS ESPECIALES!
          </span>
          <div className="d-flex align-items-center">
            <button className="btn btn-link text-white position-relative" onClick={() => setIsCartOpen(true)} style={{ textDecoration: "none" }}>
              <IonIcon icon={cart} style={{ fontSize: "28px", color: "white" }} />
              {items.length > 0 && (
                <span className="badge bg-warning text-dark position-absolute" style={{ top: "0", right: "0", transform: "translate(50%,-50%)" }}>
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

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
