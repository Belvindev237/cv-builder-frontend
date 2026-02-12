import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate4({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // --- LOGIQUE DE ZOOM ADAPTATIF ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Largeur A4 (21cm) en pixels à 96 DPI
        if (windowWidth < cvWidth) {
          setScale((windowWidth - 20) / cvWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
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
    website = "",
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
    } catch (e) {
      return dateString;
    }
  };

  const colors = {
    bgLeft: "bg-[#eaddcf]",
    bgRight: "bg-white",
    textDark: "text-[#3d3d3d]",
    textMuted: "text-[#6b6b6b]",
    accent: "text-[#5a4638]",
  };

  return (
    <>
      {/* --- STYLE POUR L'IMPRESSION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .cv-container { box-shadow: none !important; margin: 0 !important; transform: none !important; width: 21cm !important; height: 29.7cm !important; }
        }
      `}} />

      <div className="flex justify-center bg-zinc-100 py-10 print:p-0 print:bg-white overflow-hidden min-h-screen">
        <div
          ref={containerRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="cv-container w-[21cm] h-[29.7cm] mx-auto bg-white shadow-2xl overflow-hidden font-sans flex shrink-0 print:shadow-none"
        >
          
          {/* COLONNE GAUCHE (BEIGE) */}
          <div className={`${colors.bgLeft} w-[35%] flex-shrink-0 flex flex-col px-6 py-10 print:bg-[#eaddcf]`} style={{ WebkitPrintColorAdjust: 'exact' }}>
            
            {/* PHOTO DE PROFIL */}
            <div className="mb-10 flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#d6c4b0] flex items-center justify-center text-4xl text-white">
                    👤
                  </div>
                )}
              </div>
            </div>

            {/* CONTACT */}
            <div className="mb-10">
              <h3 className={`font-bold tracking-widest text-sm mb-4 uppercase ${colors.textDark} border-b border-gray-400 pb-1`}>
                {t('template4.contact') || 'CONTACT'}
              </h3>
              <ul className="space-y-4 text-xs text-gray-700">
                {phone && (
                  <li className="flex items-start gap-3">
                    <span className="text-base">📱</span>
                    <span className="mt-0.5">{phone}</span>
                  </li>
                )}
                {email && (
                  <li className="flex items-start gap-3">
                    <span className="text-base">✉️</span>
                    <span className="break-all mt-0.5">{email}</span>
                  </li>
                )}
                {website && (
                  <li className="flex items-start gap-3">
                    <span className="text-base">🌐</span>
                    <span className="break-all mt-0.5">{website}</span>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-3">
                    <span className="text-base">📍</span>
                    <span className="mt-0.5">{address}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* COMPÉTENCES */}
            {skill.technicalSkills?.length > 0 && (
              <div className="mb-8">
                <h3 className={`font-bold tracking-widest text-sm mb-4 uppercase ${colors.textDark} border-b border-gray-400 pb-1`}>
                  {t('template4.skills') || 'COMPÉTENCES'}
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-2 text-xs text-gray-700">
                  {skill.technicalSkills.slice(0, 8).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* QUALITÉS */}
            {skill.softSkills?.length > 0 && (
              <div className="mb-8">
                <h3 className={`font-bold tracking-widest text-sm mb-4 uppercase ${colors.textDark} border-b border-gray-400 pb-1`}>
                  {t('template4.softSkills') || 'QUALITÉS'}
                </h3>
                <ul className="list-disc list-outside ml-4 space-y-2 text-xs text-gray-700">
                  {skill.softSkills.slice(0, 6).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* LANGUES */}
            {languages.length > 0 && (
              <div className="mb-8">
                 <h3 className={`font-bold tracking-widest text-sm mb-4 uppercase ${colors.textDark} border-b border-gray-400 pb-1`}>
                  {t('template4.languages') || 'LANGUES'}
                </h3>
                <ul className="space-y-2 text-xs text-gray-700">
                  {languages.map((lang, i) => (
                    <li key={i} className="flex justify-between">
                      <span className="font-semibold">{lang.name}</span>
                      <span className="italic opacity-80">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* COLONNE DROITE (BLANC) */}
          <div className="w-[65%] px-10 py-12 flex flex-col overflow-hidden">
            
            {/* HEADER NOM & TITRE */}
            <div className="mb-8">
              <h1 className="text-xl tracking-[0.2em] text-gray-600 uppercase font-semibold mb-2">
                {firstName} <span className="text-gray-900">{lastName}</span>
              </h1>
              <h2 className="text-4xl font-serif font-bold text-[#5a4638] uppercase leading-tight tracking-wide">
                {jobTitle}
              </h2>
            </div>

            {/* RESUME */}
            <div className="mb-10 text-sm text-gray-600 leading-relaxed text-justify">
              <p className="line-clamp-5">{summary}</p>
            </div>

            {/* EXPÉRIENCE */}
            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 inline-block">
                {t('template4.experience') || 'EXPÉRIENCE PROFESSIONNELLE'}
              </h3>
              
              <div className="space-y-6 border-l-2 border-[#b0a090] ml-1 pl-6 relative">
                {experienceList.slice(0, 3).map((exp, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#b0a090]"></div>
                    <h4 className="font-bold text-gray-800 text-sm">{exp.job_title || exp.jobTitle}</h4>
                    <div className="text-xs text-[#8d6e63] font-semibold italic mb-1">
                      {exp.company}  | {formatDate(exp.start_date || exp.startDate)} - {exp.end_date || exp.endDate ? formatDate(exp.end_date || exp.endDate) : t('template4.present')}
                    </div>
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line line-clamp-4">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORMATIONS */}
            <div className="mb-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 inline-block">
                 {t('template4.education') || 'FORMATIONS'}
              </h3>
              
              <div className="space-y-6 border-l-2 border-[#b0a090] ml-1 pl-6 relative">
                {educationList.slice(0, 2).map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#b0a090]"></div>
                    <h4 className="font-bold text-gray-800 text-sm">{edu.degree}</h4>
                    <div className="text-xs text-[#8d6e63] font-semibold italic mb-1">
                       {edu.institution}, {edu.city}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(edu.start_date || edu.startDate)} - {formatDate(edu.end_date || edu.endDate) || t('template4.present')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOBBIES */}
            {hobbies && (
              <div className="mt-auto">
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-800 mb-2 border-b-2 border-gray-200 pb-1 inline-block">
                  {t('template4.hobbies') || "CENTRES D'INTÉRÊT"}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{hobbies}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate4;