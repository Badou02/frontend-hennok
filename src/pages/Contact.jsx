import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactAPI } from '../utils/api';

const SUJETS = [
  'Renseignements sur une formation',
  'Procédure d\'inscription',
  'Tarifs et modalités de paiement',
  'Calendrier des formations',
  'Partenariat professionnel',
  'Autre',
];

const FAQ = [
  {
    q: 'Quand démarrent les prochaines formations ?',
    r: 'Nos formations démarrent régulièrement tout au long de l\'année. Contactez-nous pour connaître les prochaines dates d\'entrée et les places disponibles.'
  },
  {
    q: 'Les formations sont-elles reconnues par l\'État ?',
    r: 'Oui ! Institut Henok est agréé par le Ministère de l\'Emploi et de la Formation Professionnelle et Technique (MFPT) du Sénégal. Nos diplômes sont officiellement reconnus.'
  },
  {
    q: 'Est-il possible de payer en plusieurs fois ?',
    r: 'Oui, nous proposons des facilités de paiement. Contactez notre équipe administrative pour discuter des modalités adaptées à votre situation.'
  },
  {
    q: 'Y a-t-il des stages pratiques inclus dans les formations ?',
    r: 'Absolument. Toutes nos formations paramédicales incluent des stages pratiques dans des structures de santé partenaires de la région de Diamniadio.'
  },
  {
    q: 'Où se trouve exactement Institut Henok ?',
    r: 'Nous sommes situés à Diamniadio, Cité des Fonctionnaires, Villa N° 178, en face de la Villa Américaine. Facilement accessible depuis Dakar via l\'autoroute à péage.'
  },
];

