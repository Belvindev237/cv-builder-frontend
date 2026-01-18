//import React from "react";

export default function ResumePro({ formData, setFormData, Prev, Next }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calcul de la longueur pour le feedback visuel du résumé
  const charCount = formData.summary?.length || 0;

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Résumé Professionnel
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Présentez-vous en quelques phrases. Mettez en avant vos points forts
          et votre objectif de carrière.
        </p>

        {/* --- CHAMP RÉSUMÉ --- */}
        <div className="relative mb-10">
          <textarea
            name="summary"
            rows="6"
            value={formData.summary || ""}
            onChange={handleChange}
            placeholder="Ex: Passionné par le développement web avec 5 ans d'expérience..."
            className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-blue-500 outline-none transition-all shadow-sm bg-white text-gray-700 leading-relaxed"
          ></textarea>

          {/* Compteur de caractères dynamique */}
          <div className="absolute bottom-4 right-4">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                charCount > 600
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {charCount} caractères
            </span>
          </div>
        </div>

        {/* --- NOUVELLE SECTION : CENTRES D'INTÉRÊT --- */}
        <div className="border-t pt-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Centres d’intérêt & Hobbies
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Qu'est-ce qui vous passionne en dehors du travail ? Cela permet de
            montrer votre personnalité.
          </p>

          <textarea
            name="hobbies"
            rows="3"
            value={formData.hobbies || ""}
            onChange={handleChange}
            placeholder="Ex: Photographie, Marathon, Piano, Bénévolat..."
            className="w-full border-2 border-gray-100 rounded-xl p-4 focus:border-blue-500 outline-none transition-all shadow-sm bg-white text-gray-700 leading-relaxed"
          ></textarea>
          <p className="text-[11px] text-gray-400 mt-2 italic">
            Astuce : Séparez vos centres d'intérêt par des virgules.
          </p>
        </div>

        {/* --- PETITS CONSEILS DE RÉDACTION (Gardés) --- */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 font-bold mb-1">💡 Conseil 1</p>
            <p className="text-xs text-blue-600 italic">
              Soyez direct : évitez les phrases trop longues.
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 font-bold mb-1">💡 Conseil 2</p>
            <p className="text-xs text-blue-600 italic">
              Utilisez des mots-clés liés à votre métier.
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 font-bold mb-1">💡 Conseil 3</p>
            <p className="text-xs text-blue-600 italic">
              Mentionnez un résultat ou une spécialité forte.
            </p>
          </div>
        </div>

        {/* --- NAVIGATION --- */}
        <div className="flex justify-between mt-12 pt-6 border-t">
          <button
            onClick={Prev}
            className="text-gray-600 font-semibold hover:text-black"
          >
            ← Précédent
          </button>
          <button
            onClick={Next}
            className="bg-blue-600 text-white px-10 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-md"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
