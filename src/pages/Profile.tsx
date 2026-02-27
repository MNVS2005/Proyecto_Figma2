import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonButton,
  IonList,
  IonButtons,
  IonBackButton,
  IonModal,
  IonInput,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

const Profile: React.FC = () => {
  const history = useHistory();
  const { logout } = useUser();

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editText, setEditText] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const user = {
    name: "Juan Pérez",
    email: "juan@email.com",
    avatar: "https://i.imgur.com/9Uvo4iw.png", // FOTO PÚBLICA DE JUAN PÉREZ
    bio: "Esta es tu biografía.",
    followers: 4,
    following: 2,
    reviews: 1,
  };

  const followersList = [
    { name: "María García", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Carlos Rodríguez", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Ana López", avatar: "https://i.pravatar.cc/150?img=15" },
    { name: "Yaxche Álvarez", avatar: "https://i.pravatar.cc/150?img=4" },
  ];

  const followingList = [
    { name: "Pizzería Donatello", avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "Pizzería La Toscana", avatar: "https://i.pravatar.cc/150?img=16" },
  ];

  const likedReviews = [
    {
      user: "María García",
      pizza: "Pizza Margarita",
      text: "¡La mejor pizza que he probado! Los ingredientes frescos hacen toda la diferencia.",
      date: "5 Dic. 2025",
      stars: 5,
    },
    {
      user: "Carlos Rodríguez",
      pizza: "Pizza Pepperoni",
      text: "Muy buena, pero le faltaba un poco más de queso a mi gusto.",
      date: "3 Dic. 2025",
      stars: 4,
    },
  ];

  const [myReviews, setMyReviews] = useState([
    {
      pizza: "Pizza Hawaiana",
      text: "Excelente combinación de sabores, muy auténtica, pero le falta marisco.",
      date: "10 Dic. 2025",
      stars: 4,
    },
  ]);

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditText(myReviews[index].text);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (editIndex === null) return;

    const updated = [...myReviews];
    updated[editIndex].text = editText;

    setMyReviews(updated);
    setShowEditModal(false);
  };

  const deleteReview = (index: number) => {
    const updated = [...myReviews];
    updated.splice(index, 1);
    setMyReviews(updated);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle style={{ color: "white" }}>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* Avatar */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <IonAvatar style={{ margin: "0 auto", width: "120px", height: "120px" }}>
            <img src={user.avatar} alt="Foto de Juan Pérez" />
          </IonAvatar>
        </div>

        {/* Nombre y correo */}
        <IonItem lines="none" style={{ marginTop: "10px" }}>
          <IonLabel className="ion-text-center">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </IonLabel>
        </IonItem>

        {/* Bio */}
        <p style={{ textAlign: "center", marginTop: "10px", color: "gray" }}>
          {user.bio}
        </p>

        {/* Estadísticas */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <div>
            <h3>{user.followers}</h3>
            <p>Seguidores</p>
          </div>
          <div>
            <h3>{user.reviews}</h3>
            <p>Reseñas</p>
          </div>
          <div>
            <h3>{user.following}</h3>
            <p>Siguiendo</p>
          </div>
        </div>

        {/* Botones seguidores/seguidos */}
        <IonButton
          expand="block"
          fill="outline"
          color="danger"
          style={{ marginTop: "20px" }}
          onClick={() => setShowFollowers(true)}
        >
          Ver seguidores
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="danger"
          style={{ marginTop: "10px" }}
          onClick={() => setShowFollowing(true)}
        >
          Ver seguidos
        </IonButton>

        {/* Modal seguidores */}
        <IonModal isOpen={showFollowers} onDidDismiss={() => setShowFollowers(false)}>
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle style={{ color: "white" }}>Seguidores</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonList>
              {followersList.map((f, i) => (
                <IonItem
                  key={i}
                  button
                  onClick={() => {
                    setShowFollowers(false);
                    history.push("/profile");
                  }}
                >
                  <IonAvatar slot="start">
                    <img src={f.avatar} alt={f.name} />
                  </IonAvatar>
                  <IonLabel>{f.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>

            <IonButton expand="block" color="danger" onClick={() => setShowFollowers(false)}>
              Cerrar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Modal seguidos */}
        <IonModal isOpen={showFollowing} onDidDismiss={() => setShowFollowing(false)}>
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle style={{ color: "white" }}>Seguidos</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonList>
              {followingList.map((f, i) => (
                <IonItem
                  key={i}
                  button
                  onClick={() => {
                    setShowFollowing(false);
                    history.push("/profile");
                  }}
                >
                  <IonAvatar slot="start">
                    <img src={f.avatar} alt={f.name} />
                  </IonAvatar>
                  <IonLabel>{f.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>

            <IonButton expand="block" color="danger" onClick={() => setShowFollowing(false)}>
              Cerrar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Reseñas que te han gustado */}
        <h2 style={{ marginTop: "30px" }}>❤️ Reseñas que te han gustado</h2>

        <IonList>
          {likedReviews.map((r, i) => (
            <IonItem key={i} style={{ marginBottom: "10px" }}>
              <IonLabel>
                <h3>{r.user} – {r.pizza}</h3>
                <p>{r.text}</p>
                <p>📅 {r.date}</p>
                <p>{"⭐".repeat(r.stars) + "☆".repeat(5 - r.stars)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Tus reseñas */}
        <h2 style={{ marginTop: "30px" }}>📝 Tus reseñas</h2>

        <IonList>
          {myReviews.map((r, i) => (
            <IonItem key={i} style={{ marginBottom: "10px" }}>
              <IonLabel>
                <h3>{r.pizza}</h3>
                <p>{r.text}</p>
                <p>📅 {r.date}</p>
                <p>{"⭐".repeat(r.stars) + "☆".repeat(5 - r.stars)}</p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <IonButton size="small" color="primary" onClick={() => openEditModal(i)}>
                    Editar
                  </IonButton>
                  <IonButton size="small" color="danger" onClick={() => deleteReview(i)}>
                    Eliminar
                  </IonButton>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Modal editar reseña */}
        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle style={{ color: "white" }}>Editar reseña</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="floating">Texto de la reseña</IonLabel>
              <IonInput
                value={editText}
                onIonChange={(e) => setEditText(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" color="primary" style={{ marginTop: "20px" }} onClick={saveEdit}>
              Guardar cambios
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              style={{ marginTop: "10px" }}
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Botón cerrar sesión */}
        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: "30px" }}
          onClick={() => {
            logout();
            history.push("/login");
          }}
        >
          Cerrar sesión
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Profile;
