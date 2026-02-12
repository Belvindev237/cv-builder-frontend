import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Features() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: "fa-bolt",
      color: "bg-yellow-400",
      borderColor: "border-yellow-500",
      hoverBg: "hover:bg-yellow-50",
      titleKey: "features.cards.easy.title",
      descriptionKey: "features.cards.easy.description",
    },
    {
      icon: "fa-file-lines",
      color: "bg-blue-500",
      borderColor: "border-blue-600",
      hoverBg: "hover:bg-blue-50",
      titleKey: "features.cards.templates.title",
      descriptionKey: "features.cards.templates.description",
    },
    {
      icon: "fa-share-nodes",
      color: "bg-green-500",
      borderColor: "border-green-600",
      hoverBg: "hover:bg-green-50",
      titleKey: "features.cards.share.title",
      descriptionKey: "features.cards.share.description",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900">
            {t('features.section.title')}
            <span className="block text-blue-600 mt-2">
              {t('features.section.subtitle')}
            </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            {t('features.section.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white p-8 rounded-3xl shadow-lg ${feature.hoverBg} transition-all duration-300 border-4 ${feature.borderColor} hover:shadow-2xl hover:-translate-y-3 cursor-pointer`}
            >
              <div
                className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl`}
              >
                <i
                  className={`fa-solid ${feature.icon} text-white text-3xl`}
                ></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            className="bg-gray-900 hover:bg-blue-600 text-white font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 text-xl"
            onClick={() => navigate("/select_template")}
          >
            <span className="flex items-center gap-4">
              <span>{t('features.cta')}</span>
              <i className="fas fa-arrow-right"></i>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}