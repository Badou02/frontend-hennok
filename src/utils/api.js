import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_Vqmsbxt';
const TEMPLATE_INSCRIPTION = 'template_0h6ehft';
const TEMPLATE_CONTACT = 'template_bg9xf3a';
const PUBLIC_KEY = 's5tVMe0TOzUH_ZOyA';

export const formationAPI = {
  obtenirToutes:   () => Promise.resolve({ data: { donnees: [] } }),
  obtenirVedettes: () => Promise.resolve({ data: { donnees: [] } }),
  obtenirParId:    () => Promise.resolve({ data: null }),
};

export const inscriptionAPI = {
  creer: (donnees) =>
    emailjs.send(SERVICE_ID, TEMPLATE_INSCRIPTION, {
      prenom:    donnees.prenom,
      nom:       donnees.nom,
      email:     donnees.email,
      telephone: donnees.telephone,
      formation: donnees.formation,
      niveau:    donnees.niveau,
      message:   donnees.message || 'Aucun message',
    }, PUBLIC_KEY),
};

export const contactAPI = {
  envoyer: (donnees) =>
    emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, {
      nom:     donnees.nom,
      email:   donnees.email,
      sujet:   donnees.sujet,
      message: donnees.message,
    }, PUBLIC_KEY),
};

export const temoignageAPI = {
  obtenirTous: () => Promise.resolve({ data: [] }),
  creer:       () => Promise.resolve(),
};

export default {};