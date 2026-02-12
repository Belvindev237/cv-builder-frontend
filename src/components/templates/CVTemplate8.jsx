import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate8({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // --- RESPONSIVITÉ DYNAMIQUE ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; // Largeur A4 standard en pixels
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
    } catch (e) { return dateString; }
  };

  return (
    <>
      {/* --- CORRECTIFS IMPRESSION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4;
            margin: 0 !important;
          }
          html, body {
            height: 29.7cm !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .cv-container {
            box-shadow: none !important;
            transform: none !important;
            margin: 0 !important;
          }
        }
      `}} />

      <div 
        className="flex justify-center bg-slate-100 py-4 md:py-10 overflow-hidden print:p-0 print:bg-white"
        style={{ minHeight: "100vh" }}
      >
        <div 
          ref={containerRef}
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: "top center",
            width: "21cm" 
          }}
          className="cv-container shrink-0 shadow-2xl print:shadow-none print:scale-100 print:transform-none"
        >
          {/* STRUCTURE A4 STRICTE */}
          <div className="w-[21cm] h-[29.7cm] bg-white flex flex-col relative overflow-hidden font-serif print:border-none">
            
            {/* HEADER - Hauteur fixe pour éviter les décalages */}
            <div className="relative h-64 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 shrink-0" style={{ WebkitPrintColorAdjust: 'exact' }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>
              
              <div className="relative z-10 h-full flex items-end p-12">
                <div className="flex-1">
                  <h1 className="text-6xl font-black text-white leading-none tracking-tighter uppercase mb-2">
                    {firstName} <span className="opacity-80">{lastName}</span>
                  </h1>
                  <div className="h-1 w-20 bg-white mb-4"></div>
                  <p className="text-white/90 text-xl font-light italic tracking-widest uppercase font-sans">
                    {jobTitle}
                  </p>
                </div>
                
                <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white transform rotate-3 translate-y-16 shrink-0">
                  {formData?.photo ? (
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-6xl bg-rose-50 text-rose-200">👤</div>
                  )}
                </div>
              </div>
            </div>

            {/* CONTACT BAR */}
            <div className="mt-8 px-12 flex justify-start gap-8 text-[11px] text-slate-500 font-sans font-bold uppercase tracking-widest border-b border-rose-100 pb-6 shrink-0">
              <span><span className="text-rose-500 mr-2 font-serif">@</span>{email}</span>
              <span><span className="text-rose-500 mr-2 font-serif">#</span>{phone}</span>
              <span><span className="text-rose-500 mr-2 font-serif">L</span>{address}</span>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 px-12 py-8 flex gap-10 overflow-hidden bg-white">
              
              {/* LEFT COLUMN */}
              <div className="flex-1 space-y-8 overflow-hidden">
                {summary && (
                  <section>
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 font-sans">{t("template8.profil")} </h2>
                      <div className="flex-1 h-px bg-rose-100"></div>
                    </div>
                    <p className="text-[12px] text-slate-700 leading-snug italic text-justify pl-4 border-l-2 border-rose-200">
                      "{summary}"
                    </p>
                  </section>
                )}

                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 font-sans">{t("template8.journey")} </h2>
                    <div className="flex-1 h-px bg-rose-100"></div>
                  </div>
                  <div className="space-y-6">
                    {experienceList.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-base font-bold text-slate-900 leading-tight">{exp.job_title || exp.jobTitle}</h3>
                          <span className="text-[9px] font-bold text-rose-400 font-sans uppercase whitespace-nowrap ml-2">
                            {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : "PRÉSENT"}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider font-sans">{exp.company}</p>
                        <p className="text-[11px] text-slate-600 leading-tight text-justify line-clamp-6">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {hobbies && (
                  <section>
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 font-sans">Passions</h2>
                      <div className="flex-1 h-px bg-rose-100"></div>
                    </div>
                    <p className="text-[11px] text-slate-600 italic leading-snug pl-4">
                      {hobbies}
                    </p>
                  </section>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-[180px] shrink-0 space-y-8">
                {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 font-sans mb-4">{t("template8.expertise")} </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {[...(skill.technicalSkills || []), ...(skill.softSkills || [])].map((s, i) => (
                        <span key={i} className="bg-rose-50 text-rose-600 px-2 py-1 text-[9px] font-bold rounded border border-rose-100 font-sans uppercase" style={{ WebkitPrintColorAdjust: 'exact' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {educationList.length > 0 && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 font-sans mb-4">Formation</h2>
                    <div className="space-y-4">
                      {educationList.map((edu, i) => (
                        <div key={i}>
                          <h3 className="text-[10px] font-bold text-slate-900 uppercase font-sans leading-tight">{edu.degree}</h3>
                          <p className="text-[9px] text-rose-400 italic mb-1">{edu.institution}</p>
                          <p className="text-[8px] text-slate-400 font-sans font-bold uppercase">{formatDate(edu.start_date)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {languages.length > 0 && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 font-sans mb-4">Langues</h2>
                    <div className="space-y-3">
                      {languages.map((lang, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] font-sans font-bold uppercase">
                            <span>{lang.name}</span>
                            <span className="text-rose-400">{lang.level}</span>
                          </div>
                          <div className="h-1 bg-rose-50 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-400" style={{ width: '80%', WebkitPrintColorAdjust: 'exact' }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* FOOTER FIXE */}
            <div className="h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 shrink-0 mt-auto" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate8;