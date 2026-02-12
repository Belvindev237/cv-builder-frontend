import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function CVTemplate10({ formData }) {
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
    firstName = "",
    lastName = "",
    jobTitle = "",
    email = "",
    phone = "",
    address = "",
    summary = "",
    hobbies = "",
    experienceList = [],
    educationList = [],
    skill = { technicalSkills: [], softSkills: [] },
    languages = [],
  } = formData || {};

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

      <div className="flex justify-center bg-zinc-200 py-10 overflow-hidden print:p-0" style={{ minHeight: "100vh" }}>
        <div ref={containerRef} style={{ transform: `scale(${scale})`, transformOrigin: "top center", width: "21cm" }} className="shrink-0 shadow-2xl print:shadow-none print:scale-100 print:transform-none">
          
          <div className="print-fixed-page w-[21cm] h-[29.7cm] bg-white flex flex-col font-sans text-[#333]">
            
            {/* --- HEADER OLIVE --- */}
            <div className="h-[220px] bg-[#3D3D1D] relative flex items-center print:bg-[#3D3D1D]" style={{ WebkitPrintColorAdjust: 'exact' }}>
              <div className="ml-[300px] pr-12 text-white">
                <h1 className="text-4xl font-medium tracking-[0.1em] uppercase mb-2">
                  {firstName} {lastName}
                </h1>
                <h2 className="text-xl tracking-[0.2em] uppercase opacity-90 mb-4">
                  {jobTitle}
                </h2>
                <p className="text-[14px] leading-relaxed opacity-80 text-justify max-w-[500px]">
                  {summary}
                </p>
              </div>

              {/* Photo Ronde */}
              <div className="absolute left-[50px] top-[40px] w-[210px] h-[210px] rounded-full border-[6px] border-white overflow-hidden bg-zinc-300 shadow-lg z-20">
                {formData?.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl text-zinc-400 font-bold">AS</div>
                )}
              </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="flex flex-1 pt-12">
              
              {/* Colonne Gauche (Beige) */}
              <div className="w-[33%] bg-[#EFE9DB] px-8 pt-16 flex flex-col gap-10 print:bg-[#EFE9DB]" style={{ WebkitPrintColorAdjust: 'exact' }}>
                
                {/* CONTACT */}
                <section>
                  <div className="border-t border-b border-zinc-400 py-1 mb-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest">{t('template10.contact')}</h3>
                  </div>
                  <div className="text-[12px] space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-4">📞</span> <p>{phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-4">✉️</span> <p className="break-all">{email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-4">🏠</span> <p>{address}</p>
                    </div>
                  </div>
                </section>

                {/* COMPÉTENCES */}
                <section>
                  <div className="border-t border-b border-zinc-400 py-1 mb-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest">{t('template10.skills')}</h3>
                  </div>
                  <ul className="text-[13px] space-y-2 list-disc ml-4">
                    {allSkills.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>

                {/* CENTRES D'INTÉRÊT */}
                <section>
                  <div className="border-t border-b border-zinc-400 py-1 mb-4 text-center">
                    <h3 className="text-sm font-bold uppercase tracking-widest">{t('template10.interests')}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                    {hobbies?.split(',').map((h, i) => (
                      <div key={i} className="flex text-[12px] items-center gap-2">
                        <span className="text-[8px]">●</span> {h.trim()}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Colonne Droite (Contenu) */}
              <div className="w-[67%] px-10 pt-4 flex flex-col gap-8">
                
                {/* EXPÉRIENCE PROFESSIONNELLE */}
                <section>
                  <div className="border border-zinc-800 py-1 px-4 mb-6 inline-block w-full">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('template10.experience')}</h3>
                  </div>
                  <div className="space-y-6">
                    {experienceList.map((exp, i) => (
                      <div key={i}>
                        <h4 className="text-[13px] font-bold uppercase">{exp.job_title || exp.jobTitle || "Aiuto"} </h4>
                        <p className="text-[10px] italic text-zinc-500 mb-2">
                          {exp.company} / {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : t('template10.current')}
                        </p>
                        <ul className="text-[14px] text-zinc-700 space-y-1 list-disc ml-4">
                          {exp.description?.split('\n').map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FORMATIONS */}
                <section>
                  <div className="border border-zinc-800 py-1 px-4 mb-6 inline-block w-full">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('template10.education')}</h3>
                  </div>
                  <div className="space-y-4">
                    {educationList.map((edu, i) => (
                      <div key={i}>
                        <h4 className="text-[12px] font-bold">{edu.degree} </h4>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                          {edu.institution} / {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* LANGUES */}
                <section>
                  <div className="border border-zinc-800 py-1 px-4 mb-4 inline-block w-full">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{t('template10.languages')}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {languages.map((l, i) => (
                      <p key={i} className="text-[11px] uppercase">
                        <span className="font-bold">{l.name}</span> / {l.level}
                      </p>
                    ))}
                  </div>
                </section>

              </div>
            </div>

            {/* Pied de page décoratif beige */}
            <div className="h-6 bg-[#EFE9DB] print:bg-[#EFE9DB]" style={{ WebkitPrintColorAdjust: 'exact' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVTemplate10;