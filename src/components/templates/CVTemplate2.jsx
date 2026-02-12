import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate2({ formData }) {
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

  return (
    <>
      {/* --- STYLE POUR L'IMPRESSION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
          .cv-container { box-shadow: none !important; margin: 0 !important; transform: none !important; width: 21cm !important; height: 29.7cm !important; padding: 1.5cm !important; }
        }
      `}} />

      <div className="flex justify-center bg-zinc-100 py-10 print:p-0 print:bg-white overflow-hidden min-h-screen">
        <div
          ref={containerRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="cv-container w-[21cm] min-h-[29.7cm] bg-white shadow-2xl p-12 font-serif text-slate-900 shrink-0 print:shadow-none overflow-hidden"
        >
          {/* HEADER */}
          <div className="text-center border-b-4 border-slate-900 pb-6 mb-8">
            <h1 className="text-5xl font-light tracking-tight mb-2">
              {firstName} <span className="font-bold">{lastName}</span>
            </h1>
            <p className="text-lg text-slate-600 tracking-widest uppercase">
              {jobTitle}
            </p>
            <div className="flex justify-center gap-4 mt-4 text-[10px] text-slate-500 uppercase tracking-widest">
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
              <span>•</span>
              <span>{address}</span>
            </div>
          </div>

          {/* SUMMARY */}
          {summary && (
            <section className="mb-8">
              <p className="text-[16px] leading-relaxed text-slate-700 text-center italic border-l-4 border-slate-900 pl-4">
                {summary}
              </p>
            </section>
          )}

          <div className="grid grid-cols-3 gap-8">
            {/* MAIN COLUMN (EXPERIENCE & EDUCATION) */}
            <div className="col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-slate-300 pb-2">
                  {t('template2.experience')}
                </h3>
                <div className="space-y-6">
                  {experienceList.map((exp, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-sm">{exp.job_title || exp.jobTitle || "Aiuto Cuoco"}</h4>
                      <p className="text-[12px] text-slate-600 italic mb-1">
                        {exp.company} | {formatDate(exp.start_date || exp.startDate)} -{" "}
                        {exp.end_date || exp.endDate || t('template2.present')}
                      </p>
                      <p className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-line line-clamp-6">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-slate-300 pb-2">
                  {t('template2.education')}
                </h3>
                <div className="space-y-4">
                  {educationList.map((edu, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-sm">{edu.degree}</h4>
                      <p className="text-xs text-slate-600 italic">
                        {edu.institution} | {formatDate(edu.start_date || edu.startDate)} -{" "}
                        {edu.end_date || edu.endDate || t('template2.present')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* SIDE COLUMN (SKILLS, LANGUAGES, HOBBIES) */}
            <div className="space-y-6">
              {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-slate-300 pb-2">
                    {t('template2.skills')}
                  </h3>
                  <ul className="space-y-1 text-[12px]">
                    {skill?.technicalSkills?.map((s, i) => (
                      <li key={i} className="before:content-['▪'] before:mr-2">{s}</li>
                    ))}
                    {skill?.softSkills?.map((s, i) => (
                      <li key={i} className="before:content-['○'] before:mr-2 italic">{s}</li>
                    ))}
                  </ul>
                </section>
              )}

              {languages.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-slate-300 pb-2">
                    {t('template2.languages')}
                  </h3>
                  <ul className="space-y-1 text-[10px]">
                    {languages.map((lang, i) => (
                      <li key={i}>
                        <strong>{lang.name}</strong>: {lang.level}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hobbies && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b border-slate-300 pb-2">
                    {t('template2.hobbies')}
                  </h3>
                  <p className="text-[10px] leading-relaxed italic text-slate-600 line-clamp-4">{hobbies}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate2;