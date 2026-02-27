import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon
} from "@ionic/react";
import { remove, add } from "ionicons/icons";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useHistory } from "react-router-dom";

interface PizzaProps {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  image: string;
}

const PizzaCard: React.FC<PizzaProps> = ({
  id,
  name,
  description,
  ingredients,
  price,
  image,
}) => {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const history = useHistory();

  const handleAddToCart = () => {
    addItem({
      name,
      price,
      quantity: qty,
      image
    });
    setQty(1);
  };

  return (
    <IonCard
      button
      onClick={() => history.push(`/pizza/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover"
        }}
      />

      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{description}</p>
        <small><strong>Ingredientes:</strong> {ingredients}</small>

        <h2 style={{ color: "red", marginTop: "8px" }}>
          {price.toFixed(2)}€
        </h2>

        {/* ⭐ Bootstrap + Ionic juntos */}
        <div className="d-flex align-items-center gap-2">

          {/* Botón restar */}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setQty(q => Math.max(1, q - 1));
            }}
          >
            <IonIcon icon={remove} />
          </button>

          {/* Cantidad */}
          <span className="fw-bold">{qty}</span>

          {/* Botón sumar */}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setQty(q => q + 1);
            }}
          >
            <IonIcon icon={add} />
          </button>

          {/* Botón agregar */}
          <button
            className="btn btn-danger btn-sm ms-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Agregar
          </button>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PizzaCard;
