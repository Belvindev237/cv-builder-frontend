import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mt-20 py-24 bg-blue-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 items-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block">
            <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
            {t('hero.title.line1')}
            <span className="block text-blue-600 mt-2">
              {t('hero.title.highlight')}
            </span>
          </h1>

          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
            {t('hero.description.line1')}
            <br />
            <strong className="text-gray-900 font-bold">
              {t('hero.description.bold')}
            </strong>
            <br />
            <em className="text-gray-600">
              {t('hero.description.italic')}
            </em>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-green-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all transform hover:bg-green-600"
              onClick={() => navigate("/select_template")}
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <i className="fas fa-rocket"></i>
                {t('hero.buttons.primary')}
              </span>
            </button>
            <button className="border-2 sm:border-4 border-blue-600 text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105">
              {t('hero.buttons.secondary')}
            </button>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-purple-500 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-pink-500 border-4 border-white shadow-lg"></div>
              <div className="w-12 h-12 rounded-full bg-indigo-500 border-4 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                +10K
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold text-gray-900">
                {t('hero.socialProof.users')}
              </div>
              <div className="text-gray-600">
                {t('hero.socialProof.trust')}
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-2xl border-4 border-blue-100">
            <img
              src="/images/image1.png"
              alt={t('hero.imageAlt')}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;