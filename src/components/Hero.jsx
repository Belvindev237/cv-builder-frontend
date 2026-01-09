import { Navigate } from "react-router-dom";
import image1 from "../images/image1.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const Navigate = useNavigate();
  return (
    <div className="mt-16 py-15 bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-none  rounded-lg p-6">
          <h2 className="text-6xl font-semibold mb-6 text-blue-600 ">
            Créez vos cv facilement
          </h2>
          <p className="text-gray-600 mb-7 text-xl">
            Réalisez des CV professionnels en quelques minutes avec CV Builder
            <br />
            <strong>Rapide,Simple et Efficace</strong> <br />
            <em>Des modèles personnalisables pour tous les secteurs.</em>
          </p>
          <button
            className="bg-green-500 text-sm font-bold text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => Navigate("/Builder")}
          >
            LANCE TON CV PRO MAINTENANT
          </button>
        </div>

        <div className="  rounded-lg p-6">
          <img
            src="/images/image1.png"
            alt="Images"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
