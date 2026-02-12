import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token || token === "null" || token === "undefined") {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Erreur décodage token:", error);
    return true;
  }
};
