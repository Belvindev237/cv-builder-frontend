import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate7({ formData }) {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const cvWidth = 794; 
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
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4;
            margin: 0 !important;
          }
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-fixed-page {
            height: 29.7cm !important;
            width: 21cm !important;
            overflow: hidden !important;
            position: relative !important;
          }
        }
      `}} />

      <div 
        className="flex justify-center bg-zinc-100 py-4 md:py-10 print:p-0 print:bg-white"
        style={{ minHeight: "100vh" }}
      >
        <div 
          ref={containerRef}
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="shrink-0 shadow-2xl print:shadow-none print:scale-100 print:transform-none"
        >
          {/* STRUCTURE A4 STRICTE */}
          <div className="print-fixed-page w-[21cm] h-[29.7cm] bg-white flex flex-col relative overflow-hidden font-sans border border-zinc-200 print:border-none">
            
            {/* HEADER (280px fixe) */}
            <div className="grid grid-cols-5 h-[280px] shrink-0 border-b border-zinc-100">
              <div className="col-span-2 bg-indigo-900 p-8 text-white relative" style={{ WebkitPrintColorAdjust: 'exact' }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-800 rounded-bl-full opacity-40"></div>
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full border-2 border-indigo-400/50 overflow-hidden bg-zinc-800 mb-4 shadow-lg">
                    {formData?.photo ? (
                      <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl text-white/20">👤</div>
                    )}
                  </div>
                  <div className="space-y-2 text-[10.5px] font-light">
                    <p className="flex items-center gap-2"><span className="text-indigo-400 font-bold">@</span>{email}</p>
                    <p className="flex items-center gap-2"><span className="text-indigo-400 font-bold">#</span>{phone}</p>
                    <p className="flex items-start gap-2"><span className="text-indigo-400 font-bold">L</span>{address}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-3 bg-white p-10 flex flex-col justify-center">
                <h1 className="text-6xl font-black text-zinc-900 leading-[0.85] tracking-tighter uppercase">
                  {firstName}<br />
                  <span className="text-indigo-600" style={{ WebkitPrintColorAdjust: 'exact' }}>{lastName}</span>
                </h1>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-1.5 w-12 bg-indigo-600" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
                  <p className="text-lg text-zinc-500 font-light tracking-widest uppercase italic">{jobTitle}</p>
                </div>
              </div>
            </div>

            {/* CORPS DU CV (Utilise l'espace restant sans déborder) */}
            <div className="flex flex-1 p-10 gap-10 overflow-hidden bg-white">
              
              {/* COLONNE GAUCHE (80% du contenu) */}
              <div className="flex-1 space-y-6">
                {summary && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Profil</h2>
                    <p className="text-[12px] text-zinc-600 leading-snug text-justify border-l-2 border-indigo-100 pl-4 italic">
                      {summary}
                    </p>
                  </section>
                )}

                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4">Expériences</h2>
                  <div className="space-y-4">
                    {experienceList.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-[13px] font-black text-zinc-900 uppercase">{exp.job_title || exp.jobTitle}</h3>
                          <span className="text-[9px] font-bold text-zinc-400">{formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : "PRÉSENT"}</span>
                        </div>
                        <p className="text-[11px] font-bold text-indigo-600 mb-1 uppercase tracking-tight">{exp.company}</p>
                        <p className="text-[11px] text-zinc-500 leading-tight text-justify">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {hobbies && (
                  <section className="mt-auto">
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">Loisirs</h2>
                    <p className="text-[11px] text-zinc-500 italic border-t border-zinc-100 pt-2">{hobbies}</p>
                  </section>
                )}
              </div>

              {/* COLONNE DROITE (Infos complémentaires) */}
              <div className="w-[180px] shrink-0 space-y-6 border-l border-zinc-50 pl-6">
                {(skill.technicalSkills?.length > 0 || skill.softSkills?.length > 0) && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3 text-right">Compétences</h2>
                    <div className="flex flex-col gap-1.5">
                      {[...(skill.technicalSkills || []), ...(skill.softSkills || [])].map((s, i) => (
                        <div key={i} className="bg-zinc-50 text-zinc-800 px-2 py-1 text-[9px] font-black uppercase text-right rounded-sm border-r-4 border-indigo-600" style={{ WebkitPrintColorAdjust: 'exact' }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {educationList.length > 0 && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3 text-right">Formation</h2>
                    <div className="space-y-3">
                      {educationList.map((edu, i) => (
                        <div key={i} className="text-right">
                          <h3 className="text-[10px] font-black text-zinc-900 leading-tight uppercase">{edu.degree}</h3>
                          <p className="text-[9px] text-indigo-600 font-bold">{edu.institution}</p>
                          <p className="text-[8px] text-zinc-400">{formatDate(edu.start_date)} — {formatDate(edu.end_date)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {languages.length > 0 && (
                  <section>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-3 text-right">Langues</h2>
                    <div className="space-y-1.5">
                      {languages.map((lang, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px]">
                          <span className="text-indigo-600 font-bold uppercase text-[8px]">{lang.level}</span>
                          <span className="font-black text-zinc-900 uppercase text-[10px]">{lang.name}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* FOOTER FIXE (Évite de couler sur la page 2) */}
            <div className="h-3 bg-indigo-900 shrink-0 mt-auto" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate7;