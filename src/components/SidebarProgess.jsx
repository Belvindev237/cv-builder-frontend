import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SidebarProgress({ currentStep }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sections = [
    t('side_bar_progress.sections.personal'),
    t('side_bar_progress.sections.work_experience'),
    t('side_bar_progress.sections.education'),
    t('side_bar_progress.sections.skills'),
    t('side_bar_progress.sections.languages'),
    t('side_bar_progress.sections.summary'),
    t('side_bar_progress.sections.export'),
  ];

  return (
    <aside className="w-full lg:w-72 bg-slate-900 border-b lg:border-r border-slate-800 p-4 lg:p-6 shadow-sm flex flex-col lg:h-screen lg:sticky lg:top-0 text-white">
      {/* SECTION HAUTE */}
      <div className="flex-grow-0">
        <div className="mb-4 lg:mb-8 flex justify-between items-center lg:block">
          <div>
            <h2 className="text-lg lg:text-xl font-black text-white tracking-tight">
              {t('side_bar_progress.title')}
            </h2>
            <p className="text-[10px] lg:text-xs text-slate-500 uppercase font-bold tracking-widest">
              {t('side_bar_progress.step')} {currentStep + 1} / {sections.length}
            </p>
          </div>

          {/* BOUTON ACCUEIL MOBILE (Visible uniquement sur mobile) */}
          <button
            onClick={() => navigate("/")}
            className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xl transition-colors"
            aria-label={t('side_bar_progress.backHome')}
          >
            🏠
          </button>
        </div>

        {/* LISTE DES ÉTAPES (Horizontale sur mobile) */}
        <ul className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:space-y-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2">
          {sections.map((label, index) => {
            const isActive = index === currentStep;
            const isDone = index < currentStep;

            return (
              <li
                key={index}
                className={`flex items-center transition-all duration-300 ${
                  isActive &&
                  "lg:bg-blue-600/10 lg:border lg:border-blue-500/20 lg:p-3 lg:rounded-xl lg:w-full"
                }`}
              >
                <div className="relative flex flex-col items-center group">
                  <div
                    className={`w-7 h-7 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      isDone
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-900/50 scale-110 lg:scale-100"
                          : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </div>
                  {isActive && (
                    <span className="lg:hidden absolute -bottom-6 text-[8px] font-bold text-blue-400 whitespace-nowrap uppercase tracking-tighter">
                      {label}
                    </span>
                  )}
                </div>

                <span
                  className={`hidden lg:block ml-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : isDone
                        ? "text-white"
                        : "text-slate-600"
                  }`}
                >
                  {label}
                </span>

                {index !== sections.length - 1 && (
                  <div className="lg:hidden w-4 h-[2px] bg-slate-800 mx-1">
                    <div
                      className={`h-full transition-all ${isDone ? "bg-green-500 w-full" : "w-0"}`}
                    ></div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* SECTION BASSE (Visible uniquement sur Desktop) */}
      <div className="mt-auto pt-6 border-t border-slate-800 hidden lg:block">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-xl transition-all font-bold text-sm group"
        >
          <span className="text-lg group-hover:scale-120 transition-transform">
            🏠
          </span>
          <span>{t('side_bar_progress.backHome')}</span>
        </button>
      </div>
    </aside>
  );
}