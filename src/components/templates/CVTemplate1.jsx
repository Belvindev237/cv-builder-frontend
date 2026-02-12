import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate1({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // --- LOGIQUE DE ZOOM ADAPTATIF ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Correspond à la largeur 21cm en pixels à 96 DPI
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

  return (
    <>
      {/* --- STYLE INJECTÉ POUR L'IMPRESSION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
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
          className="cv-container w-[21cm] h-[29.7cm] flex bg-white shadow-2xl font-sans text-slate-800 shrink-0 print:shadow-none"
        >
          {/* --- SIDEBAR --- */}
          <div className="w-[35%] bg-blue-600 text-white p-8 flex flex-col gap-6 print:bg-blue-600" style={{ WebkitPrintColorAdjust: 'exact' }}>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4 overflow-hidden bg-blue-700">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl flex items-center justify-center h-full">👤</span>
                )}
              </div>
              <h1 className="text-2xl font-bold break-words">{firstName} {lastName}</h1>
              <p className="text-blue-200 text-xs mt-2 uppercase tracking-wider">{jobTitle}</p>
            </div>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-blue-400 pb-2">
                {t('template1.contact')}
              </h3>
              <div className="space-y-2 text-[10px]">
                <p>✉️ {email}</p>
                <p>📞 {phone}</p>
                <p>📍 {address}</p>
                {website && <p className="truncate">🌐 {website}</p>}
              </div>
            </section>

            {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-blue-400 pb-2">
                  {t('template1.skills')}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skill?.technicalSkills?.map((s, i) => (
                    <div key={i} className="text-[12px] bg-blue-700 px-2 py-1 rounded">{s}</div>
                  ))}
                  {skill?.softSkills?.map((s, i) => (
                    <div key={i} className="text-[12px] bg-blue-500 px-2 py-1 rounded italic">{s}</div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-blue-400 pb-2">
                  {t('template1.languages')}
                </h3>
                <div className="space-y-1 text-[10px]">
                  {languages.map((lang, i) => (
                    <p key={i}><strong>{lang.name}</strong> - {lang.level}</p>
                  ))}
                </div>
              </section>
            )}

            {hobbies && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-blue-400 pb-2">
                  {t('template1.hobbies')}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {hobbies.split(",").map((hobby, i) => (
                    <span key={i} className="text-[11px] bg-blue-500 px-2 py-0.5 rounded">
                      {hobby.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="flex-1 p-10 space-y-8 overflow-hidden">
            <section>
              <h3 className="text-md font-bold text-blue-600 uppercase tracking-wider mb-3 border-b-2 border-blue-600 pb-1">
                {t('template1.profile')}
              </h3>
              <p className="text-[16px] text-slate-600 leading-relaxed text-justify">{summary}</p>
            </section>

            <section>
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 border-b-2 border-blue-600 pb-1">
                {t('template1.experience_work')}
              </h3>
              <div className="space-y-5">
                {experienceList.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-800">{exp.job_title || exp.jobTitle}</h4>
                      <span className="text-[10px] text-blue-600 font-bold whitespace-nowrap ml-2">
                        {formatDate(exp.start_date || exp.startDate)} - {exp.end_date || exp.endDate || t('template1.present')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-1">{exp.company}</p>
                    <p className="text-[14px] text-slate-600 leading-snug whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-md font-bold text-blue-600 uppercase tracking-wider mb-3 border-b-2 border-blue-600 pb-1">
                {t('template1.education')}
              </h3>
              <div className="space-y-4">
                {educationList.map((edu, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-bold text-slate-800">{edu.degree}</h4>
                    <p className="text-[12px] text-slate-500">
                      {edu.institution} • {formatDate(edu.start_date || edu.startDate)} - {edu.end_date || edu.endDate || t('template1.present')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate1;