export default function Contact() {
  const [formulaire, setFormulaire] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [erreurs, setErreurs] = useState({});
  const [chargement, setChargement] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreurServeur, setErreurServeur] = useState('');
  const [faqOuverte, setFaqOuverte] = useState(null);

  const mettreAJour = (k, v) => { setFormulaire(f => ({ ...f, [k]: v })); setErreurs(e => ({ ...e, [k]: '' })); };

  const valider = () => {
    const e = {};
    if (!formulaire.nom.trim()) e.nom = 'Le nom est obligatoire.';
    if (!formulaire.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Adresse e-mail invalide.';
    if (!formulaire.sujet) e.sujet = 'Veuillez sélectionner un sujet.';
    if (!formulaire.message.trim() || formulaire.message.length < 20)
      e.message = 'Le message doit contenir au moins 20 caractères.';
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const soumettre = async () => {
    if (!valider()) return;
    setChargement(true);
    setErreurServeur('');
    try {
      await contactAPI.envoyer(formulaire);
      setSucces(true);
    } catch (err) {
      setErreurServeur(err.response?.data?.message || 'Erreur d\'envoi. Veuillez réessayer ou nous appeler directement.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="entree-page min-h-screen bg-white pt-16">
      {/* En-tête */}
      <div className="fond-pattern py-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 border border-yellow-500/10 rotate-45 translate-x-20 translate-y-20"
          style={{borderColor:'rgba(212,160,23,0.1)'}}/>
        <div className="max-w-7xl mx-auto px-6">
          <p className="etiquette-section mb-3" style={{color:'#d4a017'}}>
            <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{backgroundColor:'#d4a017'}}/>
            Nous Joindre
          </p>
          <h1 className="font-titre text-5xl font-bold text-white mb-4">Nous Contacter</h1>
          <p className="font-corps text-gray-400 max-w-xl">
            Une question sur nos formations ? Besoin de renseignements pour votre inscription ? 
            Notre équipe est à votre disposition.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* Colonne gauche : infos */}
        <div className="lg:col-span-1 space-y-8">
          {/* Coordonnées */}
          <div>
            <p className="etiquette-section mb-5">Nos Coordonnées</p>
            <div className="space-y-5">
              {[
                {
                  icone: '📍',
                  label: 'Adresse',
                  contenu: 'Cité des Fonctionnaires\nVilla N° 178, en face Villa Américaine\nDiamniadio, Sénégal'
                },
                {
                  icone: '📞',
                  label: 'Téléphones',
                  contenu: '+221 78 720 73 44\n+221 77 531 49 44\n77 552 99 97 / 76 658 91 58',
                  lien: 'tel:+221787207344'
                },
                {
                  icone: '🕐',
                  label: 'Horaires d\'ouverture',
                  contenu: 'Lundi – Vendredi : 8h00 – 18h00\nSamedi : 9h00 – 14h00'
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 border"
                    style={{backgroundColor:'rgba(30,58,95,0.06)', borderColor:'rgba(30,58,95,0.1)'}}>
                    <span className="text-lg">{item.icone}</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                    {item.lien ? (
                      <a href={item.lien} className="font-corps text-sm whitespace-pre-line hover:underline"
                        style={{color:'#1e3a5f'}}>
                        {item.contenu}
                      </a>
                    ) : (
                      <p className="font-corps text-sm text-gray-700 whitespace-pre-line">{item.contenu}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carte / Localisation */}
          <div className="rounded-sm overflow-hidden border border-gray-200 h-44 relative"
            style={{backgroundColor:'#e8e8e0'}}>
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:'repeating-linear-gradient(0deg,#888 0,#888 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#888 0,#888 1px,transparent 0,transparent 40px)',
                backgroundSize:'40px 40px'
              }}/>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <div className="text-4xl mb-2">📍</div>
              <p className="font-titre text-sm font-bold" style={{color:'#1e3a5f'}}>Diamniadio</p>
              <p className="font-corps text-xs text-gray-500">Cité des Fonctionnaires, Villa 178</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="font-corps text-xs mt-2 px-3 py-1 rounded-sm border font-semibold transition-colors"
                style={{color:'#e8600a', borderColor:'rgba(232,96,10,0.3)'}}>
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="p-5 rounded-sm border" style={{backgroundColor:'rgba(30,58,95,0.03)', borderColor:'rgba(30,58,95,0.1)'}}>
            <p className="etiquette-section mb-4">Actions Rapides</p>
            <div className="flex flex-col gap-2">
              <Link to="/inscription" className="btn-principal py-2.5 text-center text-xs rounded-sm">
                S'inscrire à une formation
              </Link>
              <Link to="/formations" className="btn-contour py-2.5 text-center text-xs rounded-sm">
                Voir le catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Colonne droite : formulaire */}
        <div className="lg:col-span-2">
          {succes ? (
            <div className="bg-white border rounded-sm p-10 text-center h-full flex flex-col items-center justify-center shadow-sm"
              style={{borderColor:'rgba(34,197,94,0.3)'}}>
              <div className="text-6xl mb-4">✉️</div>
              <h3 className="font-titre text-2xl font-bold mb-3" style={{color:'#1e3a5f'}}>
                Message Envoyé !
              </h3>
              <p className="font-corps text-gray-500 max-w-sm mb-6">
                Merci pour votre message. Nous répondrons à <strong>{formulaire.email}</strong> dans les plus brefs délais.
              </p>
              <p className="font-corps text-sm text-gray-400 mb-6">
                Vous pouvez aussi nous appeler directement : <strong>+221 78 720 73 44</strong>
              </p>
              <button
                onClick={() => { setSucces(false); setFormulaire({ nom: '', email: '', sujet: '', message: '' }); }}
                className="btn-contour rounded-sm">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-8 shadow-sm rounded-sm">
              <h2 className="font-titre text-2xl font-bold mb-6" style={{color:'#1e3a5f'}}>
                Envoyez-nous un Message
              </h2>
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                    Nom Complet <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formulaire.nom}
                    onChange={e => mettreAJour('nom', e.target.value)}
                    placeholder="Votre nom"
                    className={`champ ${erreurs.nom ? 'border-red-400' : ''}`}/>
                  {erreurs.nom && <p className="text-red-500 text-xs mt-1">{erreurs.nom}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                    Adresse E-mail <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={formulaire.email}
                    onChange={e => mettreAJour('email', e.target.value)}
                    placeholder="votre@email.com"
                    className={`champ ${erreurs.email ? 'border-red-400' : ''}`}/>
                  {erreurs.email && <p className="text-red-500 text-xs mt-1">{erreurs.email}</p>}
                </div>
              </div>
              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Objet du Message <span className="text-red-500">*</span>
                </label>
                <select value={formulaire.sujet}
                  onChange={e => mettreAJour('sujet', e.target.value)}
                  className={`champ ${erreurs.sujet ? 'border-red-400' : ''}`}>
                  <option value="">-- Sélectionnez un objet --</option>
                  {SUJETS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {erreurs.sujet && <p className="text-red-500 text-xs mt-1">{erreurs.sujet}</p>}
              </div>
              <div className="mb-6">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea value={formulaire.message}
                  onChange={e => mettreAJour('message', e.target.value)}
                  rows={6}
                  placeholder="Décrivez votre demande ou posez votre question en détail..."
                  className={`champ resize-none ${erreurs.message ? 'border-red-400' : ''}`}/>
                <div className="flex justify-between mt-1">
                  {erreurs.message
                    ? <p className="text-red-500 text-xs">{erreurs.message}</p>
                    : <span/>}
                  <span className={`font-mono text-xs ${formulaire.message.length < 20 ? 'text-gray-300' : 'text-green-500'}`}>
                    {formulaire.message.length} car.
                  </span>
                </div>
              </div>
              {erreurServeur && (
                <div className="bg-red-50 border border-red-200 p-3 mb-4 rounded-sm">
                  <p className="font-corps text-sm text-red-600">{erreurServeur}</p>
                </div>
              )}
              <button onClick={soumettre} disabled={chargement}
                className={`btn-principal w-full rounded-sm py-3 ${chargement ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {chargement ? 'Envoi en cours...' : 'Envoyer le Message →'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-200 py-16" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="etiquette-section mb-3">Questions Fréquentes</p>
            <h2 className="font-titre text-3xl font-bold" style={{color:'#1e3a5f'}}>
              Vous avez des questions ?
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 overflow-hidden rounded-sm shadow-sm">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setFaqOuverte(faqOuverte === i ? null : i)}>
                  <span className="font-corps font-semibold text-gray-900 text-sm">{item.q}</span>
                  <span className="font-titre text-xl leading-none ml-4 flex-shrink-0 transition-transform"
                    style={{
                      color: '#e8600a',
                      transform: faqOuverte === i ? 'rotate(45deg)' : 'none'
                    }}>
                    +
                  </span>
                </button>
                {faqOuverte === i && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <p className="font-corps text-sm text-gray-500 leading-relaxed pt-4">{item.r}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
