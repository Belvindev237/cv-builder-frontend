// On récupère formData en tant que Prop
import { create_cv } from "../services/api";

export default function CVPreview({ formData }) {
  // On extrait les données ou on utilise des valeurs vides/par défaut
  // AJOUT de "hobbies" dans le destructuring
  const {
    firstName = "Prénom",
    lastName = "Nom",
    jobTitle = "Intitulé du poste",
    email = "email@exemple.com",
    phone = "000 000 000",
    address = "Adresse complète",
    website = "",
    summary = "Votre résumé professionnel s'affichera ici...",
    hobbies = "",
    experienceList = [],
    educationList = [],
    skill = {
      technicalSkills: [],
      softSkills: [],
    },
    languages = [],
  } = formData || {};
  console.log(formData);
  return (
    <div className="w-full max-w-[21cm] mx-auto bg-white shadow-2xl min-h-[29.7] flex flex-col font-sans text-slate-800 scale-90 origin-top">
      {/* --- HEADER --- */}
      <div className="bg-slate-900 text-white p-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-light tracking-tight">
            {firstName}{" "}
            <span className="font-bold text-blue-400">{lastName}</span>
          </h1>
          <p className="text-xl text-slate-300 mt-1 font-medium uppercase tracking-widest">
            {jobTitle}
          </p>
        </div>
        <div className="w-24 h-24 rounded-full border-2 border-blue-400 bg-slate-800 flex items-center justify-center overflow-hidden">
          {formData?.photo ? (
            <img
              src={formData.photo}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-500 text-4xl">👤</span>
          )}
        </div>
      </div>

      <div className="flex flex-1">
        {/* --- COLONNE GAUCHE --- */}
        <div className="w-[35%] bg-slate-50 p-8 border-r border-slate-100 flex flex-col gap-8 text-left">
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-[11px]">
              <p className="flex items-center gap-2">✉️ {email}</p>
              <p className="flex items-center gap-2">📞 {phone}</p>
              <p className="flex items-center gap-2">📍 {address}</p>
              {website && (
                <p className="flex items-center gap-2 text-blue-500 underline truncate">
                  {website}
                </p>
              )}
            </div>
          </section>

          {(skill.technicalSkills?.length > 0 ||
            skill.softSkills?.length > 0) && (
            <section className="mt-6">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                Compétences
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {skill.technicalSkills.map((s, i) => (
                  <span
                    key={`tech-${i}`}
                    className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[10px] font-bold uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {skill?.softSkills?.map((s, i) => (
                  <span
                    key={`soft-${i}`}
                    className="bg-blue-50 text-slate-600 px-2 py-1 rounded text-[10px] font-medium italic"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                Langues
              </h3>
              <div className="space-y-2">
                {languages.map((lang, i) => (
                  <p key={i} className="text-[11px] font-medium text-slate-700">
                    • {lang.name}
                    <span className="text-slate-400 ml-1">({lang.level})</span>
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* --- NOUVELLE SECTION : CENTRES D'INTÉRÊT --- */}
          {hobbies && (
            <section>
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
                Centres d'intérêt
              </h3>
              <div className="flex flex-wrap gap-2">
                {hobbies.split(",").map((hobby, i) => (
                  <span
                    key={`hobby-${i}`}
                    className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-[10px] font-medium"
                  >
                    {hobby.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* --- COLONNE DROITE --- */}
        <div className="flex-1 p-10 flex flex-col gap-10 text-left">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 border-b pb-2">
              Profil
            </h3>
            <p className="text-[12px] leading-relaxed text-slate-600 text-justify italic ">
              {summary}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b pb-2">
              Expériences
            </h3>
            <div className="space-y-8">
              {experienceList.length > 0 ? (
                experienceList.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l border-slate-200"
                  >
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[13px] text-slate-800 uppercase">
                        {exp.job_title || exp.jobTitle}
                      </h4>
                      <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase">
                        {exp.start_date || exp.startDate} -{" "}
                        {exp.end_date || exp.endDate || "Présent"}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-500 mb-2">
                      {exp.company}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line text-left">
                      {exp.job_description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400 italic">
                  Aucune expérience ajoutée
                </p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b pb-2">
              Formation
            </h3>
            <div className="space-y-4">
              {educationList.length > 0 ? (
                educationList.map((edu, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-[13px] text-slate-800">
                      {edu.degree}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {edu.institution} —{" "}
                      <span className="italic">
                        {edu.start_date || edu.startDate} -{" "}
                        {edu.end_date || edu.endDate || "Present"}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400 italic">
                  Aucune formation ajoutée
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      <footer className="h-2 bg-blue-500 w-full" />
    </div>
  );
}
