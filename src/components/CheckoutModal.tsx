import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonCard,
  IonCardContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import {
  close,
  card,
  logoPaypal,
  swapHorizontal,
  checkmarkCircle,
} from "ionicons/icons";
import { useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import "./CheckoutModal.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

interface PaymentData {
  method: "card" | "paypal" | "transfer";
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
  address: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
}

const CheckoutModal = ({ isOpen, onClose, total }: CheckoutModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentStep, setPaymentStep] = useState<"method" | "details" | "confirm">("method");

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardName: "",
    address: "",
    phone: "",
    email: "",
    acceptTerms: false,
  });

  const handleMethodSelect = (method: "card" | "paypal" | "transfer") => {
    setPaymentData({ ...paymentData, method });
    setPaymentStep("details");
  };

  const validatePaymentData = (): boolean => {
    if (!paymentData.address.trim()) {
      setSuccessMessage("Por favor ingresa una dirección de entrega");
      setShowSuccess(true);
      return false;
    }
    if (!paymentData.phone.trim()) {
      setSuccessMessage("Por favor ingresa un teléfono de contacto");
      setShowSuccess(true);
      return false;
    }
    if (!paymentData.email.trim()) {
      setSuccessMessage("Por favor ingresa un correo electrónico");
      setShowSuccess(true);
      return false;
    }
    if (!paymentData.acceptTerms) {
      setSuccessMessage("Debes aceptar los términos y condiciones");
      setShowSuccess(true);
      return false;
    }

    if (paymentData.method === "card") {
      if (!paymentData.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/)) {
        setSuccessMessage("Número de tarjeta inválido");
        setShowSuccess(true);
        return false;
      }
      if (!paymentData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        setSuccessMessage("Formato de vencimiento inválido (MM/YY)");
        setShowSuccess(true);
        return false;
      }
      if (!paymentData.cardCVC.match(/^\d{3,4}$/)) {
        setSuccessMessage("CVC inválido");
        setShowSuccess(true);
        return false;
      }
      if (!paymentData.cardName.trim()) {
        setSuccessMessage("Por favor ingresa el nombre del titular");
        setShowSuccess(true);
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentData()) return;

    setPaymentStep("confirm");
    setLoading(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        `¡Pago recibido! Tu pedido de ${total.toFixed(2)}€ ha sido confirmado. Recibirás una confirmación en ${paymentData.email}`
      );
      setShowSuccess(true);

      setTimeout(() => {
        clearCart();
        setPaymentStep("method");
        setPaymentData({
          method: "card",
          cardNumber: "",
          cardExpiry: "",
          cardCVC: "",
          cardName: "",
          address: "",
          phone: "",
          email: "",
          acceptTerms: false,
        });
        onClose();
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  const formatCardNumber = (value: string): string => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  return (
    <>
      <IonModal ref={modal} isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar style={{ "--background": "#d50000" } as any}>
            <IonTitle style={{ color: "white" }}>Checkout</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={close} style={{ color: "white" }} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="checkout-content">
          {/* Resumen de pedido */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Resumen del Pedido</h3>
              <div className="total-display">
                <span className="label">Total a pagar:</span>
                <span className="amount">{total.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Paso 1: Seleccionar método */}
          {paymentStep === "method" && (
            <div className="payment-methods-container">
              <h3 className="step-title">Selecciona tu método de pago</h3>

              <IonCard
                className="payment-method-card"
                onClick={() => handleMethodSelect("card")}
              >
                <IonCardContent>
                  <div className="method-content">
                    <IonIcon icon={card} className="method-icon" />
                    <div className="method-info">
                      <h4>Tarjeta de Crédito/Débito</h4>
                      <p>Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard
                className="payment-method-card"
                onClick={() => handleMethodSelect("paypal")}
              >
                <IonCardContent>
                  <div className="method-content">
                    <IonIcon icon={logoPaypal} className="method-icon" />
                    <div className="method-info">
                      <h4>PayPal</h4>
                      <p>Pago seguro con tu cuenta PayPal</p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard
                className="payment-method-card"
                onClick={() => handleMethodSelect("transfer")}
              >
                <IonCardContent>
                  <div className="method-content">
                    <IonIcon icon={swapHorizontal} className="method-icon" />
                    <div className="method-info">
                      <h4>Transferencia Bancaria</h4>
                      <p>Realiza una transferencia a nuestro banco</p>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          )}

          {/* Paso 2: Detalles de pago */}
          {paymentStep === "details" && (
            <div className="payment-details-container">
              <div className="method-selected">
                <IonButton
                  fill="clear"
                  onClick={() => setPaymentStep("method")}
                  className="back-button"
                >
                  ← Cambiar método
                </IonButton>
              </div>

              {/* Detalles de tarjeta */}
              {paymentData.method === "card" && (
                <div className="form-section">
                  <h4 className="section-title">Datos de la Tarjeta</h4>

                  <IonInput
                    label="Nombre del titular"
                    labelPlacement="stacked"
                    placeholder="Juan González"
                    value={paymentData.cardName}
                    onIonChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardName: e.detail.value || "",
                      })
                    }
                    className="input-field"
                  />

                  <IonInput
                    label="Número de tarjeta"
                    labelPlacement="stacked"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onIonChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardNumber: formatCardNumber(e.detail.value || ""),
                      })
                    }
                    maxlength={19}
                    className="input-field"
                  />

                  <div className="form-row">
                    <IonInput
                      label="Vencimiento"
                      labelPlacement="stacked"
                      placeholder="MM/YY"
                      value={paymentData.cardExpiry}
                      onIonChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardExpiry: e.detail.value || "",
                        })
                      }
                      maxlength={5}
                      className="input-field"
                    />
                    <IonInput
                      label="CVC"
                      labelPlacement="stacked"
                      placeholder="123"
                      value={paymentData.cardCVC}
                      onIonChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardCVC: e.detail.value || "",
                        })
                      }
                      maxlength={4}
                      type="password"
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              {/* Detalles de PayPal */}
              {paymentData.method === "paypal" && (
                <div className="form-section">
                  <h4 className="section-title">PayPal</h4>
                  <div className="info-box">
                    <p>
                      Serás redirigido a PayPal para completar el pago de forma segura.
                    </p>
                  </div>
                </div>
              )}

              {/* Detalles de Transferencia */}
              {paymentData.method === "transfer" && (
                <div className="form-section">
                  <h4 className="section-title">Transferencia Bancaria</h4>
                  <div className="bank-info">
                    <p>
                      <strong>Beneficiario:</strong> Pizza App S.L.
                    </p>
                    <p>
                      <strong>IBAN:</strong> ES91 1234 5678 9012 3456 7890
                    </p>
                    <p>
                      <strong>Concepto:</strong> Pedido #{Date.now()}
                    </p>
                    <p>
                      <strong>Importe:</strong> {total.toFixed(2)}€
                    </p>
                  </div>
                </div>
              )}

              {/* Datos de envío */}
              <div className="form-section">
                <h4 className="section-title">Datos de Envío</h4>

                <IonInput
                  label="Correo electrónico"
                  labelPlacement="stacked"
                  placeholder="correo@ejemplo.com"
                  type="email"
                  value={paymentData.email}
                  onIonChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      email: e.detail.value || "",
                    })
                  }
                  className="input-field"
                />

                <IonInput
                  label="Teléfono"
                  labelPlacement="stacked"
                  placeholder="+34 123 456 789"
                  type="tel"
                  value={paymentData.phone}
                  onIonChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      phone: e.detail.value || "",
                    })
                  }
                  className="input-field"
                />

                <IonInput
                  label="Dirección de entrega"
                  labelPlacement="stacked"
                  placeholder="Calle Principal 123, 28001 Madrid"
                  value={paymentData.address}
                  onIonChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      address: e.detail.value || "",
                    })
                  }
                  className="input-field"
                />
              </div>

              {/* Términos */}
              <div className="form-section">
                <div className="terms-check">
                  <IonCheckbox
                    checked={paymentData.acceptTerms}
                    onIonChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        acceptTerms: e.detail.checked,
                      })
                    }
                  />
                  <label>
                    Acepto los términos y condiciones y la política de privacidad
                  </label>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="action-buttons">
                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={() => setPaymentStep("method")}
                >
                  Atrás
                </IonButton>
                <IonButton
                  expand="block"
                  color="danger"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <IonSpinner name="crescent" /> Procesando...
                    </>
                  ) : (
                    `Pagar ${total.toFixed(2)}€`
                  )}
                </IonButton>
              </div>
            </div>
          )}

          {/* Paso 3: Confirmación */}
          {paymentStep === "confirm" && (
            <div className="confirmation-container">
              <div className="success-animation">
                <IonIcon
                  icon={checkmarkCircle}
                  className="success-icon"
                />
              </div>
              <h3>Procesando tu pago...</h3>
              <p>Por favor espera un momento.</p>
              <IonSpinner />
            </div>
          )}
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={showSuccess}
        onDidDismiss={() => setShowSuccess(false)}
        message={successMessage}
        duration={
          paymentStep === "confirm" && loading ? 5000 : 2000
        }
        color={paymentStep === "confirm" ? "success" : "danger"}
        position="top"
      />
    </>
  );
};

export default CheckoutModal;
