import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profil() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        className="bg-green-500 text-sm font-bold text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/Builder")}
      >
        LANCE TON CV PRO MAINTENANT
      </button>
    </div>
  );
}
