import { useState } from "react";
import { register } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ RegisterDone }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Les mots de passe ne correspondent pas !");
    }
    try {
      await register(name, email, password);
      alert("Inscription réussie !");
      navigate("/auth");
      RegisterDone();
    } catch (error) {
      const message = error.response?.data?.detail || "Erreur d'inscription";
      // alert("Registration failed: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase">
          Nom complet
        </label>
        <div className="relative">
          <i className="fas fa-user absolute left-3 top-3.5 text-slate-400"></i>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="Miguel Belvin"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700 uppercase">
          Email
        </label>
        <div className="relative">
          <i className="fas fa-at absolute left-3 top-3.5 text-slate-400"></i>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="nom@exemple.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase text-[10px]">
            Mot de passe
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="••••"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase text-[10px]">
            Confirmer
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            placeholder="••••"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 mt-2 shadow-lg"
      >
        Créer mon compte <i className="fas fa-user-plus ml-1 text-sm"></i>
      </button>
    </form>
  );
};
export default RegisterForm;
