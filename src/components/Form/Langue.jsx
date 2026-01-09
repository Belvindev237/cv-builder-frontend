import React, { useState } from "react";

// Liste des langues les plus courantes pour le select
const COMMON_LANGUAGES = [
  "Français",
  "Anglais",
  "Allemand",
  "Espagnol",
  "Italien",
  "Arabe",
  "Chinois",
  "Portugais",
  "Russe",
  "Japonais",
  "Néerlandais",
];

const LEVELS = [
  "Langue maternelle",
  "C2 - Maîtrise",
  "C1 - Autonome",
  "B2 - Avancé",
  "B1 - Intermédiaire",
  "A2 - Élémentaire",
  "A1 - Débutant",
];

export default function Langue({ formData, setFormData, Prev, Next }) {
  // États locaux pour gérer la saisie avant ajout
  const [selectedLang, setSelectedLang] = useState("");
  const [customLang, setCustomLang] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleAdd = () => {
    // On détermine quelle langue enregistrer (celle du select ou l'input libre)
    const languageToSave = selectedLang === "Autre" ? customLang : selectedLang;

    if (!languageToSave || !selectedLevel) return;

    setFormData((prev) => ({
      ...prev,
      languages: [
        ...(prev.languages || []),
        { name: languageToSave, level: selectedLevel },
      ],
    }));

    // Reset des champs locaux
    setSelectedLang("");
    setCustomLang("");
    setSelectedLevel("");
  };

  const removeLanguage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- COLONNE DE GAUCHE : FORMULAIRE --- */}
        <div className="flex-1 space-y-5 bg-white p-6 border rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2">
            Ajouter une langue
          </h3>

          {/* Sélection de la langue */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Langue
            </label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-lg p-2.5 bg-white focus:border-green-500 outline-none transition-all"
            >
              <option value="">-- Choisir une langue --</option>
              {COMMON_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
              <option value="Autre">Autre (Saisir manuellement)...</option>
            </select>

            {/* Champ supplémentaire si "Autre" est sélectionné */}
            {selectedLang === "Autre" && (
              <input
                type="text"
                placeholder="Entrez le nom de la langue"
                value={customLang}
                onChange={(e) => setCustomLang(e.target.value)}
                className="w-full mt-3 border-2 border-gray-100 rounded-lg p-2.5 focus:border-green-500 outline-none"
              />
            )}
          </div>

          {/* Sélection du niveau */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Niveau de maîtrise
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-lg p-2.5 bg-white focus:border-green-500 outline-none transition-all"
            >
              <option value="">-- Choisir un niveau --</option>
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            disabled={
              !selectedLevel ||
              (selectedLang === "Autre" ? !customLang : !selectedLang)
            }
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md"
          >
            Ajouter à mon CV
          </button>
        </div>

        {/* --- COLONNE DE DROITE : VISUALISATION --- */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">
            Langues ajoutées
          </h3>

          <div className="space-y-3">
            {formData.languages?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:border-green-300 transition-all"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                    {item.level}
                  </span>
                </div>
                <button
                  onClick={() => removeLanguage(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {(!formData.languages || formData.languages.length === 0) && (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <p className="text-gray-400 text-sm">
                  Aucune langue enregistrée
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
        <button
          onClick={Prev}
          className="flex items-center gap-2 px-6 py-2.5 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Précédent
        </button>
        <button
          onClick={Next}
          className="px-8 py-2.5 bg-gray-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
