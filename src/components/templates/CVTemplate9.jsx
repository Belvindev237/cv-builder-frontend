import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate9({ formData }) {
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

  // Fusion des compétences pour la barre latérale
  const allSkills = [...(skill.technicalSkills || []), ...(skill.softSkills || [])];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
      }).format(date).toUpperCase();
    } catch (e) { return dateString; }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-fixed-page { height: 29.7cm !important; width: 21cm !important; overflow: hidden !important; }
        }
      `}} />

      <div className="flex justify-center bg-zinc-100 py-4 md:py-10 overflow-hidden print:p-0" style={{ minHeight: "100vh" }}>
        <div ref={containerRef} style={{ transform: `scale(${scale})`, transformOrigin: "top center", width: "21cm" }} className="shrink-0 shadow-2xl print:shadow-none print:scale-100 print:transform-none">
          
          <div className="print-fixed-page w-[21cm] h-[29.7cm] bg-white flex font-sans text-[#2D3E6E]">
            
            {/* --- COLONNE GAUCHE (BLEU MARINE) --- */}
            <div className="w-[35%] bg-[#32406D] text-white flex flex-col print:bg-[#32406D]" style={{ WebkitPrintColorAdjust: 'exact' }}>
              
              <div className="p-8 pt-12 flex justify-center">
                <div className="w-44 h-52 bg-white p-1 shadow-lg">
                  {formData?.photo ? (
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-4xl text-zinc-400">👤</div>
                  )}
                </div>
              </div>

              <div className="flex-1 px-8 space-y-10">
                {/* INFORMATIONS */}
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">{t('template9.informations')}</h3>
                  <div className="text-[11px] space-y-2 opacity-90 leading-relaxed">
                    <p>{phone}</p>
                    <p>{email}</p>
                    <p className="whitespace-pre-line">{address}</p>
                  </div>
                </section>

                {/* COMPÉTENCES (FUSIONNÉES) */}
                {allSkills.length > 0 && (
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">{t('template9.competences')}</h3>
                    <ul className="text-[12px] space-y-2 opacity-90">
                      {allSkills.map((s, i) => (
                        <li key={i} className="leading-tight flex items-start gap-2">
                           {s}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* LANGUES */}
                {languages.length > 0 && (
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">{t('template9.langues')}</h3>
                    <ul className="text-[12px] space-y-2 opacity-90">
                      {languages.map((l, i) => <li key={i}>{l.name} ({l.level})</li>)}
                    </ul>
                  </section>
                )}

                {/* INTÉRÊTS */}
                {hobbies && (
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">{t('template9.interets')}</h3>
                    <ul className="text-[12px] space-y-2 opacity-90">
                      {hobbies.split(',').map((h, i) => <li key={i}>{h.trim()}</li>)}
                    </ul>
                  </section>
                )}
              </div>
            </div>

            {/* --- COLONNE DROITE (GRIS CLAIR) --- */}
            <div className="w-[65%] bg-[#F0F2F9] flex flex-col print:bg-[#F0F2F9]" style={{ WebkitPrintColorAdjust: 'exact' }}>
              
              <div className="p-12 pb-8">
                <h1 className="text-5xl font-bold text-[#32406D] mb-2 tracking-tight">
                  {firstName} {lastName}
                </h1>
                <h2 className="text-xl font-medium text-[#32406D] uppercase tracking-widest mb-6">
                  {jobTitle}
                </h2>
                <p className="text-[14px] leading-relaxed text-zinc-700 text-justify">
                  {summary}
                </p>
              </div>

              <div className="px-12 space-y-6 flex-1">
                
                <section>
                  <div className="bg-[#32406D] text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-6" style={{ WebkitPrintColorAdjust: 'exact' }}>
                    {t('template9.experiencesTitle')}
                  </div>
                  <div className="space-y-6 px-2">
                    {experienceList.map((exp, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#32406D]" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
                        <h4 className="text-[13px] font-bold text-[#32406D]">
                          {exp.job_title || exp.jobTitle ||"AIUTO CUOCO/LAVAPIATTI"} - {exp.company}
                        </h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase mb-2">
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : t('template9.current')}
                        </p>
                        <p className="text-[14px] text-zinc-600 leading-snug whitespace-pre-line">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="bg-[#32406D] text-white px-4 py-1 text-sm font-bold uppercase tracking-widest mb-6" style={{ WebkitPrintColorAdjust: 'exact' }}>
                    {t('template9.formationsTitle')}
                  </div>
                  <div className="space-y-6 px-2">
                    {educationList.map((edu, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#32406D]" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
                        <h4 className="text-[13px] font-bold text-[#32406D]">{edu.degree}</h4>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase">
                           {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                        </p>
                        <p className="text-[12px] text-zinc-600 italic">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="h-10 shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate9;