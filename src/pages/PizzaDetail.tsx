import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonButtons,
  IonIcon
} from "@ionic/react";
import { arrowBack, cart } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartModal from "../components/CartModal";

const pizzas = [
  { id: 1, name: "Pizza Margarita", description: "Clásica pizza italiana con sabores tradicionales", ingredients: "Tomate, mozzarella, albahaca", price: 8.99, image: "/margarita.png" },
  { id: 2, name: "Pizza Pepperoni", description: "La favorita de todos con extra de pepperoni", ingredients: "Tomate, mozzarella, pepperoni", price: 10.99, image: "/pepperoni.png" },
  { id: 3, name: "Pizza Hawaiana", description: "Dulce y salada, una combinación única", ingredients: "Tomate, mozzarella, jamón, piña", price: 11.99, image: "/hawaiana.png" },
  { id: 4, name: "Pizza Vegetariana", description: "Una opción fresca y saludable", ingredients: "Tomate, mozzarella, pimientos, cebolla, champiñones, aceitunas", price: 9.99, image: "/vegetariana.png" },
  { id: 5, name: "Pizza BBQ de pollo", description: "Sabor ahumado con un toque de barbacoa", ingredients: "Salsa BBQ, mozzarella, pollo, cebolla roja, cilantro", price: 12.99, image: "/bbq pollo.png" },
  { id: 6, name:"Pizza 4 Carnes", description: "Para los amantes de la carne", ingredients: "Tomate, mozzarella, pepperoni, jamón, salchicha, bacon", price: 13.99, image: "/4 carnes.png" }
];

const reviewsData = {
  1: [
    { user: "María", text: "¡Deliciosa! La masa está perfecta.", likes: 3, stars: 5, date: "2024-01-12" },
    { user: "Carlos", text: "Muy buena, pero le pondría más queso.", likes: 1, stars: 4, date: "2024-01-15" }
  ],
  2: [
    { user: "Lucía", text: "La mejor pepperoni que he probado.", likes: 5, stars: 5, date: "2024-02-01" }
  ],
  3: [],
  4: [],
  5: [],
  6: []
};

const extrasList = [
  { name: "Extra queso", price: 1 },
  { name: "Extra pepperoni", price: 1.5 },
  { name: "Extra bacon", price: 1.5 },
  { name: "Champiñones extra", price: 1 }
];

const sizes = [
  { name: "Pequeña", price: 0 },
  { name: "Mediana", price: 2 },
  { name: "Familiar", price: 4 }
];

const PizzaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  // ✔️ USAMOS addItem, NO addToCart
  const { addItem, items } = useCart();

  const pizzaId = parseInt(id, 10);
  const pizza = pizzas.find(p => p.id === pizzaId);

  const [reviews, setReviews] = useState(reviewsData[pizzaId]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("Pequeña");
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (!pizza) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Pizza no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No hemos encontrado esa pizza.</p>
          <IonButton onClick={() => history.push("/tab1")}>
            Volver al inicio
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const renderStars = (count: number) =>
    "⭐".repeat(count) + "☆".repeat(5 - count);

  const basePrice = pizza.price;
  const sizePrice = sizes.find(s => s.name === selectedSize)?.price || 0;
  const extrasPrice = selectedExtras.reduce((acc, extra) => {
    const found = extrasList.find(e => e.name === extra);
    return acc + (found?.price || 0);
  }, 0);

  const finalPrice = (basePrice + sizePrice + extrasPrice).toFixed(2);

  // ✔️ AHORA SÍ AÑADE AL CARRITO
  const handleAddToCart = () => {
    addItem({
      name: pizza.name,
      price: Number(finalPrice),
      quantity: 1,
      image: pizza.image
    });

    setIsCartOpen(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>

          <IonTitle style={{ color: "white" }}>{pizza.name}</IonTitle>

          {/* ✔️ ICONO DEL CARRITO CON BADGE */}
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

        <img
          src={pizza.image}
          alt={pizza.name}
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        />

        <h1>{pizza.name}</h1>
        <p>{pizza.description}</p>

        <p>
          <strong>Ingredientes:</strong> {pizza.ingredients}
        </p>

        <h2 style={{ color: "red", marginTop: "20px" }}>
          {pizza.price.toFixed(2)}€
        </h2>

        <h2 style={{ marginTop: "25px" }}>Tamaño</h2>

        <IonRadioGroup
          value={selectedSize}
          onIonChange={(e) => setSelectedSize(e.detail.value)}
        >
          {sizes.map((size, index) => (
            <IonItem key={index}>
              <IonLabel>{size.name} (+{size.price}€)</IonLabel>
              <IonRadio slot="start" value={size.name} />
            </IonItem>
          ))}
        </IonRadioGroup>

        <h2 style={{ marginTop: "25px" }}>Extras</h2>

        {extrasList.map((extra, index) => (
          <IonItem key={index}>
            <IonLabel>{extra.name} (+{extra.price}€)</IonLabel>
            <IonCheckbox
              slot="start"
              checked={selectedExtras.includes(extra.name)}
              onIonChange={(e) => {
                if (e.detail.checked) {
                  setSelectedExtras([...selectedExtras, extra.name]);
                } else {
                  setSelectedExtras(selectedExtras.filter(x => x !== extra.name));
                }
              }}
            />
          </IonItem>
        ))}

        <h2 style={{ marginTop: "25px", color: "green" }}>
          Precio final: {finalPrice}€
        </h2>

        {/* ✔️ BOTÓN VERDE IGUAL QUE OFERTASDETAIL */}
        <IonButton
          expand="block"
          color="success"
          onClick={handleAddToCart}
          style={{ marginTop: "20px" }}
        >
          <IonIcon icon={cart} slot="start" />
          Añadir al carrito
        </IonButton>

        <h2 style={{ marginTop: "30px" }}>Reseñas</h2>

        {reviews.length === 0 && (
          <p>No hay reseñas todavía. ¡Sé el primero en opinar!</p>
        )}

        {reviews.map((review, index) => {
          const isLiked = likedReviews.includes(index);

          return (
            <div
              key={index}
              style={{
                background: "#f4f4f4",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start"
              }}
            >
              <img
                src="/default-avatar.png"
                alt="avatar"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />

              <div style={{ flex: 1 }}>
                <strong
                  style={{ cursor: "pointer", color: "#d50000" }}
                  onClick={() => history.push("/profile")}
                >
                  {review.user}
                </strong>

                {/* ✔️ ESTRELLAS IGUALES QUE OFERTASDETAIL */}
                <p style={{ margin: "5px 0" }}>
                  {"⭐".repeat(review.stars) + "☆".repeat(5 - review.stars)}
                </p>

                <p>{review.text}</p>

                <small style={{ display: "block", marginBottom: "8px" }}>
                  📅 {review.date}
                </small>

                {/* ✔️ CORAZONES IGUALES QUE OFERTASDETAIL */}
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

        <h3 style={{ marginTop: "20px" }}>Escribe tu reseña</h3>

        <p>Selecciona estrellas:</p>

        <div style={{ fontSize: "24px", marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              style={{
                cursor: "pointer",
                color: num <= selectedStars ? "#ff9800" : "#ccc"
              }}
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
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        />

        <IonButton
          expand="block"
          color="primary"
          onClick={() => {
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
          }}
        >
          Enviar reseña
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: "20px" }}
          onClick={() => history.goBack()}
        >
          Volver
        </IonButton>

        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      </IonContent>
    </IonPage>
  );
};

export default PizzaDetail;
