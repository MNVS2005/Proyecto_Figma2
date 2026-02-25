import React from "react";

import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const history = useHistory();
  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="text-center mb-4">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="avatar"
          className="rounded-circle border border-danger"
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div className="card mb-4">
        <div className="card-body text-center">
          <h2 className="card-title mb-1">Juan Pérez</h2>
          <p className="card-text text-muted">juan@email.com</p>
        </div>
      </div>
      <button
        className="btn btn-danger w-100"
        style={{ marginTop: 20 }}
        onClick={() => {
          localStorage.removeItem("isAuth");
          history.push("/login");
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
