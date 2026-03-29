import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { inscriptionAPI } from '../utils/api';

const FORMATIONS = [
  'Ambulancier',
  'Brancardier',
  'Agent de Santé Communautaire',
  'Technicien de Surface en Milieu Hospitalier',
  'Délégué Médical',
  'Vendeur en Pharmacie',
  'Transformation des fruits et légumes',
];

const ETAPES = ['Informations Personnelles', 'Choix de la Formation', 'Récapitulatif'];

export default function Inscription() {
  const [paramsURL] = useSearchParams();
  const formationPre = paramsURL.get('formation') || '';

  const [etape, setEtape] = useState(0);
  const [chargement, setChargement] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreurServeur, setErreurServeur] = useState('');
  const [erreurs, setErreurs] = useState({});

  const [formulaire, setFormulaire] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    formation: formationPre, niveau: 'debutant',
    message: '', accepteConditions: false,
  });

  useEffect(() => {
    if (formationPre) setFormulaire(f => ({ ...f, formation: formationPre }));
  }, [formationPre]);

  const mettreAJour = (cle, valeur) => {
    setFormulaire(f => ({ ...f, [cle]: valeur }));
    setErreurs(e => ({ ...e, [cle]: '' }));
  };

  const validerEtape0 = () => {
    const e = {};
    if (!formulaire.prenom.trim()) e.prenom = 'Le prénom est obligatoire.';
    if (!formulaire.nom.trim()) e.nom = 'Le nom est obligatoire.';
    if (!formulaire.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Adresse e-mail invalide.';
    if (!formulaire.telephone.trim()) e.telephone = 'Le numéro de téléphone est obligatoire.';
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const validerEtape1 = () => {
    const e = {};
    if (!formulaire.formation) e.formation = 'Veuillez sélectionner une formation.';
    if (!formulaire.accepteConditions) e.accepteConditions = 'Vous devez accepter les conditions.';
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const etapeSuivante = () => {
    if (etape === 0 && validerEtape0()) setEtape(1);
    else if (etape === 1 && validerEtape1()) setEtape(2);
  };

  const soumettre = async () => {
    setChargement(true);
    setErreurServeur('');
    try {
      await inscriptionAPI.creer(formulaire);
      setSucces(true);
    } catch (err) {
      setErreurServeur(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setChargement(false);
    }
  };

  if (succes) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-16" style={{backgroundColor:'#fafaf8'}}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{backgroundColor:'rgba(34,197,94,0.1)', border:'2px solid #22c55e'}}>
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="font-titre text-3xl font-bold mb-3" style={{color:'#1e3a5f'}}>
            Inscription Enregistrée !
          </h2>
          <p className="font-corps text-gray-500 mb-2">
            Merci, <strong>{formulaire.prenom}</strong> ! Votre demande d'inscription à la formation
          </p>
          <p className="font-titre text-lg font-bold mb-6" style={{color:'#e8600a'}}>
            « {formulaire.formation} »
          </p>
          <p className="font-corps text-gray-500 mb-3">
            a bien été reçue. Notre équipe vous contactera sous 24h à l'adresse :
          </p>
          <p className="font-corps font-semibold text-gray-700 mb-8">{formulaire.email}</p>
          <div className="p-4 rounded-sm mb-8 text-sm text-gray-600 font-corps border"
            style={{backgroundColor:'rgba(212,160,23,0.05)', borderColor:'rgba(212,160,23,0.2)'}}>
            📞 Vous pouvez également nous appeler : <strong>+221 78 720 73 44</strong>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/formations" className="btn-principal text-center rounded-sm py-3">
              Voir d'autres formations
            </Link>
            <Link to="/" className="btn-contour text-center rounded-sm py-3">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="entree-page min-h-screen pt-16" style={{backgroundColor:'#fafaf8'}}>
      {/* En-tête */}
      <div className="fond-pattern py-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-48 h-48 border border-yellow-500/10 -rotate-12 -translate-x-10 translate-y-10"
          style={{borderColor:'rgba(212,160,23,0.1)'}}/>
        <div className="max-w-3xl mx-auto px-6">
          <p className="etiquette-section mb-3" style={{color:'#d4a017'}}>
            <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{backgroundColor:'#d4a017'}}/>
            Rejoignez-Nous
          </p>
          <h1 className="font-titre text-5xl font-bold text-white mb-3">S'inscrire</h1>
          <p className="font-corps text-gray-400">Complétez ce formulaire pour démarrer votre parcours à Institut Henok.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Indicateur d'étapes */}
        <div className="flex items-center mb-10 overflow-x-auto">
          {ETAPES.map((label, i) => (
            <div key={label} className="flex items-center" style={{flex: i < ETAPES.length - 1 ? '1' : 'none'}}>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={`w-9 h-9 border-2 flex items-center justify-center font-corps text-sm font-bold transition-all rounded-sm ${
                  i < etape ? 'text-white' : i === etape ? 'text-white' : 'bg-white text-gray-300 border-gray-200'
                }`} style={i <= etape ? {
                  backgroundColor: i < etape ? '#22c55e' : '#1e3a5f',
                  borderColor: i < etape ? '#22c55e' : '#1e3a5f'
                } : {}}>
                  {i < etape ? '✓' : i + 1}
                </div>
                <span className={`font-corps text-xs uppercase tracking-wide hidden sm:block whitespace-nowrap ${
                  i === etape ? 'font-bold' : 'text-gray-400'
                }`} style={i === etape ? {color:'#1e3a5f'} : {}}>
                  {label}
                </span>
              </div>
              {i < ETAPES.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${i < etape ? 'bg-green-400' : 'bg-gray-200'}`}/>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 p-8 shadow-sm rounded-sm">
          {/* ─── Étape 0 : Informations personnelles ─── */}
          {etape === 0 && (
            <div>
              <h2 className="font-titre text-2xl font-bold mb-6" style={{color:'#1e3a5f'}}>
                Informations Personnelles
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { cle: 'prenom', label: 'Prénom', ph: 'Aminata', type: 'text' },
                  { cle: 'nom', label: 'Nom de famille', ph: 'Diallo', type: 'text' },
                  { cle: 'email', label: 'Adresse e-mail', ph: 'aminata@exemple.com', type: 'email' },
                  { cle: 'telephone', label: 'Numéro de téléphone', ph: '+221 77 xxx xx xx', type: 'tel' },
                ].map(({ cle, label, ph, type }) => (
                  <div key={cle}>
                    <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input type={type} value={formulaire[cle]}
                      onChange={e => mettreAJour(cle, e.target.value)}
                      placeholder={ph}
                      className={`champ ${erreurs[cle] ? 'border-red-400 ring-2 ring-red-100' : ''}`}/>
                    {erreurs[cle] && <p className="text-red-500 text-xs mt-1">{erreurs[cle]}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Étape 1 : Choix de la formation ─── */}
          {etape === 1 && (
            <div>
              <h2 className="font-titre text-2xl font-bold mb-6" style={{color:'#1e3a5f'}}>
                Choisissez Votre Formation
              </h2>

              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Formation souhaitée <span className="text-red-500">*</span>
                </label>
                <select value={formulaire.formation}
                  onChange={e => mettreAJour('formation', e.target.value)}
                  className={`champ ${erreurs.formation ? 'border-red-400' : ''}`}>
                  <option value="">-- Sélectionnez une formation --</option>
                  <optgroup label="🏥 Formations Paramédicales">
                    {FORMATIONS.slice(0, 4).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🧴 Formations en Cosmétologie">
                    {FORMATIONS.slice(4).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </optgroup>
                </select>
                {erreurs.formation && <p className="text-red-500 text-xs mt-1">{erreurs.formation}</p>}
              </div>

              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Niveau d'expérience
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 'debutant', label: 'Débutant', desc: 'Aucune expérience' },
                    { val: 'intermediaire', label: 'Intermédiaire', desc: 'Quelques bases' },
                    { val: 'avance', label: 'Avancé', desc: 'Expérience préalable' },
                  ].map(({ val, label, desc }) => (
                    <label key={val}
                      className={`border-2 p-3 cursor-pointer text-center transition-all rounded-sm ${
                        formulaire.niveau === val ? 'bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={formulaire.niveau === val ? {borderColor:'#1e3a5f', backgroundColor:'rgba(30,58,95,0.04)'} : {}}>
                      <input type="radio" name="niveau" value={val}
                        checked={formulaire.niveau === val}
                        onChange={e => mettreAJour('niveau', e.target.value)}
                        className="sr-only"/>
                      <span className="font-corps text-sm font-semibold block" style={{color:'#1e3a5f'}}>{label}</span>
                      <span className="font-corps text-xs text-gray-400">{desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Message / Questions (optionnel)
                </label>
                <textarea value={formulaire.message}
                  onChange={e => mettreAJour('message', e.target.value)}
                  rows={3}
                  placeholder="Parlez-nous de votre parcours ou posez vos questions..."
                  className="champ resize-none"/>
              </div>

              <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-sm transition-colors ${
                erreurs.accepteConditions ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input type="checkbox" checked={formulaire.accepteConditions}
                  onChange={e => mettreAJour('accepteConditions', e.target.checked)}
                  className="mt-0.5 w-4 h-4" style={{accentColor:'#1e3a5f'}}/>
                <span className="font-corps text-sm text-gray-600">
                  J'accepte les{' '}
                  <a href="#" className="underline" style={{color:'#e8600a'}}>conditions générales</a>
                  {' '}et la{' '}
                  <a href="#" className="underline" style={{color:'#e8600a'}}>politique de confidentialité</a>.
                  Je consens à être contacté(e) par Institut Henok.
                </span>
              </label>
              {erreurs.accepteConditions && (
                <p className="text-red-500 text-xs mt-1">{erreurs.accepteConditions}</p>
              )}
            </div>
          )}

          {/* ─── Étape 2 : Récapitulatif ─── */}
          {etape === 2 && (
            <div>
              <h2 className="font-titre text-2xl font-bold mb-6" style={{color:'#1e3a5f'}}>
                Vérifiez et Confirmez
              </h2>
              <div className="space-y-4 mb-6">
                <div className="p-4 border border-gray-100 rounded-sm" style={{backgroundColor:'#f8f7f4'}}>
                  <p className="etiquette-section mb-3">Informations Personnelles</p>
                  <div className="grid grid-cols-2 gap-2 font-corps text-sm">
                    <div><span className="text-gray-400">Nom complet :</span> <span className="font-semibold">{formulaire.prenom} {formulaire.nom}</span></div>
                    <div><span className="text-gray-400">E-mail :</span> <span className="font-semibold">{formulaire.email}</span></div>
                    <div><span className="text-gray-400">Téléphone :</span> <span className="font-semibold">{formulaire.telephone}</span></div>
                  </div>
                </div>
                <div className="p-4 rounded-sm border" style={{backgroundColor:'rgba(212,160,23,0.04)', borderColor:'rgba(212,160,23,0.2)'}}>
                  <p className="etiquette-section mb-3">Formation Choisie</p>
                  <p className="font-titre text-xl font-bold mb-1" style={{color:'#1e3a5f'}}>{formulaire.formation}</p>
                  <p className="font-corps text-sm text-gray-500 capitalize">
                    Niveau : <strong>{formulaire.niveau === 'debutant' ? 'Débutant' : formulaire.niveau === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</strong>
                  </p>
                  {formulaire.message && (
                    <p className="font-corps text-sm text-gray-500 mt-2 italic">« {formulaire.message} »</p>
                  )}
                </div>
              </div>
              {erreurServeur && (
                <div className="bg-red-50 border border-red-200 p-3 mb-4 rounded-sm">
                  <p className="font-corps text-sm text-red-600">{erreurServeur}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={() => setEtape(s => Math.max(0, s - 1))}
              disabled={etape === 0}
              className={`btn-contour py-2.5 px-5 text-xs rounded-sm ${etape === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}>
              ← Précédent
            </button>
            {etape < 2 ? (
              <button onClick={etapeSuivante} className="btn-principal py-2.5 px-6 rounded-sm">
                Continuer →
              </button>
            ) : (
              <button onClick={soumettre} disabled={chargement}
                className={`btn-principal py-2.5 px-6 rounded-sm ${chargement ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {chargement ? 'Envoi en cours...' : 'Confirmer l\'inscription →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
