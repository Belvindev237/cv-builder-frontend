import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../FormField/InputField";

export default function Education({ formData, setFormData, Prev, Next }) {
  const { t } = useTranslation();

  const [localEdu, setLocalEdu] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalEdu((prev) => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEducation = () => {
    const newErrors = {};

    // Validation des champs obligatoires
    if (!localEdu.degree || localEdu.degree.trim() === "") {
      newErrors.degree = t('validation.required');
    }
    if (!localEdu.institution || localEdu.institution.trim() === "") {
      newErrors.institution = t('validation.required');
    }
    if (!localEdu.startDate) {
      newErrors.startDate = t('validation.required');
    }
    if (!localEdu.endDate) {
      newErrors.endDate = t('validation.required');
    }
    if (!localEdu.fieldOfStudy || localEdu.fieldOfStudy.trim() === "") {
      newErrors.fieldOfStudy = t('validation.required');
    }

    // Validation des dates
    if (localEdu.startDate && localEdu.endDate) {
      const start = new Date(localEdu.startDate);
      const end = new Date(localEdu.endDate);
      
      if (end < start) {
        newErrors.endDate = t('validation.endDateBeforeStart');
      }
    }

    return newErrors;
  };

  const addEducation = () => {
    const validationErrors = validateEducation();
    
    if (Object.keys(validationErrors).length === 0) {
      setFormData((prev) => ({
        ...prev,
        educationList: [...(prev.educationList || []), localEdu],
      }));
      setLocalEdu({ 
        degree: "", 
        institution: "", 
        startDate: "", 
        endDate: "", 
        fieldOfStudy: "" 
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const removeEducation = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      educationList: prev.educationList.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleNext = () => {
    // Vérifier qu'au moins une formation a été ajoutée
    if (!formData.educationList || formData.educationList.length === 0) {
      alert(t('validation.atLeastOneEducation') || "Veuillez ajouter au moins une formation");
      return;
    }
    Next();
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* FORMULAIRE */}
        <div className="flex-1 bg-white p-5 border border-gray-100 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-2">
            {t("education.titleAdd")}
          </h3>

          <div className="space-y-3">
            <InputField
              label={t("education.degree")}
              name="degree"
              value={localEdu.degree}
              onChange={handleChange}
              placeholder={t("education.degreePlaceholder")}
              error={errors.degree}
              required
            />
            <InputField
              label={t("education.institution")}
              name="institution"
              value={localEdu.institution}
              onChange={handleChange}
              placeholder={t("education.institutionPlaceholder")}
              error={errors.institution}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label={t("education.startDate")}
                name="startDate"
                type="date"
                value={localEdu.startDate}
                onChange={handleChange}
                error={errors.startDate}
                required
              />
              <InputField
                label={t("education.endDate")}
                name="endDate"
                type="date"
                value={localEdu.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
              />
            </div>
            <InputField
              label={t("education.fieldOfStudy")}
              name="fieldOfStudy"
              value={localEdu.fieldOfStudy}
              onChange={handleChange}
              placeholder={t("education.fieldPlaceholder")}
              error={errors.fieldOfStudy}
              required
            />
            <button
              onClick={addEducation}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all mt-2"
            >
              {t("education.addButton")}
            </button>
          </div>
        </div>

        {/* LISTE */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-800 mb-3 px-1 flex items-center justify-between">
            {t("education.recordedHistory")}
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 uppercase">
              {formData.educationList?.length || 0} {t("education.countLabel")}
            </span>
          </h3>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {formData.educationList?.map((edu, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex justify-between items-start group hover:shadow-md hover:border-blue-100 transition-all">
                <div className="flex-1 pr-3">
                  <h4 className="font-bold text-gray-800 text-[11px] uppercase">{edu.degree}</h4>
                  <p className="text-blue-600 font-semibold text-[10px]">{edu.institution}</p>
                  <p className="text-gray-500 text-[9px] mt-0.5">{edu.fieldOfStudy}</p>
                  <p className="text-gray-400 text-[9px] mt-1 italic">
                    📅 {edu.startDate} — {edu.endDate || t("education.present")}
                  </p>
                </div>
                <button 
                  onClick={() => removeEducation(index)} 
                  className="text-gray-300 hover:text-red-500 p-1 transition-colors"
                  title={t("education.deleteButton")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {(!formData.educationList || formData.educationList.length === 0) && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center bg-gray-50/50">
                <p className="text-xs text-gray-400 italic">{t("education.noEducation")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between items-center mt-10 pt-4 border-t border-gray-100">
        <button 
          onClick={Prev} 
          className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
        >
          {t("education.prev")}
        </button>
        <button 
          onClick={handleNext} 
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 uppercase tracking-widest shadow-md active:scale-95 transition-all"
        >
          {t("education.next")}
        </button>
      </div>
    </div>
  );
}