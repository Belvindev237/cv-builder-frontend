import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Langue({ formData, setFormData, Prev, Next }) {
  const { t } = useTranslation();

  // On pointe vers 'langue.lang_names' car c'est le nom dans ton JSON
  const COMMON_LANGUAGES = [
    { key: "french", label: t('langue.lang_names.french') },
    { key: "english", label: t('langue.lang_names.english') },
    { key: "german", label: t('langue.lang_names.german') },
    { key: "spanish", label: t('langue.lang_names.spanish') },
    { key: "italian", label: t('langue.lang_names.italian') },
    { key: "arabic", label: t('langue.lang_names.arabic') },
  ];

  const LEVELS = [
    { key: "native", label: t('langue.levels.native') },
    { key: "c2", label: t('langue.levels.c2') },
    { key: "c1", label: t('langue.levels.c1') },
    { key: "b2", label: t('langue.levels.b2') },
    { key: "b1", label: t('langue.levels.b1') },
    { key: "a2", label: t('langue.levels.a2') },
    { key: "a1", label: t('langue.levels.a1') },
  ];

  const [selectedLang, setSelectedLang] = useState("");
  const [customLang, setCustomLang] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [errors, setErrors] = useState({
    language: "",
    customLanguage: "",
    level: ""
  });

  const validateLanguage = () => {
    const newErrors = {};

    // Validation de la langue
    if (!selectedLang) {
      newErrors.language = t('validation.required');
    }

    // Validation de la langue personnalisée si "Autre" est sélectionné
    if (selectedLang === "Autre" && (!customLang || customLang.trim() === "")) {
      newErrors.customLanguage = t('validation.required');
    }

    // Validation du niveau
    if (!selectedLevel) {
      newErrors.level = t('validation.required');
    }

    return newErrors;
  };

  const handleAdd = () => {
    const validationErrors = validateLanguage();
    
    if (Object.keys(validationErrors).length === 0) {
      const languageToSave = selectedLang === "Autre" ? customLang : selectedLang;

      setFormData((prev) => ({
        ...prev,
        languages: [
          ...(prev.languages || []),
          { name: languageToSave, level: selectedLevel },
        ],
      }));

      setSelectedLang("");
      setCustomLang("");
      setSelectedLevel("");
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const removeLanguage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleNext = () => {
    // Vérifier qu'au moins une langue a été ajoutée
    if (!formData.languages || formData.languages.length === 0) {
      alert(t('validation.atLeastOneLanguage') || "Veuillez ajouter au moins une langue");
      return;
    }
    Next();
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-5 bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2 uppercase tracking-wider">
            {t('langue.addLanguageTitle')}
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              {t('langue.languageLabel')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={selectedLang}
              onChange={(e) => {
                setSelectedLang(e.target.value);
                if (errors.language) {
                  setErrors((prev) => ({ ...prev, language: "" }));
                }
              }}
              className={`w-full border rounded-lg p-2.5 text-xs bg-white focus:ring-2 outline-none transition-all ${
                errors.language
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
              }`}
            >
              <option value="">{t('langue.languagePlaceholder')}</option>
              {COMMON_LANGUAGES.map((l) => (
                <option key={l.key} value={l.label}>{l.label}</option>
              ))}
              <option value="Autre">{t('langue.lang_names.other')}</option>
            </select>
            {errors.language && (
              <span className="text-red-500 text-xs mt-1 block">{errors.language}</span>
            )}

            {selectedLang === "Autre" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder={t('langue.otherLanguagePlaceholder')}
                  value={customLang}
                  onChange={(e) => {
                    setCustomLang(e.target.value);
                    if (errors.customLanguage) {
                      setErrors((prev) => ({ ...prev, customLanguage: "" }));
                    }
                  }}
                  className={`w-full border rounded-lg p-2.5 text-xs focus:ring-2 outline-none ${
                    errors.customLanguage
                      ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
                  }`}
                />
                {errors.customLanguage && (
                  <span className="text-red-500 text-xs mt-1 block">{errors.customLanguage}</span>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
              {t('langue.levelLabel')}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                if (errors.level) {
                  setErrors((prev) => ({ ...prev, level: "" }));
                }
              }}
              className={`w-full border rounded-lg p-2.5 text-xs bg-white focus:ring-2 outline-none transition-all ${
                errors.level
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-gray-200 focus:ring-green-500/20 focus:border-green-500'
              }`}
            >
              <option value="">{t('langue.levelPlaceholder')}</option>
              {LEVELS.map((lvl) => (
                <option key={lvl.key} value={lvl.label}>{lvl.label}</option>
              ))}
            </select>
            {errors.level && (
              <span className="text-red-500 text-xs mt-1 block">{errors.level}</span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-xs font-bold hover:bg-green-700 active:scale-95 transition-all shadow-sm"
          >
            {t('langue.addButton')}
          </button>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 mb-4 px-2 uppercase tracking-wider flex items-center justify-between">
            {t('langue.addedLanguagesTitle')}
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 uppercase">
              {formData.languages?.length || 0} {t('langue.count') || 'langues'}
            </span>
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {formData.languages?.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm group hover:border-green-200 transition-all">
                <div>
                  <h4 className="font-bold text-gray-800 text-xs">{item.name}</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 uppercase mt-1 inline-block">
                    {item.level}
                  </span>
                </div>
                <button 
                  onClick={() => removeLanguage(index)} 
                  className="p-2 text-gray-300 hover:text-red-500 transition-all"
                  title={t('langue.deleteButton')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {(!formData.languages || formData.languages.length === 0) && (
              <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                <p className="text-gray-400 text-xs italic">{t('langue.noLanguageMessage')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-12 pt-4 border-t border-gray-100">
        <button 
          onClick={Prev} 
          className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
        >
          {t('langue.prevButton')}
        </button>
        <button 
          onClick={handleNext} 
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 active:scale-95 transition-all shadow-md uppercase tracking-widest"
        >
          {t('langue.nextButton')}
        </button>
      </div>
    </div>
  );
}