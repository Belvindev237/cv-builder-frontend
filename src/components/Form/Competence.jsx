import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Competence({ formData, setFormData, Prev, Next }) {
  const { t } = useTranslation();
  
  // État local pour les champs de saisie temporaires
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [errors, setErrors] = useState({
    technicalSkills: "",
    softSkills: ""
  });

  // Fonction pour ajouter une compétence
  const addSkill = (category, value, setter) => {
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [category]: t('validation.required')
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skill: {
        ...prev.skill,
        [category]: [...(prev.skill?.[category] || []), value.trim()],
      },
    }));
    setter("");
    
    // Effacer l'erreur après ajout réussi
    setErrors((prev) => ({
      ...prev,
      [category]: ""
    }));
  };

  // Fonction pour supprimer une compétence
  const removeSkill = (category, indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skill: {
        ...prev.skill,
        [category]: prev.skill[category].filter((_, i) => i !== indexToRemove),
      },
    }));
  };

  const handleNext = () => {
    // Vérifier qu'au moins une compétence technique et une soft skill ont été ajoutées
    const hasTechSkills = formData.skill?.technicalSkills?.length > 0;
    const hasSoftSkills = formData.skill?.softSkills?.length > 0;

    if (!hasTechSkills && !hasSoftSkills) {
      alert(t('validation.atLeastOneSkill') || "Veuillez ajouter au moins une compétence technique et une compétence interpersonnelle");
      return;
    }

    if (!hasTechSkills) {
      alert(t('validation.atLeastOneTechnicalSkill') || "Veuillez ajouter au moins une compétence technique");
      return;
    }

    if (!hasSoftSkills) {
      alert(t('validation.atLeastOneSoftSkill') || "Veuillez ajouter au moins une compétence interpersonnelle");
      return;
    }

    Next();
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* --- COLONNE 1 : TECH SKILLS --- */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-blue-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
            🛠 {t('competence.technicalSkills')}
            <span className="text-red-500 text-xs">*</span>
          </h3>
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <input
                value={techInput}
                onChange={(e) => {
                  setTechInput(e.target.value);
                  if (errors.technicalSkills) {
                    setErrors((prev) => ({ ...prev, technicalSkills: "" }));
                  }
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  addSkill("technicalSkills", techInput, setTechInput)
                }
                placeholder={t('competence.technicalPlaceholder')}
                className={`w-full border rounded-lg p-2 text-xs focus:ring-2 outline-none transition-all ${
                  errors.technicalSkills 
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {errors.technicalSkills && (
                <span className="text-red-500 text-xs mt-1 block">{errors.technicalSkills}</span>
              )}
            </div>
            <button
              onClick={() => addSkill("technicalSkills", techInput, setTechInput)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all active:scale-95"
            >
              +
            </button>
          </div>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {formData.skill?.technicalSkills?.length > 0 ? (
              formData.skill.technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 group hover:border-blue-200 transition-all"
                >
                  <span className="text-xs font-medium text-gray-700">{skill}</span>
                  <button
                    onClick={() => removeSkill("technicalSkills", index)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title={t('competence.deleteButton')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg py-8 text-center bg-gray-50/50">
                <p className="text-xs text-gray-400 italic">{t('competence.noTechnicalSkills')}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- COLONNE 2 : SOFT SKILLS --- */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-purple-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
            🧠 {t('competence.softSkills')}
            <span className="text-red-500 text-xs">*</span>
          </h3>
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <input
                value={softInput}
                onChange={(e) => {
                  setSoftInput(e.target.value);
                  if (errors.softSkills) {
                    setErrors((prev) => ({ ...prev, softSkills: "" }));
                  }
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  addSkill("softSkills", softInput, setSoftInput)
                }
                placeholder={t('competence.softPlaceholder')}
                className={`w-full border rounded-lg p-2 text-xs focus:ring-2 outline-none transition-all ${
                  errors.softSkills 
                    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                    : 'border-gray-200 focus:ring-purple-500/20 focus:border-purple-500'
                }`}
              />
              {errors.softSkills && (
                <span className="text-red-500 text-xs mt-1 block">{errors.softSkills}</span>
              )}
            </div>
            <button
              onClick={() => addSkill("softSkills", softInput, setSoftInput)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all active:scale-95"
            >
              +
            </button>
          </div>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {formData.skill?.softSkills?.length > 0 ? (
              formData.skill.softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100 group hover:border-purple-200 transition-all"
                >
                  <span className="text-xs font-medium text-gray-700">{skill}</span>
                  <button
                    onClick={() => removeSkill("softSkills", index)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title={t('competence.deleteButton')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg py-8 text-center bg-gray-50/50">
                <p className="text-xs text-gray-400 italic">{t('competence.noSoftSkills')}</p>
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
          ← {t('competence.prev')}
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all uppercase tracking-widest"
        >
          {t('competence.next')}
        </button>
      </div>
    </div>
  );
}