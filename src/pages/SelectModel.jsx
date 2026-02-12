import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CVTemplate1 from "../components/templates/CVTemplate1";
import CVTemplate2 from "../components/templates/CVTemplate2";
import CVTemplate3 from "../components/templates/CVTemplate3";
import CVTemplate4 from "../components/templates/CVTemplate4";
import CVTemplate5 from "../components/templates/CVTemplate5";
import CVTemplate6 from "../components/templates/CVTemplate6";
import CVTemplate7 from "../components/templates/CVTemplate7";
import CVTemplate8 from "../components/templates/CVTemplate8";
import CVTemplate9 from "../components/templates/CVTemplate9";
import CVTemplate10 from "../components/templates/CVTemplate10";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TemplateWrapper = ({ Component }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // On force le ratio exact : LargeurConteneur / LargeurA4
        const newScale = containerWidth / 794;
        setScale(newScale);
      }
    };

    // On utilise ResizeObserver pour surveiller la carte elle-même
    const ro = new ResizeObserver(() => handleResize());
    if (containerRef.current) ro.observe(containerRef.current);

    // Premier calcul immédiat
    handleResize();

    return () => ro.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-slate-50 overflow-hidden relative rounded-t-xl"
      style={{ minHeight: '100%' }}
    >
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: "top left",
          width: "794px",
          height: "1123px",
          position: "absolute",
          top: 0,
          left: 0,
          visibility: scale === 0 ? "hidden" : "visible"
        }}
      >
        <Component formData={{}} />
      </div>
    </div>
  );
};

export default function SelectModel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(null);

  const models = [
    { id: 1, name: "Moderne Bleu", desc: "Sidebar colorée", component: CVTemplate1, badge: t('selectModel.badges.popular') },
    { id: 2, name: "Minimaliste", desc: "Professionnel", component: CVTemplate2 },
    { id: 3, name: "Créatif Vert", desc: "Design moderne", component: CVTemplate3, badge: t('selectModel.badges.new') },
    { id: 4, name: "Corporate", desc: "Lignes d'accent", component: CVTemplate4 },
    { id: 5, name: "Timeline Orange", desc: "Chronologie", component: CVTemplate5, badge: t('selectModel.badges.new') },
    { id: 6, name: "Moderne Bleu", desc: "Épuré", component: CVTemplate6, badge: t('selectModel.badges.popular') },
    { id: 7, name: "Minimaliste", desc: "Noir & Blanc", component: CVTemplate7 },
    { id: 8, name: "Créatif Vert", desc: "Cartes", component: CVTemplate8, badge: t('selectModel.badges.new') },
    { id: 9, name: "Corporate", desc: "Business", component: CVTemplate9 },
    { id: 10, name: "Timeline Orange", desc: "Moderne", component: CVTemplate10, badge: t('selectModel.badges.new') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 px-4 py-10 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header modernisé */}
          <header className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 animate-[fadeIn_0.6s_ease-out]">
                {t('selectModel.header.title')}
              </h1>
              <div className="h-1 w-24 bg-blue-600 rounded-full mx-auto"></div>
            </div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto animate-[fadeIn_0.8s_ease-out]">
              {t('selectModel.header.description')}
            </p>
          </header>

          {/* Grid de templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {models.map((model, index) => (
              <div 
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`group relative flex flex-col bg-white rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
                  ${selectedModel === model.id 
                    ? "ring-2 ring-blue-600 ring-offset-4 shadow-2xl shadow-blue-500/20 scale-[1.02]" 
                    : "border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:scale-[1.01]"
                  }`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Badge moderne */}
                {model.badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg
                      ${model.badge === t('selectModel.badges.popular') 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-blue-600 text-white'
                      }
                    `}>
                      {model.badge === t('selectModel.badges.popular') ? '⭐' : '✨'}
                      {model.badge}
                    </span>
                  </div>
                )}

                {/* Indicateur de sélection */}
                {selectedModel === model.id && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Container de preview */}
                <div  className="relative w-full bg-white overflow-hidden border-b border-slate-100" 
     style={{ aspectRatio: '1/1.414' }}>
                  <TemplateWrapper Component={model.component} />
                </div>

                {/* Info card */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{model.name}</h3>
                    <p className="text-sm text-slate-500">{model.desc}</p>
                  </div>
                  
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      navigate(`/builder_with_model/${model.id}`); 
                    }}
                    className={`
                      w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300
                      ${selectedModel === model.id 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transform hover:-translate-y-0.5" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                      }
                    `}
                  >
                    {selectedModel === model.id ? (
                      <span className="flex items-center justify-center gap-2">
                        {t('selectModel.actions.continue')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    ) : (
                      t('selectModel.actions.choose')
                    )}
                  </button>
                </div>

                {/* Overlay au hover */}
                <div className={`
                  absolute inset-0 rounded-2xl border-2 border-blue-500 transition-opacity duration-300 pointer-events-none
                  ${selectedModel === model.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-20'}
                `}></div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bouton flottant mobile */}
      {selectedModel && (
        <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 animate-[slideUp_0.3s_ease-out]">
          <button 
            onClick={() => navigate(`/builder_with_model/${selectedModel}`)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-blue-700"
          >
            {t('selectModel.actions.continue')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      )}

      <Footer />

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}