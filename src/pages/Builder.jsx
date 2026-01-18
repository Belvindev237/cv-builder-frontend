import Stepper from "../components/SidebarProgess";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import PersonInfo from "../components/Form/PersonInfo";
import Experience from "../components/Form/Experience";
import Education from "../components/Form/Education";
import Competence from "../components/Form/Competence";
import Langue from "../components/Form/Langue";
import ResumePro from "../components/Form/Resume";
import ResumePreview from "../components/ResumePreview";
import { create_cv } from "../services/api";
import { updateCv } from "../services/api";
import { cvById } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Builder() {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const navigate = useNavigate();
  const steps = [
    "Infos Perso",
    "Expérience",
    "Compétences",
    "Formations",
    "Langues",
    "Resume",
  ];
  // const [step, setStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
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
  useEffect(() => {
    // 1. Chercher si des données ont été stockées avant la connexion
    const savedForm = localStorage.getItem("pending_cv_form");
    const step = localStorage.getItem("step");

    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);

        // 2. On remet les données dans le State React
        // Cela va remplir automatiquement tous les champs de ton formulaire
        setFormData(parsedForm);

        // 3. Optionnel : restaurer l'étape du formulaire
        // const savedStep = localStorage.getItem("pending_step");
        // if (savedStep) setStep(parseInt(savedStep));
        if (step) {
          setCurrentStep(parseInt(step));
        }

        console.log("Formulaire restauré avec succès !");

        // 4. Nettoyage : On supprime du localStorage pour éviter que
        // le formulaire ne se recharge tout seul la prochaine fois
        localStorage.removeItem("pending_cv_form");
        localStorage.removeItem("step");
        // localStorage.removeItem("pending_step");
      } catch (error) {
        console.error(
          "Erreur lors de la lecture des données stockées :",
          error,
        );
      }
    }
  }, []); // [] signifie que ça ne s'exécute qu'une seule fois à l'ouverture de la page
  // Ici on affiche le formulaire dynamiquement en fonction des donnees a recuperer

  useEffect(() => {
    // On ne charge les données que si on est en mode "Édition" (donc si ID existe)
    if (id) {
      const fetchCV = async () => {
        try {
          const data = await cvById(id); // On récupère les données via l'API
          setFormData(data); // On remplit le formulaire avec ces données
        } catch (error) {
          console.error("Erreur de chargement", error);
        }
      };
      fetchCV();
    }
  }, [id]); // S'exécute quand l'ID change ou au chargement
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonInfo
            formData={formData}
            setFormData={setFormData}
            Next={onNext}
          />
        );
      case 1:
        return (
          <Experience
            formData={formData}
            setFormData={setFormData}
            Prev={onPrev}
            Next={onNext}
          />
        );

      case 2:
        return (
          <Education
            formData={formData}
            setFormData={setFormData}
            Prev={onPrev}
            Next={onNext}
          />
        );
      case 3:
        return (
          <Competence
            formData={formData}
            setFormData={setFormData}
            Prev={onPrev}
            Next={onNext}
          />
        );
      case 4:
        return (
          <Langue
            formData={formData}
            setFormData={setFormData}
            Prev={onPrev}
            Next={onNext}
          />
        );
      case 5:
        return (
          <ResumePro
            formData={formData}
            setFormData={setFormData}
            Prev={onPrev}
            Next={handleSave}
          />
        );
      default:
        return <div>Étape non implémentée</div>;
    }
  };
  const handleSave = async () => {
    // Transformation du format React vers le format Python (Pydantic)
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      job_title: formData.jobTitle,
      address: formData.address,
      code_postal: formData.postalCode, // postalCode -> code_postal
      city: formData.city,
      phone_number: formData.phone, // phone -> phone_number
      email: formData.email,
      site: formData.website || "", // website -> site
      summary: formData.summary,
      hobbies: formData.hobbies,

      // On renomme experienceList en experiences
      experiences: (formData.experienceList || []).map((exp) => ({
        job_title: exp.jobTitle,
        company: exp.company,
        start_date: exp.startDate,
        end_date: exp.endDate,
        description: exp.description,
      })),

      // On renomme educationList en educations
      educations: formData.educationList.map((edu) => ({
        degree: edu.degree || "",
        institution: edu.institution || "",
        start_date: edu.startDate || "",
        end_date: edu.endDate || "",
        domain: edu.fieldOfStudy || "", // <--- C'est ce champ qui manquait !
      })),
      // On aligne la structure Skill
      skill: {
        technical_skills: formData.skill?.technicalSkills || [],
        soft_skills: formData.skill?.softSkills || [],
      },

      languages: formData.languages || [],
    };
    console.log("État actuel avant sauvegarde:", cvData);
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
        //   alert("Cv mise à jour");
        navigate(`/visualisation/${id}`);
        return;
      }

      console.log("Payload formaté envoyé :", payload);
      const result = await create_cv(payload);
      const cv_id = result.id;
      //alert("🚀 CV enregistré avec succès !");
      navigate(`/visualisation/${cv_id}`);
    } catch (error) {
      console.error("Erreur 422 détaillée :", error.response?.data?.detail);
      //  alert("Erreur de validation. Vérifiez la console F12.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* On enlève 'hidden' et on change la gestion de la largeur */}
      <div className="w-full md:w-80 bg-gray-100 border-b md:border-r">
        <Stepper currentStep={currentStep} />
      </div>
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        {renderStep()}
        {/*    {currentStep === 0 && (
          <PersonInfo
            formData={formData}
            setFormData={setFormData}
            Next={onNext}
          />
        )}*/}
      </div>

      <div className="hidden lg:block w-120 bg-gray-100 border-l p-4">
        <ResumePreview formData={formData} />
      </div>
    </div>
  );
}
