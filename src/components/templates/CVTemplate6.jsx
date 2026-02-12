import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate6({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Calcul du zoom proportionnel
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Largeur approximative de 21cm en pixels (96 DPI)
        
        if (windowWidth < cvWidth) {
          // On laisse une petite marge de 20px pour ne pas coller aux bords
          setScale((windowWidth - 20) / cvWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize(); // Calcul initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    firstName = t('placeholders.firstName'),
    lastName = t('placeholders.lastName'),
    jobTitle = t('placeholders.jobTitle'),
    email = t('placeholders.email'),
    phone = t('placeholders.phone'),
    address = t('placeholders.address'),
    summary = t('placeholders.summary'),
    hobbies = t('placeholders.hobbies'),
    experienceList = [],
    educationList = [],
    skill = { technicalSkills: [], softSkills: [] },
    languages = [],
  } = formData || {};

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (e) { return dateString; }
  };

  const StarIcon = () => (
    <span className="text-base leading-none select-none text-gray-400">✦</span>
  );

  return (
    <div 
      className="flex justify-center bg-gray-50 min-h-screen md:bg-transparent overflow-hidden"
      style={{ height: `calc(29.7cm * ${scale} + 40px)` }} // Ajuste la hauteur du parent pour éviter le vide
    >
      {/* Wrapper de transformation */}
      <div 
        ref={containerRef}
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.2s ease-out"
        }}
        className="shrink-0 shadow-2xl print:shadow-none print:scale-100"
      >
        {/* LE CV (Format A4 Strict) */}
        <div className="w-[21cm] h-[29.7cm] bg-white flex relative overflow-hidden font-sans">
          
          {/* SIDEBAR GAUCHE */}
          <div className="w-[35%] bg-[#e7dfd5] flex flex-col items-center py-8 px-6 z-10 shrink-0">
            <div className="mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-200">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">👤</div>
                )}
              </div>
            </div>

            <div className="w-full space-y-5 text-center">
              <div>
                <span className="text-xs block font-serif italic mb-0.5 opacity-60">phone</span>
                <p className="text-[11px] text-gray-800 font-medium">{phone}</p>
              </div>
              <div>
                <span className="text-xs block font-serif italic mb-0.5 opacity-60">mail</span>
                <p className="text-[11px] text-gray-800 break-all leading-tight px-2">{email}</p>
              </div>
              <div>
                <span className="text-xs block font-serif italic mb-0.5 opacity-60">address</span>
                <p className="text-[11px] text-gray-800 leading-tight px-2">{address}</p>
              </div>
            </div>

            {languages.length > 0 && (
              <div className="w-full mt-10 text-center">
                <h3 className="text-xs font-serif font-bold mb-3 uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-0.5">
                  {t('template6.languages') || 'Langues'}
                </h3>
                <div className="space-y-1">
                  {languages.map((lang, i) => (
                    <div key={i} className="text-[11px] text-gray-800">
                      <span className="font-semibold">{lang.name}</span>
                      {lang.level && <span className="opacity-70"> — {lang.level}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hobbies && (
              <div className="w-full mt-10 text-center">
                <h3 className="text-xs font-serif font-bold mb-3 uppercase tracking-widest text-gray-800 border-b border-gray-400 pb-0.5">
                  {t('template6.hobbies') || 'Loisirs'}
                </h3>
                <div className="flex flex-col gap-1 text-[11px] text-gray-800 italic">
                  {hobbies.split(",").map((hobby, i) => (
                    <span key={i} className="leading-tight">{hobby.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CONTENU PRINCIPAL */}
          <div className="w-[65%] bg-white py-10 px-10 flex flex-col h-full overflow-hidden">
            <div className="mb-8">
              <h1 className="text-6xl font-serif font-medium text-gray-900 leading-[0.85] tracking-tight mb-3">
                {firstName}<br />
                <span className="font-bold">{lastName}</span>
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-gray-400"></div>
                <p className="text-xl font-serif italic text-gray-600 tracking-wide">
                  {jobTitle}
                </p>
              </div>
            </div>

            {summary && (
              <div className="mb-8 text-[12.5px] text-gray-700 leading-relaxed text-justify border-l-2 border-[#e7dfd5] pl-5 italic">
                <p>{summary}</p>
              </div>
            )}

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <StarIcon />
                <h2 className="text-lg font-serif font-bold uppercase tracking-widest text-gray-800">
                  {t('template6.experience') || 'Expériences'}
                </h2>
              </div>

              <div className="space-y-6 border-l border-gray-200 ml-1.5 pl-6">
                {experienceList.map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[30.5px] top-1.5 w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="mb-2">
                      <h3 className="text-[14px] font-bold text-gray-900">{exp.company}</h3>
                      <div className="flex justify-between items-baseline">
                        <p className="text-[12px] italic text-gray-600 font-serif">{exp.job_title || exp.jobTitle}</p>
                        <span className="text-[10px] text-gray-400">
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Présent'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-600 leading-snug whitespace-pre-line text-justify">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <StarIcon />
                  <h2 className="text-lg font-serif font-bold uppercase tracking-widest text-gray-800">
                    {t('template6.skills') || 'Compétences'}
                  </h2>
                </div>
                <div className="flex flex-col gap-2 ml-1.5">
                  {[...(skill.technicalSkills || []), ...(skill.softSkills || [])].map((s, i) => (
                    <div key={i} className="flex">
                      <span className="bg-[#e7dfd5] text-gray-800 px-4 py-1 rounded-sm text-[11px] font-bold uppercase tracking-widest">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center gap-3 mb-4">
                <StarIcon />
                <h2 className="text-lg font-serif font-bold uppercase tracking-widest text-gray-800">
                  {t('template6.education') || 'Formations'}
                </h2>
              </div>
              <div className="space-y-4 border-l border-gray-200 ml-1.5 pl-6">
                {educationList.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[30.5px] top-1.5 w-2 h-2 rounded-full bg-gray-400"></div>
                    <h3 className="text-[14px] font-bold text-gray-900">{edu.institution}</h3>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[12px] italic text-gray-600 font-serif">{edu.degree}</p>
                      <span className="text-[10px] text-gray-400">{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CVTemplate6;