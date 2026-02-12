import { useState } from "react";
import { loginAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const {t}=useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  On utilise la fonction login importée en haut
      const data = await loginAPI(email, password);

      const pendingCv = localStorage.getItem("pendingCv");
      // Préparer les données utilisateur
      const userData = {
        username: data.username,
        email: data.userEmail,
      };

      // Sauvegarder dans le Context
      // Utilisez data.access_token si c'est ce que votre API retourne
      login(data.access_token, userData);
      if (pendingCv) {
        navigate("/builder");
      } else {
        navigate("/profil");
      }
    } catch (error) {
      // ✅ Gestion d'erreur plus robuste
      const message = error.response?.data?.detail || "Erreur de connexion";
      // alert("Login failed: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase">
          {t("label.email")}
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
          {t("label.mdp")}
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
        {t("button.log")} <i className="fas fa-arrow-right ml-1 text-sm"></i>
      </button>
    </form>
  );
};

export default LoginForm;
