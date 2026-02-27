import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList
} from "@ionic/react";
import { arrowBack, cart } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";

const specialOffers = [
  { id: 1, name: "Pizza Margarita", description: "¡OFERTA! Clásica pizza italiana - 50% OFF", ingredients: "Tomate, mozzarella, albahaca", price: 4.49, image: "/margarita.png" },
  { id: 2, name: "Pizza Pepperoni", description: "¡OFERTA! Extra de pepperoni - 40% OFF", ingredients: "Tomate, mozzarella, pepperoni", price: 6.59, image: "/pepperoni.png" },
  { id: 3, name: "Pizza Hawaiana", description: "¡OFERTA! Dulce y salada - 35% OFF", ingredients: "Tomate, mozzarella, jamón, piña", price: 7.79, image: "/hawaiana.png" },
  { id: 4, name: "Pizza BBQ de pollo", description: "¡OFERTA! Sabor ahumado - 30% OFF", ingredients: "Salsa BBQ, mozzarella, pollo, cebolla roja, cilantro", price: 9.09, image: "/bbq pollo.png" },
  { id: 5, name: "Pizza 4 Carnes", description: "¡OFERTA! Cuatro tipos de carne - 35% OFF", ingredients: "Carne molida, jamón, salchicha, chorizo", price: 8.99, image: "/4 carnes.png" },
  { id: 6, name: "Pizza Vegetariana", description: "¡OFERTA! Fresca y saludable - 25% OFF", ingredients: "Tomate, mozzarella, pimientos, cebolla, champiñones, aceitunas", price: 7.49, image: "/vegetariana.png" }
];

const extrasList = [
  { name: "Extra queso", price: 1 },
  { name: "Extra pepperoni", price: 1.5 },
  { name: "Extra bacon", price: 1.5 },
  { name: "Champiñones extra", price: 1 }
];

const OfertaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addItem, items } = useCart();

  const oferta = specialOffers.find((o) => o.id === Number(id));

  const [reviews, setReviews] = useState([
    { user: "María", text: "¡Increíble precio!", likes: 3, stars: 5, date: "2024-02-15" }
  ]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!oferta) return <IonPage><IonContent>Oferta no encontrada</IonContent></IonPage>;

  const extrasPrice = selectedExtras.reduce((acc, extraName) => {
    const found = extrasList.find(e => e.name === extraName);
    return acc + (found?.price || 0);
  }, 0);

  const finalPrice = (oferta.price + extrasPrice).toFixed(2);

  const handleAddToCart = () => {
    addItem({
      name: oferta.name,
      price: Number(finalPrice),
      quantity: 1,
      image: oferta.image,
      size: "Mediana",
      extras: selectedExtras
    });
    setIsCartOpen(true);
  };

  const handleSendReview = () => {
    if (!reviewText.trim() || selectedStars === 0) return;

    const newReview = {
      user: "Juan Pérez",
      text: reviewText,
      likes: 0,
      stars: selectedStars,
      date: new Date().toISOString().split("T")[0]
    };

    setReviews([...reviews, newReview]);
    setReviewText("");
    setSelectedStars(0);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonButton onClick={() => history.push("/ofertas")}>
              <IonIcon icon={arrowBack} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle style={{ color: "white" }}>{oferta.name}</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={() => setIsCartOpen(true)} style={{ position: "relative" }}>
              <IonIcon icon={cart} style={{ color: "white", fontSize: "24px" }} />

              {items.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    backgroundColor: "#ff8a50",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}
                >
                  {items.length}
                </div>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <img src={oferta.image} alt={oferta.name} style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />

        <h2>{oferta.name}</h2>
        <p>{oferta.description}</p>
        <p><strong>Ingredientes:</strong> {oferta.ingredients}</p>
        <p><strong>Tamaño:</strong> Mediana</p>

        <h3>Extras</h3>
        <IonList>
          {extrasList.map((extra, index) => (
            <IonItem key={index}>
              <IonLabel>{extra.name} (+{extra.price}€)</IonLabel>
              <IonCheckbox
                slot="start"
                checked={selectedExtras.includes(extra.name)}
                onIonChange={e => {
                  if (e.detail.checked) setSelectedExtras([...selectedExtras, extra.name]);
                  else setSelectedExtras(selectedExtras.filter(x => x !== extra.name));
                }}
              />
            </IonItem>
          ))}
        </IonList>

        <h3 style={{ marginTop: "20px" }}>Precio final: {finalPrice}€</h3>

        <IonButton
          expand="block"
          color="success"
          onClick={handleAddToCart}
          style={{ marginTop: "20px" }}
        >
          <IonIcon icon={cart} slot="start" />
          Añadir al carrito
        </IonButton>

        <h3 style={{ marginTop: "30px" }}>Reseñas</h3>

        {reviews.map((review, index) => {
          const isLiked = likedReviews.includes(index);
          return (
            <div key={index} style={{ background: "#f4f4f4", padding: "12px", borderRadius: "8px", marginBottom: "10px", display: "flex", gap: "12px" }}>
              <img src="/default-avatar.png" alt="avatar" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              <div style={{ flex: 1 }}>
                <strong style={{ cursor: "pointer", color: "#d50000" }} onClick={() => history.push("/profile")}>
                  {review.user}
                </strong>
                <p style={{ margin: "4px 0" }}>
                  {"⭐".repeat(review.stars) + "☆".repeat(5 - review.stars)}
                </p>
                <p>{review.text}</p>

                <IonButton
                  size="small"
                  fill="clear"
                  color={isLiked ? "medium" : "danger"}
                  onClick={() => {
                    const updated = [...reviews];
                    if (isLiked) {
                      updated[index].likes--;
                      setLikedReviews(likedReviews.filter(i => i !== index));
                    } else {
                      updated[index].likes++;
                      setLikedReviews([...likedReviews, index]);
                    }
                    setReviews(updated);
                  }}
                >
                  {isLiked ? `❤️ ${review.likes}` : `🤍 ${review.likes}`}
                </IonButton>
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <h4>Escribe tu reseña</h4>

          <p>Selecciona estrellas:</p>
          <div style={{ marginBottom: "10px" }}>
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                style={{ cursor: "pointer", fontSize: "24px", color: num <= selectedStars ? "#ff9800" : "#ccc" }}
                onClick={() => setSelectedStars(num)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Escribe tu opinión aquí..."
            style={{ width: "100%", height: "80px", borderRadius: "8px", padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}
          />

          <IonButton expand="block" color="primary" onClick={handleSendReview}>
            Enviar reseña
          </IonButton>

          <IonButton
            expand="block"
            color="danger"
            style={{ marginTop: "20px" }}
            onClick={() => history.push("/ofertas")}
          >
            Volver
          </IonButton>
        </div>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      </IonContent>
    </IonPage>
  );
};

export default OfertaDetail;
