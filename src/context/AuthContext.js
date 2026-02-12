import { createContext, useState, useContext, useEffect } from "react";
import { isTokenExpired } from "../utils/tokenUtils";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Vérifier le token au chargement et toutes les 30 secondes
  useEffect(() => {
    console.log("🔵 AuthProvider monté");
    checkAuth();
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");

    console.log("🔍 Vérification token:", token ? "existe" : "null");

    if (!token || isTokenExpired(token)) {
      console.log("❌ Token invalide");
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    console.log("✅ Token valide");
    setIsAuthenticated(true);

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("✅ User chargé:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ Erreur parsing user:", error);
      }
    }
  };

  const login = (token, userData) => {
    console.log("🔵 LOGIN appelé avec:", { token, userData });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);

    console.log("✅ État après login:", {
      isAuthenticated: true,
      user: userData,
    });
  };

  const logout = () => {
    console.log("🔵 LOGOUT appelé");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    // Ne pas utiliser navigate ici
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  console.log("🔵 AuthProvider render avec:", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  console.log("🔵 useAuth retourne:", context);
  return context;
};
