import React from "react";

export default function SidebarProgress({ currentStep }) {
  const sections = [
    "Infos personnelles",
    "Expériences",
    "Formation",
    "Compétences",
    "Langues",
    "Résumé professionnel",
    "Export",
  ];

  return (
    <aside className="w-full lg:w-72 bg-white border-b lg:border-r border-gray-100 p-4 lg:p-6 shadow-sm">
      <div className="mb-4 lg:mb-8 flex justify-between items-center lg:block">
        <h2 className="text-lg lg:text-xl font-black text-gray-900 tracking-tight">
          Création CV
        </h2>
        <p className="text-[10px] lg:text-xs text-gray-400 uppercase font-bold tracking-widest">
          Étape {currentStep + 1} / {sections.length}
        </p>
      </div>

      {/* LISTE : Horizontale sur mobile, Verticale sur desktop */}
      <ul className="flex flex-row lg:flex-col justify-between items-center lg:items-start lg:space-y-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2">
        {sections.map((label, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <li
              key={index}
              className={`flex items-center transition-all duration-300 ${
                isActive &&
                "lg:bg-blue-50 lg:border lg:border-blue-100 lg:p-3 lg:rounded-xl lg:w-full"
              }`}
            >
              {/* Le Cercle (Indicateur) */}
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-7 h-7 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 text-white ring-4 ring-blue-100 scale-110 lg:scale-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </div>

                {/* Tooltip mobile : affiche le nom au survol ou si actif (optionnel) */}
                {isActive && (
                  <span className="lg:hidden absolute -bottom-6 text-[8px] font-bold text-blue-600 whitespace-nowrap uppercase tracking-tighter">
                    {label}
                  </span>
                )}
              </div>

              {/* Label : Masqué sur mobile (hidden), affiché sur desktop (lg:block) */}
              <span
                className={`hidden lg:block ml-4 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-blue-700"
                    : isDone
                    ? "text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>

              {/* Ligne de liaison horizontale (visible uniquement entre les étapes sur mobile) */}
              {index !== sections.length - 1 && (
                <div className="lg:hidden w-4 h-[2px] bg-gray-100 mx-1">
                  <div
                    className={`h-full transition-all ${
                      isDone ? "bg-green-500 w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
