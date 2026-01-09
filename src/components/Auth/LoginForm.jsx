import React, { useState } from "react";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  On utilise la fonction login importée en haut
      const data = await login(email, password);

      //  Attention : FastAPI renvoie 'access_token', pas 'token'
      localStorage.setItem("token", data.access_token);
      navigate("/profil");

      alert("Connexion réussie !");
    } catch (error) {
      // ✅ Gestion d'erreur plus robuste
      const message = error.response?.data?.detail || "Erreur de connexion";
      alert("Login failed: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase">
          Email
        </label>
        <div className="relative">
          <i className="fas fa-envelope absolute left-3 top-3.5 text-slate-400"></i>
          <input
            type="email"
            value={email} // Lié au state
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="nom@exemple.com"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase">
          Mot de passe
        </label>
        <div className="relative">
          <i className="fas fa-lock absolute left-3 top-3.5 text-slate-400"></i>
          <input
            type="password"
            value={password} // Lié au state
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-100"
      >
        Connexion <i className="fas fa-arrow-right ml-1 text-sm"></i>
      </button>
    </form>
  );
};

export default LoginForm;
