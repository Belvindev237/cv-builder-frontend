import Stepper from "../components/SidebarProgess";
import { useState } from "react";
import PersonInfo from "../components/Form/PersonInfo";
import Experience from "../components/Form/Experience";
import Education from "../components/Form/Education";
import Competence from "../components/Form/Competence";
import Langue from "../components/Form/Langue";
import ResumePro from "../components/Form/Resume";
import ResumePreview from "../components/ResumePreview";

export default function Builder() {
  const steps = [
    "Infos Perso",
    "Expérience",
    "Compétences",
    "Formations",
    "Langues",
    "Resume",
  ];
  const [step, setStep] = useState(0);
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
    skills: [],
    technicalSkills: [], // On utilise le même nom que dans le bouton
    softSkills: [],
    languages: [],
  });

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
            Next={onNext}
          />
        );
      default:
        return <div>Étape non implémentée</div>;
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
