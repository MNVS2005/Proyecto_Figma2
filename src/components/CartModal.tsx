import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonItem,
  IonLabel,
  IonButtons,
  IonList
} from "@ionic/react";
import { close, remove, add, trash } from "ionicons/icons";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal ref={modal} isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar style={{ "--background": "#d50000" } as any}>
          <IonTitle style={{ color: "white" }}>Mi Carrito</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close} style={{ color: "white" }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {items.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", marginTop: "40px" }}>
            <p style={{ color: "#999", fontSize: "16px" }}>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <IonList>
              {items.map((item) => (
                <IonItem key={item.name}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", marginRight: "12px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <IonLabel>
                    <h2>{item.name}</h2>
                    <p>{(item.price * item.quantity).toFixed(2)}€</p>
                  </IonLabel>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "12px" }}>
                    <IonButton size="small" onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                      <IonIcon icon={remove} />
                    </IonButton>
                    <span>{item.quantity}</span>
                    <IonButton size="small" onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                      <IonIcon icon={add} />
                    </IonButton>
                  </div>
                  <IonButton
                    fill="clear"
                    color="danger"
                    onClick={() => removeItem(item.name)}
                    slot="end"
                  >
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>

            <div style={{ padding: "16px", borderTop: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <strong style={{ fontSize: "18px" }}>Total:</strong>
                <strong style={{ fontSize: "18px", color: "#d50000" }}>
                  {total.toFixed(2)}€
                </strong>
              </div>

              <IonButton expand="block" color="danger" style={{ marginBottom: "8px" }}>
                Confirmar Compra
              </IonButton>

              <IonButton
                expand="block"
                fill="outline"
                onClick={() => {
                  clearCart();
                  onClose();
                }}
              >
                Vaciar Carrito
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default CartModal;
