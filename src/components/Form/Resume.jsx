import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ResumePro({ formData, setFormData, Prev, Next }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation du résumé professionnel
    if (!formData.summary || formData.summary.trim() === "") {
      newErrors.summary = t('validation.required');
    } else if (formData.summary.trim().length < 50) {
      newErrors.summary = t('validation.summaryTooShort') || "Le résumé doit contenir au moins 50 caractères";
    } else if (formData.summary.length > 1000) {
      newErrors.summary = t('validation.summaryTooLong') || "Le résumé ne doit pas dépasser 1000 caractères";
    }

    // Validation des hobbies
    if (!formData.hobbies || formData.hobbies.trim() === "") {
      newErrors.hobbies = t('validation.required');
    } else if (formData.hobbies.trim().length < 10) {
      newErrors.hobbies = t('validation.hobbiesTooShort') || "Veuillez décrire vos hobbies (minimum 10 caractères)";
    }

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      Next();
    } else {
      setErrors(validationErrors);
      
      // Scroll vers le premier champ avec erreur
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  const charCount = formData.summary?.length || 0;
  const hobbiesCharCount = formData.hobbies?.length || 0;
  const tips = t("resume_pro.tips", { returnObjects: true }) || [];

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* --- SECTION RÉSUMÉ --- */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-1 uppercase tracking-wider">
            {t("resume_pro.title")}
            <span className="text-red-500 ml-1">*</span>
          </h3>
          <p className="text-gray-400 text-xs mb-6 italic">
            {t("resume_pro.description")}
          </p>

          <div className="relative">
            <textarea
              name="summary"
              rows="5"
              value={formData.summary || ""}
              onChange={handleChange}
              placeholder={t("resume_pro.summaryPlaceholder")}
              className={`w-full border rounded-xl p-4 text-xs focus:ring-2 outline-none transition-all bg-gray-50/30 text-gray-700 leading-relaxed ${
                errors.summary
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            ></textarea>

            <div className="absolute bottom-3 right-3">
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                  charCount > 1000
                    ? "bg-red-100 text-red-600"
                    : charCount > 600
                    ? "bg-orange-100 text-orange-600"
                    : charCount < 50
                    ? "bg-gray-100 text-gray-400"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {charCount} / 1000 {t("resume_pro.charCountLabel")}
              </span>
            </div>
          </div>
          
          {errors.summary && (
            <span className="text-red-500 text-xs mt-2 block">{errors.summary}</span>
          )}
          
          {!errors.summary && charCount > 0 && charCount < 50 && (
            <p className="text-orange-500 text-xs mt-2 font-medium">
              ⚠ {t("resume_pro.minCharWarning") || "Minimum 50 caractères recommandés"}
            </p>
          )}
        </div>

        {/* --- SECTION HOBBIES --- */}
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm mb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-1 uppercase tracking-wider">
            {t("resume_pro.hobbiesTitle")}
            <span className="text-red-500 ml-1">*</span>
          </h3>
          <p className="text-gray-400 text-xs mb-6 italic">
            {t("resume_pro.hobbiesDescription")}
          </p>

          <div className="relative">
            <textarea
              name="hobbies"
              rows="3"
              value={formData.hobbies || ""}
              onChange={handleChange}
              placeholder={t("resume_pro.hobbiesPlaceholder")}
              className={`w-full border rounded-xl p-4 text-xs focus:ring-2 outline-none transition-all bg-gray-50/30 text-gray-700 leading-relaxed ${
                errors.hobbies
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            ></textarea>
            
            <div className="absolute bottom-3 right-3">
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-gray-100 text-gray-400">
                {hobbiesCharCount}
              </span>
            </div>
          </div>
          
          {errors.hobbies && (
            <span className="text-red-500 text-xs mt-2 block">{errors.hobbies}</span>
          )}
          
          {!errors.hobbies && (
            <p className="text-[10px] text-gray-400 mt-2 font-medium">
              {t("resume_pro.hobbiesTip")}
            </p>
          )}
        </div>

        {/* --- CONSEILS DYNAMIQUES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
              <p className="text-[10px] text-blue-700 font-black mb-1 uppercase">{tip.label}</p>
              <p className="text-[11px] text-blue-600 leading-tight italic">{tip.text}</p>
            </div>
          ))}
        </div>

        {/* --- NAVIGATION --- */}
        <div className="flex justify-between items-center mt-12 pt-4 border-t border-gray-100">
          <button 
            onClick={Prev} 
            className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← {t("resume_pro.prevButton")}
          </button>
          <button 
            onClick={handleNext} 
            className="px-10 py-2.5 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 active:scale-95 transition-all shadow-md uppercase tracking-widest"
          >
            {t("resume_pro.nextButton")}
          </button>
        </div>
      </div>
    </div>
  );
}