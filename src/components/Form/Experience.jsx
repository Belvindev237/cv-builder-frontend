import React, { useState } from "react";
import Button from "../FormField/Button";
import InputField from "../FormField/InputField";

export default function Experience({ formData, setFormData, Prev, Next }) {
  const [localExp, setLocalExp] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalExp((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    if (!localExp.jobTitle || !localExp.company) return;
    setFormData((prev) => ({
      ...prev,
      experienceList: [...(prev.experienceList || []), localExp],
    }));
    setLocalExp({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
    });
  };

  const removeExperience = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      experienceList: prev.experienceList.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="flex-1 bg-white p-5 border border-gray-100 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-2">
            Ajouter une expérience
          </h3>

          <div className="space-y-3">
            <InputField
              label="Intitulé du poste"
              name="jobTitle"
              value={localExp.jobTitle}
              onChange={handleChange}
            />
            <InputField
              label="Entreprise"
              name="company"
              value={localExp.company}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Date de début"
                name="startDate"
                type="date"
                value={localExp.startDate}
                onChange={handleChange}
              />
              <InputField
                label="Date de fin"
                name="endDate"
                type="date"
                value={localExp.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Missions & Réalisations
              </label>
              <textarea
                name="jobDescription"
                rows="3"
                value={localExp.jobDescription}
                onChange={handleChange}
                placeholder="Décrivez vos tâches..."
                className="w-full border border-gray-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <button
              onClick={addExperience}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex justify-center items-center gap-2"
            >
              <span className="text-lg">+</span> Ajouter l'expérience
            </button>
          </div>
        </div>

        {/* --- COLONNE DROITE : PARCOURS --- */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 mb-3 px-1 flex items-center justify-between">
            Parcours Professionnel
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 uppercase">
              {formData.experienceList?.length || 0} postes
            </span>
          </h3>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
            {formData.experienceList?.map((exp, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex justify-between items-start hover:shadow-md hover:border-blue-100 transition-all group"
              >
                <div className="flex-1 pr-3">
                  <h4 className="font-bold text-gray-800 text-[11px] uppercase tracking-tight">
                    {exp.jobTitle}
                  </h4>
                  <p className="text-blue-600 font-semibold text-[10px] mb-1">
                    {exp.company}
                  </p>
                  <p className="text-gray-400 text-[9px] flex items-center gap-1">
                    📅 {exp.startDate} — {exp.endDate || "Présent"}
                  </p>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  title="Supprimer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {(!formData.experienceList ||
              formData.experienceList.length === 0) && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center">
                <p className="text-xs text-gray-400 italic">
                  Aucune expérience renseignée
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <div className="flex justify-between items-center mt-10 pt-4 border-t border-gray-100">
        <button
          onClick={Prev}
          className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
        >
          ← Précédent
        </button>
        <button
          onClick={Next}
          className="px-8 py-2 bg-blue-600 text-white rounded-full text-xs font-black hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all uppercase tracking-widest"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
