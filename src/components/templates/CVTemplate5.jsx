import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate5({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // --- LOGIQUE DE ZOOM ADAPTATIF ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Largeur A4 en pixels
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
          className="cv-container w-[21cm] h-[29.7cm] bg-white shadow-2xl font-sans shrink-0 print:shadow-none overflow-hidden flex flex-col"
        >
          {/* DARK HEADER */}
          <div className="bg-slate-900 text-white p-8 shrink-0" style={{ WebkitPrintColorAdjust: 'exact' }}>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-5xl font-bold">
                  {firstName} <span className="text-orange-400">{lastName}</span>
                </h1>
                <p className="text-xl text-slate-300 mt-2 font-light tracking-wide">{jobTitle}</p>
              </div>
              <div className="w-28 h-28 rounded-full border-4 border-orange-400 overflow-hidden bg-slate-800 shadow-xl shrink-0">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl flex items-center justify-center h-full">👤</span>
                )}
              </div>
            </div>
            <div className="flex gap-6 mt-6 text-[11px] border-t border-slate-700 pt-4 uppercase tracking-widest opacity-80">
              <span>📧 {email}</span>
              <span>📱 {phone}</span>
              <span>📍 {address}</span>
            </div>
          </div>

          <div className="p-10 flex-grow overflow-hidden">
            {/* COLORED SUMMARY BOX */}
            <div className="mb-8 p-5 bg-orange-50 border-l-4 border-orange-400 rounded-r shadow-sm">
              <p className="text-sm text-slate-700 leading-relaxed italic line-clamp-3">
                {summary}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10 h-full">
              {/* MAIN COLUMN (TIMELINE) */}
              <div className="col-span-2 space-y-8">
                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <span className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                      💼
                    </span>
                    {t('template5.experience')}
                  </h3>
                  <div className="space-y-6 relative before:content-[''] before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-orange-100">
                    {experienceList.slice(0, 3).map((exp, i) => (
                      <div key={i} className="relative pl-14">
                        <div className="absolute left-[14px] top-1.5 w-3 h-3 rounded-full bg-orange-400 border-2 border-white shadow-sm ring-4 ring-orange-50"></div>
                        <div className="bg-slate-50 rounded-xl p-4 shadow-sm border border-slate-100">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                              {exp.job_title || exp.jobTitle}
                            </h4>
                            <span className="text-[9px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold whitespace-nowrap">
                              {formatDate(exp.start_date || exp.startDate)} - {exp.end_date || exp.endDate || t('template5.present')}
                            </span>
                          </div>
                          <p className="text-[11px] text-orange-600 font-bold mb-2 uppercase tracking-wide">
                            {exp.company}
                          </p>
                          <p className="text-[11px] text-slate-600 leading-snug line-clamp-4">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <span className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                      🎓
                    </span>
                    {t('template5.education')}
                  </h3>
                  <div className="space-y-3 pl-2">
                    {educationList.slice(0, 2).map((edu, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex justify-between items-center">
                        <div className="leading-tight">
                          <h4 className="font-bold text-slate-900 text-[13px]">{edu.degree}</h4>
                          <p className="text-[11px] text-slate-500">{edu.institution}</p>
                        </div>
                        <p className="text-[9px] font-bold text-orange-400 bg-white px-2 py-0.5 rounded-full shadow-sm border border-orange-50 whitespace-nowrap ml-2">
                          {formatDate(edu.start_date || edu.startDate)} - {formatDate(edu.end_date || edu.endDate) || t('template5.present')}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SIDE COLUMN */}
              <div className="space-y-6">
                {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
                  <div className="bg-slate-900 rounded-2xl p-5 shadow-xl text-white" style={{ WebkitPrintColorAdjust: 'exact' }}>
                    <h3 className="text-sm font-black text-orange-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                      ⚡ {t('template5.skills')}
                    </h3>
                    <div className="space-y-2">
                      {skill?.technicalSkills?.slice(0, 6).map((s, i) => (
                        <div key={i} className="bg-slate-800 text-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-bold border-l-2 border-orange-400">
                          {s}
                        </div>
                      ))}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {skill?.softSkills?.slice(0, 4).map((s, i) => (
                          <span key={i} className="bg-slate-700 text-orange-200 px-2 py-1 rounded text-[9px] italic">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {languages.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-black text-orange-600 mb-3 uppercase tracking-widest flex items-center gap-2">
                      🌍 {t('template5.languages')}
                    </h3>
                    <div className="space-y-3">
                      {languages.map((lang, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-800">{lang.name}</span>
                          <span className="text-[10px] text-slate-500">{lang.level}</span>
                          <div className="w-full h-1 bg-slate-200 mt-1 rounded-full overflow-hidden">
                             <div className="h-full bg-orange-400 w-3/4" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hobbies && (
                  <div className="p-2">
                    <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest border-b-2 border-orange-400 pb-1 inline-block">
                      🎨 {t('template5.hobbies')}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {hobbies.split(",").slice(0, 4).map((hobby, i) => (
                        <span key={i} className="text-[10px] text-slate-600 font-medium bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">
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

export default CVTemplate5;