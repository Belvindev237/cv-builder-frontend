import React, { useState } from "react";

export default function Competence({ formData, setFormData, Prev, Next }) {
  // État local pour les champs de saisie temporaires
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  // Fonction pour ajouter une compétence
  const addSkill = (category, value, setter) => {
    if (value.trim() === "") return;
    setFormData((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), value.trim()],
    }));
    setter(""); // Vide l'input
  };

  // Fonction pour supprimer une compétence
  const removeSkill = (category, indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* --- COLONNE 1 : TECH SKILLS --- */}
        <div className="flex-1 bg-white border rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            🛠 Compétences Techniques
          </h3>
          <div className="flex gap-2 mb-6">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                addSkill("technicalSkills", techInput, setTechInput)
              }
              placeholder="ex: React, Python..."
              className="flex-1 border-2 border-gray-100 rounded-lg p-2 focus:border-blue-400 outline-none"
            />
            <button
              onClick={() =>
                addSkill("technicalSkills", techInput, setTechInput)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              +
            </button>
          </div>
          <div className="space-y-2">
            {formData.technicalSkills?.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <span className="font-medium text-gray-700">{skill}</span>
                <button
                  onClick={() => removeSkill("technicalSkills", index)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- COLONNE 2 : SOFT SKILLS --- */}
        <div className="flex-1 bg-white border rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
            🧠 Soft Skills
          </h3>
          <div className="flex gap-2 mb-6">
            <input
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                addSkill("softSkills", softInput, setSoftInput)
              }
              placeholder="ex: Leadership..."
              className="flex-1 border-2 border-gray-100 rounded-lg p-2 focus:border-purple-400 outline-none"
            />
            <button
              onClick={() => addSkill("softSkills", softInput, setSoftInput)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700"
            >
              +
            </button>
          </div>
          <div className="space-y-2">
            {formData.softSkills?.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <span className="font-medium text-gray-700">{skill}</span>
                <button
                  onClick={() => removeSkill("softSkills", index)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOUTONS DE NAVIGATION --- */}
      <div className="flex justify-between mt-10 border-t pt-6">
        <button
          onClick={Prev}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 font-semibold"
        >
          Précédent
        </button>
        <button
          onClick={Next}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
