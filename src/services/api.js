import axios from "axios";
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:8000" // URL pour ton PC
    : "https://cv-builder-d7rd.onrender.com", // URL pour Render
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Fonction pour transformer le snake_case (DB) en camelCase (React)
const mapDBToFrontend = (data) => {
  return {
    firstName: data.first_name,
    lastName: data.last_name,
    jobTitle: data.job_title,
    address: data.address,
    postalCode: data.code_postal,
    city: data.city,
    phone: data.phone_number,
    email: data.email,
    website: data.site,
    summary: data.summary,
    hobbies: data.hobbies,
    //On garde les listes telles quelles si les objets internes sont déjà gérés
    experienceList: data.experiences || [],
    educationList: data.educations || [],
    skill: {
      technicalSkills: data.skill?.technical_skills || [],
      softSkills: data.skill?.soft_skills || [],
    },
    languages: data.languages || [],
  };
};
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const create_cv = async (cvData) => {
  const response = await api.post("/cv/create_cv", cvData);
  return response.data;
};

// recuperation d'un Cv par ID
export const cvById = async (id) => {
  const response = await api.get(`/cv/${id}`);
  return mapDBToFrontend(response.data);
};

// recuperation des Cvs d'un utilisateur donne
export const get_user_cv = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/cv/user_cvs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCv = async (id, cvData) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`/cv/${id}`, cvData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
