import React from "react";
import InputField from "../FormField/InputField";

export default function PersonInfo({ formData, setFormData, Next }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-gray-50/30 rounded-lg">
      <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">
          Informations Personnelles
        </h3>

        <div className="space-y-4">
          {/* Ligne : Prénom et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Prénom"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder="Ex: Jean"
            />
            <InputField
              label="Nom"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="Ex: Dupont"
            />
          </div>

          {/* Ligne : Titre du poste */}
          <InputField
            label="Titre du poste"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            placeholder="Ex: Développeur Fullstack"
          />

          {/* Ligne : Adresse complète */}
          <InputField
            label="Adresse"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Ex: 12 rue des Développeurs"
          />

          {/* Ligne : Code Postal et Ville */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Code Postal"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={handleChange}
              placeholder="Ex: 75000"
            />
            <InputField
              label="Ville"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="Ex: Paris"
            />
          </div>

          {/* Ligne : Téléphone et Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Téléphone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Ex: 06 00 00 00 00"
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Ex: jean.dupont@mail.com"
            />
          </div>

          {/* Ligne : Site Web */}
          <InputField
            label="Site Web / Portfolio / LinkedIn"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="Ex: linkedin.com/in/mon-profil"
          />
        </div>
      </div>

      {/* --- NAVIGATION HARMONISÉE --- */}
      <div className="flex justify-end items-center mt-10 pt-4 border-t border-gray-100">
        {/* Pas de bouton précédent sur la première page, donc on pousse le bouton Suivant à droite */}
        <button
          onClick={Next}
          className="px-8 py-2 bg-gray-900 text-white rounded-full text-xs font-black hover:bg-blue-600 transition-all uppercase tracking-widest shadow-md active:scale-95"
        >
          Commencer →
        </button>
      </div>
    </div>
  );
}
