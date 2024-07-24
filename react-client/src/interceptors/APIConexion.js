const { VITE_BACKEND_HOST = "http://localhost:8080" } = import.meta.env;

export const API_URL = `${VITE_BACKEND_HOST}/api`;