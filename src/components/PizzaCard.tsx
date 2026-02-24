import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonText
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
  const history = useHistory();   // ⭐ ESTA ES LA LÍNEA QUE TE FALTABA

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
    <IonCard onClick={() => history.push(`/pizza/${id}`)}>   {/* ⭐ NAVEGACIÓN */}
      <img src={image} alt={name} style={{
        width: "100%",
        height: "500px",
        objectFit: "cover"
      }} />

      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{description}</p>
        <small><strong>Ingredientes:</strong> {ingredients}</small>

        <h2 style={{ color: "red", marginTop: "8px" }}>
          {price.toFixed(2)}€
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IonButton size="small" onClick={(e) => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}>
            <IonIcon icon={remove} />
          </IonButton>

          <IonText>{qty}</IonText>

          <IonButton size="small" onClick={(e) => { e.stopPropagation(); setQty(q => q + 1); }}>
            <IonIcon icon={add} />
          </IonButton>

          <IonButton
            color="danger"
            style={{ marginLeft: "auto" }}
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
          >
            Agregar
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default PizzaCard;
