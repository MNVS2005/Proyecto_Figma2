import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password || !form.confirm) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    // Aquí iría la lógica real de registro (API)
    history.push("/tab1");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input type="password" className="form-control" name="confirm" value={form.confirm} onChange={handleChange} required />
        </div>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <button type="submit" className="btn btn-danger w-100 mt-2">Registrarse</button>
      </form>
      <div className="text-center mt-3">
        <span>¿Ya tienes cuenta? </span>
        <a href="/login">Inicia sesión</a>
      </div>
    </div>
  );
};

export default Signup;
