import { useState } from "react";
//import Button from "../FormField/Button";
import InputField from "../FormField/InputField";

export default function Education({ formData, setFormData, Prev, Next }) {
  const [localEdu, setLocalEdu] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalEdu((prev) => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (!localEdu.degree || !localEdu.institution) return;
    setFormData((prev) => ({
      ...prev,
      educationList: [...(prev.educationList || []), localEdu],
    }));
    setLocalEdu({
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      fieldOfStudy: "",
    });
  };

  const removeEducation = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="flex-1 bg-white p-5 border border-gray-100 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-2">
            Ajouter une formation
          </h3>

          <div className="space-y-3">
            <InputField
              label="Diplôme"
              name="degree"
              value={localEdu.degree}
              onChange={handleChange}
              placeholder="Ex: Master en Informatique"
            />

            <InputField
              label="Institution"
              name="institution"
              value={localEdu.institution}
              onChange={handleChange}
              placeholder="Ex: Université de Paris"
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Date de début"
                name="startDate"
                type="date"
                value={localEdu.startDate}
                onChange={handleChange}
              />
              <InputField
                label="Date de fin"
                name="endDate"
                type="date"
                value={localEdu.endDate}
                onChange={handleChange}
              />
            </div>

            <InputField
              label="Domaine d'étude"
              name="fieldOfStudy"
              value={localEdu.fieldOfStudy}
              onChange={handleChange}
              placeholder="Ex: Développement Logiciel"
            />

            {/* BOUTON AJOUTER RÉDUIT */}
            <button
              onClick={addEducation}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm mt-2"
            >
              + Ajouter la formation
            </button>
          </div>
        </div>

        {/* --- COLONNE DROITE : LISTE --- */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 mb-3 px-1 flex items-center justify-between">
            Cursus enregistré
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 uppercase">
              {formData.educationList?.length || 0} diplômes
            </span>
          </h3>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {formData.educationList?.map((edu, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex justify-between items-start hover:shadow-md transition-all group"
              >
                <div className="flex-1 pr-3">
                  <h4 className="font-bold text-gray-800 text-[11px] uppercase tracking-tight">
                    {edu.degree}
                  </h4>
                  <p className="text-blue-600 font-semibold text-[10px]">
                    {edu.institution}
                  </p>
                  <p className="text-gray-400 text-[9px] mt-1 italic">
                    {edu.startDate} — {edu.endDate || "Présent"}
                  </p>
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  ✕
                </button>
              </div>
            ))}

            {(!formData.educationList ||
              formData.educationList.length === 0) && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center bg-gray-50/50">
                <p className="text-xs text-gray-400 italic">
                  Aucun diplôme renseigné
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NAVIGATION HARMONISÉE --- */}
      <div className="flex justify-between items-center mt-10 pt-4 border-t border-gray-100">
        <button
          onClick={Prev}
          className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Précédent
        </button>
        <button
          onClick={Next}
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 transition-all uppercase tracking-widest shadow-md"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
