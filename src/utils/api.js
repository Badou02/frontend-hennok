import axios from 'axios';

const BASE_API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const formationAPI = {
  obtenirToutes:    () => api.get('/formations'),
  obtenirVedettes:  () => api.get('/formations/vedettes'),
  obtenirParId:     (id) => api.get(`/formations/${id}`),
};

export const inscriptionAPI = {
  creer: (donnees) => api.post('/inscriptions', donnees),
};

export const temoignageAPI = {
  obtenirTous: () => api.get('/temoignages'),
  creer:       (donnees) => api.post('/temoignages', donnees),
};

export const contactAPI = {
  envoyer: (donnees) => api.post('/contacts', donnees),
};

export default api;
