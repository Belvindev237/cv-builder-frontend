import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSubmit = (data) => {
    console.log("Données reçues :", data);
    // Ici : appel fetch vers FastAPI
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* 1. Colonne de Gauche : Formulaire */}
      <div className="flex flex-col justify-center flex-1 px-6 py-12 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-2xl z-10">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo et Header */}
          <div className="text-center lg:text-left mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-200">
              <i className="fas fa-file-invoice fa-lg"></i>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isLogin ? "Bon retour !" : "Rejoignez-nous"}
            </h2>
            <p className="mt-2 text-slate-500 font-medium">
              {isLogin
                ? "Connectez-vous pour gérer vos CV."
                : "Créez votre compte en quelques secondes."}
            </p>
          </div>

          {/* Zone du Formulaire avec Animation légère */}
          <div className="bg-white rounded-2xl transition-all duration-500">
            {isLogin ? (
              <LoginForm onSubmit={handleAuthSubmit} />
            ) : (
              <RegisterForm
                onSubmit={handleAuthSubmit}
                RegisterDone={() => setIsLogin(true)}
              />
            )}
          </div>

          {/* Séparateur / Switch */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isLogin ? "Créer un profil" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Colonne de Droite : Visuel (Masqué sur Mobile) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-blue-600 overflow-hidden">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-12 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Plus qu'un simple CV, <br /> un propulseur de carrière.
          </h3>
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="p-4 bg-blue-500/30 backdrop-blur-md rounded-2xl border border-blue-400/30 text-left">
              <i className="fas fa-magic mb-3 text-blue-200"></i>
              <p className="text-sm font-semibold text-blue-50">
                Édition en temps réel
              </p>
            </div>
            <div className="p-4 bg-blue-500/30 backdrop-blur-md rounded-2xl border border-blue-400/30 text-left">
              <i className="fas fa-file-pdf mb-3 text-blue-200"></i>
              <p className="text-sm font-semibold text-blue-50">
                Export PDF HD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
