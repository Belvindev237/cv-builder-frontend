import Stepper from "../components/SidebarProgess";
import { useState, useEffect, useRef } from "react"; // Ajout de useRef
import { useParams, useNavigate } from "react-router-dom";

import PersonInfo from "../components/Form/PersonInfo";
import Experience from "../components/Form/Experience";
import Education from "../components/Form/Education";
import Competence from "../components/Form/Competence";
import Langue from "../components/Form/Langue";
import ResumePro from "../components/Form/Resume";
import { create_cv, updateCv, cvById } from "../services/api";

import CVTemplate1 from "../components/templates/CVTemplate1";
import CVTemplate2 from "../components/templates/CVTemplate2";
import CVTemplate3 from "../components/templates/CVTemplate3";
import CVTemplate4 from "../components/templates/CVTemplate4";
import CVTemplate5 from "../components/templates/CVTemplate5";
import CVTemplate6 from "../components/templates/CVTemplate6";
import CVTemplate7 from "../components/templates/CVTemplate7";
import CVTemplate8 from "../components/templates/CVTemplate8";
import CVTemplate9 from '../components/templates/CVTemplate9';
import CVTemplate10 from "../components/templates/CVTemplate10";

/**
 * COMPOSANT DE SCALE AUTOMATIQUE
 * Il adapte le CV A4 (794px) à la largeur de la colonne de preview
 */
const PreviewScaler = ({ children }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const parentWidth = entry.contentRect.width;
        // On laisse une marge de 32px (p-4 de chaque côté)
        const availableWidth = parentWidth - 64; 
        const cvBaseWidth = 794;
        setScale(availableWidth / cvBaseWidth);
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex justify-center bg-gray-200 p-8 overflow-y-auto shadow-inner">
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: "top center",
          width: "794px",
          minWidth: "794px", // Empêche le template de se déformer
          height: "1123px",
        }}
        className="bg-white shadow-2xl transition-transform duration-200 ease-out"
      >
        {children}
      </div>
    </div>
  );
};

export default function Builder() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const { template_id, id } = useParams();
  
  const templates = [
    { id: 1, name: "Moderne Bleu", component: CVTemplate1 },
    { id: 2, name: "Minimaliste", component: CVTemplate2 },
    { id: 3, name: "Créatif Vert", component: CVTemplate3 },
    { id: 4, name: "Corporate", component: CVTemplate4 },
    { id: 5, name: "Timeline Orange", component: CVTemplate5 },
    { id: 6, name: "Minimaliste Géométrique ", component: CVTemplate6 },
    { id: 7, name: "Minimaliste Géométrique ", component: CVTemplate7 },
    { id: 8, name: "Minimaliste Géométrique ", component: CVTemplate8 },
    { id: 9, name: "Minimaliste Géométrique ", component: CVTemplate9 },
    { id: 10, name: "Minimaliste Géométrique ",component: CVTemplate10},
  ];

  const isEditMode = !!id;
  const isCreateMode = !!template_id;
  
  const SelectedComponent = templates.find((t) => t.id === selectedTemplate)?.component;

  //const [cvData, setCvData] = useState(null);
  const steps = ["Infos Perso", "Expérience", "Compétences", "Formations", "Langues", "Resume"];
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    experienceList: [],
    educationList: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
  });

  const onNext = () => { if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1); };
  const onPrev = () => { if (currentStep > 0) setCurrentStep((prev) => prev - 1); };

  // --- USE EFFECTS DE CHARGEMENT (RESTO ET API) ---
  useEffect(() => {
    const savedForm = localStorage.getItem("pending_cv_form");
    const step = localStorage.getItem("step");
    if (savedForm) {
      try {
        setFormData(JSON.parse(savedForm));
        if (step) setCurrentStep(parseInt(step));
        localStorage.removeItem("pending_cv_form");
        localStorage.removeItem("step");
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const fetchCV = async () => {
        try {
          const data = await cvById(id);
          setFormData(data);
          setSelectedTemplate(data.template_id ? parseInt(data.template_id) : 1);
        } catch (error) { console.error("Erreur chargement", error); }
      };
      fetchCV();
    } else if (isCreateMode) {
      const tIdInt = parseInt(template_id, 10);
      setSelectedTemplate(tIdInt);
      setFormData((prev) => ({ ...prev, template_id: tIdInt }));
    }
  }, [template_id, id, isEditMode, isCreateMode]);

  // --- LOGIQUE DE SAUVEGARDE ---
  const handleSave = async () => {
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      template_id: formData.template_id,
      job_title: formData.jobTitle,
      address: formData.address,
      code_postal: formData.postalCode,
      city: formData.city,
      phone_number: formData.phone,
      email: formData.email,
      site: formData.website || "",
      summary: formData.summary,
      hobbies: formData.hobbies,
      experiences: (formData.experienceList || []).map((exp) => ({
        job_title: exp.jobTitle,
        company: exp.company,
        start_date: exp.startDate, end_date: exp.endDate,
        description: exp.description,
      })),
      educations: (formData.educationList || []).map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        start_date: edu.startDate || "", end_date: edu.endDate || "",
        domain: edu.fieldOfStudy || "",
      })),
      skill: {
        technical_skills: formData.skill?.technicalSkills || [],
        soft_skills: formData.skill?.softSkills || [],
      },
      languages: formData.languages || [],
    };

    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      localStorage.setItem("pendingCv", JSON.stringify(payload));
      localStorage.setItem("step", currentStep.toString());
      localStorage.setItem("pending_cv_form", JSON.stringify(formData));
      navigate("/auth");
      return;
    }

    try {
      if (id) {
        await updateCv(id, payload);
        navigate(`/visualisation/${id}`);
      } else {
        const result = await create_cv(payload);
        navigate(`/visualisation/${result.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonInfo formData={formData} setFormData={setFormData} Next={onNext} />;
      case 1: return <Experience formData={formData} setFormData={setFormData} Prev={onPrev} Next={onNext} />;
      case 2: return <Education formData={formData} setFormData={setFormData} Prev={onPrev} Next={onNext} />;
      case 3: return <Competence formData={formData} setFormData={setFormData} Prev={onPrev} Next={onNext} />;
      case 4: return <Langue formData={formData} setFormData={setFormData} Prev={onPrev} Next={onNext} />;
      case 5: return <ResumePro formData={formData} setFormData={setFormData} Prev={onPrev} Next={handleSave} />;
      default: return <div>Étape non implémentée</div>;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* SIDEBAR STEPPER (Fixe à gauche) */}
      <div className="w-full lg:w-80 bg-gray-50 border-b lg:border-r flex-shrink-0">
        <Stepper currentStep={currentStep} />
      </div>

      {/* ZONE FORMULAIRE (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10">
        <div className="max-w-2xl mx-auto">
          {renderStep()}
        </div>
      </div>

      {/* ZONE PREVIEW (Adaptative) */}
      <div className="hidden xl:block w-[500px] 2xl:w-[650px] border-l flex-shrink-0">
        <PreviewScaler>
          {SelectedComponent ? (
            <SelectedComponent formData={formData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Sélectionnez un modèle
            </div>
          )}
        </PreviewScaler>
      </div>
    </div>
  );
}