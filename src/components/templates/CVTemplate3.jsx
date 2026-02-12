import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate3({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // --- LOGIQUE DE ZOOM ADAPTATIF ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Largeur A4 (21cm) en pixels
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
          .cv-container { box-shadow: none !important; margin: 0 !important; transform: none !important; width: 21cm !important; height: 29.7cm !important; }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="flex justify-center bg-zinc-200 py-10 print:p-0 print:bg-white overflow-hidden min-h-screen">
        <div
          ref={containerRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="cv-container w-[21cm] h-[29.7cm] bg-slate-50 shadow-2xl font-sans shrink-0 print:shadow-none overflow-hidden relative"
        >
          {/* HEADER */}
          <div className="bg-teal-600 text-white p-8 print:bg-teal-600" style={{ WebkitPrintColorAdjust: 'exact' }}>
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-emerald-700 flex-shrink-0 shadow-lg">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl flex items-center justify-center h-full">👤</span>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{firstName} {lastName}</h1>
                <p className="text-xl text-emerald-100 mt-1 font-light">{jobTitle}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-xs opacity-90">
                  <span>📧 {email}</span>
                  <span>📱 {phone}</span>
                  <span>📍 {address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* PROFILE CARD */}
            <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-emerald-500">
              <h3 className="text-sm font-black text-emerald-600 mb-2 flex items-center gap-2 uppercase tracking-widest">
                <span className="text-lg">💼</span> {t('template3.about')}
              </h3>
              <p className="text-[16px] text-slate-700 leading-relaxed italic line-clamp-3">{summary}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* MAIN COLUMN */}
              <div className="col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-black text-emerald-600 mb-5 flex items-center gap-2 uppercase tracking-widest">
                    <span className="text-lg">🚀</span> {t('template3.experience')}
                  </h3>
                  <div className="space-y-6">
                    {experienceList.slice(0, 3).map((exp, i) => (
                      <div key={i} className="border-l-2 border-emerald-100 pl-4 relative">
                        <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[5px] top-1"></div>
                        <h4 className="font-bold text-slate-800 text-sm">{exp.job_title || exp.jobTitle}</h4>
                        <p className="text-[11px] text-emerald-600 font-bold uppercase">{exp.company}</p>
                        <p className="text-[10px] text-slate-400 mb-2 font-medium">
                          {formatDate(exp.start_date || exp.startDate)} — {exp.end_date || exp.endDate || t('template3.present')}
                        </p>
                        <p className="text-[14px] text-slate-600 leading-snug whitespace-pre-line line-clamp-4">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-black text-emerald-600 mb-5 flex items-center gap-2 uppercase tracking-widest">
                    <span className="text-lg">🎓</span> {t('template3.education')}
                  </h3>
                  <div className="space-y-4">
                    {educationList.slice(0, 2).map((edu, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-slate-800 text-sm">{edu.degree}</h4>
                        <p className="text-[11px] text-slate-600">{edu.institution}</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {formatDate(edu.start_date || edu.startDate)} — {formatDate(edu.end_date || edu.endDate) || t('template3.present')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIDE COLUMN */}
              <div className="space-y-6">
                {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
                  <div className="bg-white rounded-lg shadow-sm p-5">
                    <h3 className="text-[11px] font-black text-emerald-600 mb-4 uppercase tracking-tighter flex items-center gap-1">
                      ⚡ {t('template3.skills')}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skill?.technicalSkills?.slice(0, 8).map((s, i) => (
                        <span key={i} className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">
                          {s}
                        </span>
                      ))}
                      {skill?.softSkills?.slice(0, 5).map((s, i) => (
                        <span key={i} className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-[12px] italic border border-teal-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {languages.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-5">
                    <h3 className="text-[11px] font-black text-emerald-600 mb-4 uppercase tracking-tighter flex items-center gap-1">
                      🌍 {t('template3.languages')}
                    </h3>
                    <div className="space-y-2">
                      {languages.map((lang, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-slate-700">{lang.name}</span>
                          <span className="text-emerald-600 font-medium">{lang.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hobbies && (
                  <div className="bg-white rounded-lg shadow-sm p-5">
                    <h3 className="text-[11px] font-black text-emerald-600 mb-4 uppercase tracking-tighter flex items-center gap-1">
                      🎨 {t('template3.hobbies')}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {hobbies.split(",").slice(0, 5).map((hobby, i) => (
                        <span key={i} className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-100">
                          {hobby.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate3;