import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactDOMServer from "react-dom/server";
import CVTemplate1 from "../components/templates/CVTemplate1";
import CVTemplate2 from "../components/templates/CVTemplate2";
import CVTemplate3 from "../components/templates/CVTemplate3";
import CVTemplate4 from "../components/templates/CVTemplate4";
import CVTemplate5 from "../components/templates/CVTemplate5";
import CVTemplate6 from "../components/templates/CVTemplate6";
import CVTemplate7 from "../components/templates/CVTemplate7";
import CVTemplate8  from "../components/templates/CVTemplate8";
import CVTemplate9  from "../components/templates/CVTemplate9";
import CVTemplate10 from "../components/templates/CVTemplate10";
import { cvById } from "../services/api";
import { generateStyledHTML } from "../utils/extractStyle";

export default function Visualisation() {
  const { t } = useTranslation();
  const [cvStyle, setCvStyle] = useState({ primaryColor: "#2563eb" });
  const [cvData, setCvData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
const API_URL="https://cv-builder-d7rd.onrender.com";
  const templates = [
    { id: 1, name: t('visualisation.templates.1'), component: CVTemplate1 },
    { id: 2, name: t('visualisation.templates.2'), component: CVTemplate2 },
    { id: 3, name: t('visualisation.templates.3'), component: CVTemplate3 },
    { id: 4, name: t('visualisation.templates.4'), component: CVTemplate4 },
    { id: 5, name: t('visualisation.templates.5'), component: CVTemplate5 },
    { id: 6, name: t('visualisation.templates.6'), component: CVTemplate6 },
    { id: 7, name: t('visualisation.templates.7'), component: CVTemplate7 },
    { id: 8, name: t('visualisation.templates.8'), component: CVTemplate8 },
    { id: 9, name: t('visualisation.templates.9'), component: CVTemplate9 },
    { id: 10, name: t('visualisation.templates.10'), component: CVTemplate10 },
  ];

  const SelectedComponent = templates.find(
    (t) => t.id === selectedTemplate,
  )?.component;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cvById(id);
        setCvData(data);
        console.log(data);
        if (data.template_id) {
          setSelectedTemplate(data.template_id);
          console.log(data.template_id);
        } else {
          console.log("pas de template");
          setSelectedTemplate(1);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du CV:", error);
        setSelectedTemplate(1);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const generatePDF = async () => {
    if (!cvData || !SelectedComponent) {
      alert("❌ Aucun CV à télécharger");
      return;
    }

    setIsGenerating(true);

    try {
      const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <SelectedComponent formData={cvData} customStyle={cvStyle} />
      );

      const fullHTML = generateStyledHTML(htmlContent, selectedTemplate);

      console.log("📄 HTML généré pour template", selectedTemplate);

      const response = await fetch(`${API_URL}/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          html: fullHTML,
          fileName: `CV_${cvData.firstName || cvData.first_name}_${cvData.lastName || cvData.last_name}.pdf`,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la génération du PDF");
      }

      const blob = await response.blob();
      console.log("📥 Taille du PDF:", blob.size, "octets");

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_${cvData.firstName || cvData.first_name}_${cvData.lastName || cvData.last_name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      alert("✅ PDF téléchargé avec succès !");
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("❌ Erreur lors de la génération du PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  // Fermer le menu après sélection d'un template sur mobile
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Header mobile avec boutons d'action */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 no-print">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <button
          onClick={generatePDF}
          disabled={!cvData || isGenerating}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-colors shadow-md font-medium text-sm min-h-[44px]"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden xs:inline">{t('visualisation.sidebar.generating')}</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>{t('visualisation.sidebar.download_pdf')}</span>
            </>
          )}
        </button>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-full xs:w-80 sm:w-96 lg:w-80 bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col border-r border-gray-200
          no-print
        `}
      >
        {/* Header sidebar mobile */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {t('visualisation.sidebar.title')}
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <h1 className="hidden lg:block text-xl font-bold text-gray-800 mb-2">
            {t('visualisation.sidebar.title')}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {t('visualisation.sidebar.subtitle')}
          </p>

          {/* Sélection de template */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              {t('visualisation.sidebar.select_template')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 mb-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all min-h-[48px] text-sm sm:text-base ${
                    selectedTemplate === template.id
                      ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400"
                      : "bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 shadow border border-gray-200"
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton télécharger PDF - Desktop uniquement */}
          <div className="hidden lg:block mb-6">
            <button
              onClick={generatePDF}
              disabled={!cvData || isGenerating}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-xl transition-all shadow-lg font-medium"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('visualisation.sidebar.generating')}
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {t('visualisation.sidebar.download_pdf')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/profil")}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-3 rounded-xl transition-all shadow-lg font-medium min-h-[48px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('visualisation.sidebar.my_documents')}
          </button>
        </div>
      </aside>

      {/* Zone de prévisualisation */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-100 to-gray-200 pt-16 lg:pt-0">
        {!cvData ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                {t('visualisation.main.loading_cv')}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-start justify-center p-3 sm:p-4 lg:p-8">
            <div className="w-full max-w-4xl">
              {SelectedComponent && (
                <div className="shadow-2xl rounded-lg overflow-hidden bg-white">
                  <SelectedComponent formData={cvData} customStyle={cvStyle} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}