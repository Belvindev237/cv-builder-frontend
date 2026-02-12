import React, { useState } from "react";
import InputField from "../FormField/InputField";
import { useTranslation } from "react-i18next";

export default function Experience({ formData, setFormData, Prev, Next }) {
  const { t } = useTranslation();
  
  const [localExp, setLocalExp] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalExp((prev) => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateExperience = () => {
    const newErrors = {};

    // Validation des champs obligatoires
    if (!localExp.jobTitle || localExp.jobTitle.trim() === "") {
      newErrors.jobTitle = t('validation.required');
    }
    if (!localExp.company || localExp.company.trim() === "") {
      newErrors.company = t('validation.required');
    }
    if (!localExp.location || localExp.location.trim() === "") {
      newErrors.location = t('validation.required');
    }
    if (!localExp.startDate) {
      newErrors.startDate = t('validation.required');
    }
    if (!localExp.endDate) {
      newErrors.endDate = t('validation.required');
    }
    if (!localExp.description || localExp.description.trim() === "") {
      newErrors.description = t('validation.required');
    }

    // Validation des dates
    if (localExp.startDate && localExp.endDate) {
      const start = new Date(localExp.startDate);
      const end = new Date(localExp.endDate);
      
      if (end < start) {
        newErrors.endDate = t('validation.endDateBeforeStart') || "La date de fin doit être après la date de début";
      }
    }

    return newErrors;
  };

  const addExperience = () => {
    const validationErrors = validateExperience();
    
    if (Object.keys(validationErrors).length === 0) {
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
        description: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const removeExperience = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      experienceList: prev.experienceList.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleNext = () => {
    // Vérifier qu'au moins une expérience a été ajoutée
    if (!formData.experienceList || formData.experienceList.length === 0) {
      alert(t('validation.atLeastOneExperience') || "Veuillez ajouter au moins une expérience");
      return;
    }
    Next();
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="flex-1 bg-white p-5 border border-gray-100 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-2">
            {t('experience.addTitle')}
          </h3>

          <div className="space-y-3">
            <InputField
              label={t('experience.jobTitle')}
              name="jobTitle"
              value={localExp.jobTitle}
              onChange={handleChange}
              placeholder={t('experience.jobTitle')}
              error={errors.jobTitle}
              required
            />
            <InputField
              label={t('experience.company')}
              name="company"
              value={localExp.company}
              onChange={handleChange}
              placeholder={t('experience.company')}
              error={errors.company}
              required
            />
            
            <InputField
              label={t('experience.positions')}
              name="location"
              value={localExp.location}
              onChange={handleChange}
              placeholder={t('experience.positions')}
              error={errors.location}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label={t('experience.startDate')}
                name="startDate"
                type="date"
                value={localExp.startDate}
                onChange={handleChange}
                error={errors.startDate}
                required
              />
              <InputField
                label={t('experience.endDate')}
                name="endDate"
                type="date"
                value={localExp.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                {t('experience.description')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="description"
                rows="3"
                value={localExp.description}
                onChange={handleChange}
                placeholder={t('experience.descriptionPlaceholder')}
                className={`w-full border rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500'
                }`}
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1">{errors.description}</span>
              )}
            </div>

            <button
              onClick={addExperience}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex justify-center items-center gap-2"
            >
              <span className="text-lg">+</span> {t('experience.addButton')}
            </button>
          </div>
        </div>

        {/* --- COLONNE DROITE : PARCOURS --- */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 mb-3 px-1 flex items-center justify-between">
            {t('experience.listTitle')}
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 uppercase">
              {formData.experienceList?.length || 0} {t('experience.positions')}
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
                    📍 {exp.location}
                  </p>
                  <p className="text-gray-400 text-[9px] flex items-center gap-1">
                    📅 {exp.startDate} — {exp.endDate || t('experience.present')}
                  </p>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  title={t('experience.deleteButton')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {(!formData.experienceList || formData.experienceList.length === 0) && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center">
                <p className="text-xs text-gray-400 italic">
                  {t('experience.noExperience')}
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
          {t('experience.prev')}
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-2 bg-blue-600 text-white rounded-full text-xs font-black hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all uppercase tracking-widest"
        >
          {t('experience.next')}
        </button>
      </div>
    </div>
  );
}