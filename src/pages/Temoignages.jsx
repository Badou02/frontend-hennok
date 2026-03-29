import { useState, useEffect } from 'react';
import CarteTemoignage from '../components/CarteTemoignage';
import { temoignageAPI } from '../utils/api';

const TEMOIGNAGES_MOCK = [
  { _id: '1', nom: 'Aminata Diallo', role: 'Ambulancière, Hôpital de Diamniadio', formation: 'Ambulancier', note: 5, contenu: 'L\'Institut Henok a transformé ma vie. Les formateurs sont exceptionnels et la formation est très pratique. J\'ai trouvé un emploi à l\'hôpital de Diamniadio deux mois après l\'obtention de mon diplôme !', approuve: true },
  { _id: '2', nom: 'Moussa Traoré', role: 'Brancardier, Clinique du Plateau', formation: 'Brancardier', note: 5, contenu: 'La formation de brancardier m\'a donné toutes les compétences nécessaires pour exercer dans un environnement médical professionnel. L\'équipe pédagogique est très disponible et compétente.', approuve: true },
  { _id: '3', nom: 'Fatimata Koné', role: 'Agente de Santé Communautaire', formation: 'Agent de Santé Communautaire', note: 5, contenu: 'Grâce à Institut Henok, je contribue maintenant à la santé de ma communauté à Diamniadio. La formation couvre exactement ce dont nous avons besoin sur le terrain. Je recommande vivement !', approuve: true },
];

export default function Temoignages() {
  const [temoignages, setTemoignages] = useState(TEMOIGNAGES_MOCK);
  const [formulaire, setFormulaire] = useState({ nom: '', role: '', formation: '', note: 5, contenu: '' });
  const [envoye, setEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    temoignageAPI.obtenirTous()
      .then(r => r.data?.donnees?.length && setTemoignages(r.data.donnees))
      .catch(() => {});
  }, []);

  const soumettre = async () => {
    if (!formulaire.nom || !formulaire.contenu) return;
    setChargement(true);
    try { await temoignageAPI.creer(formulaire); } catch {}
    setChargement(false);
    setEnvoye(true);
  };

  const noteMoyenne = (temoignages.reduce((acc, t) => acc + t.note, 0) / temoignages.length).toFixed(1);

  return (
    <div className="entree-page min-h-screen bg-white pt-16">
      {/* En-tête */}
      <div className="fond-pattern py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 border border-yellow-500/10 rotate-12 translate-x-10 -translate-y-10"
          style={{borderColor:'rgba(212,160,23,0.1)'}}/>
        <div className="max-w-7xl mx-auto px-6">
          <p className="etiquette-section mb-3" style={{color:'#d4a017'}}>
            <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{backgroundColor:'#d4a017'}}/>
            Paroles d'Apprenants
          </p>
          <h1 className="font-titre text-5xl font-bold text-white mb-4">Témoignages</h1>
          <p className="font-corps text-gray-400 max-w-xl">
            Écoutez ceux qui ont transformé leur carrière grâce à Institut Henok.
            Des parcours réels, des résultats concrets.
          </p>
        </div>
      </div>

      {/* Résumé des notes */}
      {/* <div className="py-10 border-b border-gray-100" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-10 justify-center">
          <div className="text-center">
            <div className="font-titre text-6xl font-bold" style={{color:'#d4a017'}}>{noteMoyenne}</div>
            <div className="flex gap-1 justify-center mt-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={`text-lg ${i <= Math.round(parseFloat(noteMoyenne)) ? 'text-amber-500' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mt-1">Note Moyenne</p>
          </div>
          <div className="w-px h-16 bg-gray-300 hidden md:block"/>
          <div className="text-center">
            <div className="font-titre text-6xl font-bold" style={{color:'#d4a017'}}>{temoignages.length}+</div>
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mt-1">Témoignages Vérifiés</p>
          </div>
          <div className="w-px h-16 bg-gray-300 hidden md:block"/>
          <div className="text-center">
            <div className="font-titre text-6xl font-bold" style={{color:'#d4a017'}}>92%</div>
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mt-1">Recommandent Institut Henok</p>
          </div>
          <div className="w-px h-16 bg-gray-300 hidden md:block"/>
          <div className="text-center">
            <div className="font-titre text-6xl font-bold" style={{color:'#d4a017'}}>500+</div>
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400 mt-1">Diplômés Insérés</p>
          </div>
        </div>
      </div> */}

      {/* Grille de témoignages */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <CarteTemoignage key={t._id} temoignage={t} index={i}/>
          ))}
        </div>
      </div>

      {/* Formulaire de témoignage */}
      <div className="border-t border-gray-200 py-16" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="etiquette-section mb-3">Partagez Votre Expérience</p>
            <h2 className="font-titre text-3xl font-bold" style={{color:'#1e3a5f'}}>
              Vous Avez Suivi une Formation ?
            </h2>
            <p className="font-corps text-gray-500 mt-2">
              Votre témoignage aide d'autres personnes à prendre la bonne décision.
            </p>
          </div>

          {envoye ? (
            <div className="bg-white border rounded-sm p-8 text-center shadow-sm"
              style={{borderColor:'rgba(34,197,94,0.3)'}}>
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="font-titre text-xl font-bold mb-2" style={{color:'#1e3a5f'}}>Merci pour votre témoignage !</h3>
              <p className="font-corps text-gray-500">Il sera publié après validation par notre équipe.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-8 shadow-sm rounded-sm">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                    Votre Nom <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={formulaire.nom}
                    onChange={e => setFormulaire(f => ({ ...f, nom: e.target.value }))}
                    placeholder="Nom complet"
                    className="champ"/>
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                    Votre Poste Actuel
                  </label>
                  <input type="text" value={formulaire.role}
                    onChange={e => setFormulaire(f => ({ ...f, role: e.target.value }))}
                    placeholder="Ex : Ambulancier à l'Hôpital de Dakar"
                    className="champ"/>
                </div>
              </div>

              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Formation Suivie
                </label>
                <input type="text" value={formulaire.formation}
                  onChange={e => setFormulaire(f => ({ ...f, formation: e.target.value }))}
                  placeholder="Ex : Ambulancier"
                  className="champ"/>
              </div>

              <div className="mb-5">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Votre Note
                </label>
                <div className="flex gap-2 items-center">
                  {[1,2,3,4,5].map(n => (
                    <button key={n}
                      onClick={() => setFormulaire(f => ({ ...f, note: n }))}
                      className="text-3xl transition-all hover:scale-110">
                      <span className={n <= formulaire.note ? 'text-amber-500' : 'text-gray-200'}>★</span>
                    </button>
                  ))}
                  <span className="font-mono text-sm text-gray-400 ml-2">{formulaire.note}/5</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-1.5 block">
                  Votre Témoignage <span className="text-red-500">*</span>
                </label>
                <textarea value={formulaire.contenu}
                  onChange={e => setFormulaire(f => ({ ...f, contenu: e.target.value }))}
                  rows={4}
                  placeholder="Partagez votre expérience à Institut Henok, ce que vous avez appris et comment cela a changé votre vie professionnelle..."
                  className="champ resize-none"/>
              </div>

              <button onClick={soumettre}
                disabled={chargement || !formulaire.nom || !formulaire.contenu}
                className={`btn-principal w-full rounded-sm ${
                  (chargement || !formulaire.nom || !formulaire.contenu) ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {chargement ? 'Envoi en cours...' : 'Soumettre mon témoignage →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
