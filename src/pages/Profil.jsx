import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_user_cv } from "../services/api";

export default function Profil() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  {
    /* on sauvegarde les informations les information du user connecte dans le local storage on met ajoute le state */
  }
  const [user, setUser] = useState({ username: " ", email: " " });
  const [myCv, setMyCv] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const data = await get_user_cv();
        setMyCv(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des CV", error);
      }
    };
    fetchCVs();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const uName = localStorage.getItem("username");
    const uEmail = localStorage.getItem("email");

    setUser({
      username: uName,
      email: uEmail,
    });
  }, []);
  {
    /*fonction pour deconnecter un utilisateur*/
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };
  console.log(myCv);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      {/* --- HEADER MOBILE (Visible uniquement sur mobile) --- */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <h2 className="font-bold text-xl">CV Builder</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-slate-800 rounded-lg text-2xl"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside
        className={`
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col shadow-xl transition-transform duration-300 ease-in-out
    md:translate-x-0 md:sticky md:top-0 md:h-screen
  `}
      >
        {/* Profil Utilisateur */}
        <div className="p-8 border-b border-slate-800 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-500/20">
            {user.username.charAt(0)}
          </div>
          <h2 className="font-semibold text-lg">{user.username}</h2>
          <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-[0.2em]">
            {user.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <button
            onClick={() => navigate("/Builder")}
            className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 font-medium mb-6"
          >
            <span>➕</span> Créer un nouveau CV
          </button>

          <button className="w-full flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl transition-all">
            <span>📄</span> Historique
          </button>
          <button
            className="w-full flex items-center gap-3 text-slate-300 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl transition-all"
            onClick={() => navigate("/")}
          >
            <i className="fa-solid fa-house mr-2"></i> Retourner à l'Acceuil
          </button>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-slate-800">
          <button
            className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl transition-all font-medium"
            onClick={handleLogout}
          >
            <span>🚪</span> Déconnexion
          </button>
        </div>
      </aside>

      {/* --- OVERLAY (Pour fermer le menu mobile en cliquant à côté) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="mb-8 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Mon Tableau de bord
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-1">
            Gérez vos curriculum vitae
          </p>
        </header>

        {/* Grille responsive */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {/* Carte CV existante */}
            {myCv && myCv.length > 0 ? (
              myCv.map((cv) => (
                <div
                  key={cv.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl transition-all group"
                >
                  <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-3xl">
                    📄
                  </div>
                  <h4 className="font-bold text-slate-800 truncate">
                    {/* Correction ici : job_title (avec un seul 't') */}
                    {cv.job_title || "Sans titre"}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">
                    {cv.created_at
                      ? new Date(cv.created_at).toLocaleDateString()
                      : "Date inconnue"}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/builder/${cv.id}`)}
                      className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors border border-slate-100"
                    >
                      ÉDITER
                    </button>
                    <button
                      onClick={() => navigate(`/visualisation/${cv.id}`)}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                    >
                      VOIR
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-500">
                <p>Vous n'avez pas encore créé de CV.</p>
              </div>
            )}

            {/* Bouton Nouveau (Dashed) */}
            <button
              onClick={() => navigate("/Builder")}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-400 transition-all bg-white/50"
            >
              <span className="text-3xl mb-2">➕</span>
              <span className="font-semibold text-sm">Nouveau CV</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
