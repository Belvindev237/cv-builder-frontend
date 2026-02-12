import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../FormField/InputField";

export default function PersonInfo({ formData, setFormData, Next }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'firstName',
      'lastName',
      'jobTitle',
      'address',
      'postalCode',
      'city',
      'phone',
      'email',
      'website'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = t('validation.required') || "Ce champ est obligatoire";
      }
    });

    // Validation spécifique pour l'email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail') || "Email invalide";
    }

    // Validation spécifique pour le téléphone (optionnel)
    if (formData.phone && !/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = t('validation.invalidPhone') || "Numéro de téléphone invalide";
    }

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      Next(); // Passer à l'étape suivante
    } else {
      setErrors(validationErrors);
      // Scroll vers le premier champ avec erreur (optionnel)
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">
          {t('person_info.title')}
        </h3>

        <div className="space-y-4">
          {/* Ligne : Prénom et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={t('person_info.firstName')}
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder={t('person_info.firstNamePlaceholder')}
              error={errors.firstName}
              required
            />
            <InputField
              label={t('person_info.lastName')}
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder={t('person_info.lastNamePlaceholder')}
              error={errors.lastName}
              required
            />
          </div>

          {/* Ligne : Titre du poste */}
          <InputField
            label={t('person_info.jobTitle')}
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            placeholder={t('person_info.jobTitlePlaceholder')}
            error={errors.jobTitle}
            required
          />

          {/* Ligne : Adresse complète */}
          <InputField
            label={t('person_info.address')}
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder={t('person_info.addressPlaceholder')}
            error={errors.address}
            required
          />

          {/* Ligne : Code Postal et Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={t('person_info.postalCode')}
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={handleChange}
              placeholder={t('person_info.postalCodePlaceholder')}
              error={errors.postalCode}
              required
            />
            <InputField
              label={t('person_info.city')}
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder={t('person_info.cityPlaceholder')}
              error={errors.city}
              required
            />
          </div>

          {/* Ligne : Téléphone et Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label={t('person_info.phone')}
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder={t('person_info.phonePlaceholder')}
              error={errors.phone}
              required
            />
            <InputField
              label={t('person_info.email')}
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder={t('person_info.emailPlaceholder')}
              error={errors.email}
              required
            />
          </div>

          {/* Ligne : Site Web */}
          <InputField
            label={t('person_info.website')}
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder={t('person_info.websitePlaceholder')}
            error={errors.website}
            required
          />
        </div>
      </div>

      {/* --- NAVIGATION HARMONISÉE --- */}
      <div className="flex justify-end items-center mt-10 pt-4 border-t border-gray-100">
        <button
          onClick={handleNext}
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 transition-all uppercase tracking-widest shadow-md active:scale-95"
        >
          {t('person_info.nextButton')}
        </button>
      </div>
    </div>
  );
}