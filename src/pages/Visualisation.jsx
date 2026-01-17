import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { cvById } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Visualisation() {
  const [cvStyle, setCvStyle] = useState({ primaryColor: "#2563eb" });
  const [cvData, setCvData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cvById(id);
        setCvData(data);
      } catch (error) {
        console.error("Erreur lors du chargement du CV:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const colorPalette = [
    { name: "Bleu", value: "#2563eb" },
    { name: "Noir", value: "#1e293b" },
    { name: "Vert", value: "#059669" },
    { name: "Violet", value: "#7c3aed" },
    { name: "Rose", value: "#db2777" },
    { name: "Rouge", value: "#dc2626" },
    { name: "Orange", value: "#ea580c" },
    { name: "Turquoise", value: "#0d9488" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Bouton menu mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar à gauche */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          flex flex-col border-r border-gray-200
          no-print
        `}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Personnalisation du CV
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Modifiez l'apparence de votre CV
          </p>

          {/* Palette de couleurs */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Couleur principale
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {colorPalette.map((color) => (
                <button
                  key={color.value}
                  className={`w-full aspect-square rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    cvStyle.primaryColor === color.value
                      ? "border-blue-500 ring-2 ring-blue-500/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => {
                    setCvStyle({ ...cvStyle, primaryColor: color.value });
                    setSidebarOpen(false); // Fermer la sidebar sur mobile après sélection
                  }}
                  title={color.name}
                  aria-label={`Choisir la couleur ${color.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer de la sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="p-6 border-t border-slate-800">
            <button
              onClick={() => navigate("/profil")}
              className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 font-medium mb-6"
            >
              MES DOCUMENTS
            </button>
          </div>
        </div>
      </aside>

      {/* Zone principale à droite - Prévisualisation du CV */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-100 to-gray-200">
        {!cvData ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Chargement du CV...</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-start justify-center p-4 lg:p-8">
            <div className="w-full max-w-4xl">
              <ResumePreview formData={cvData} customStyle={cvStyle} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
