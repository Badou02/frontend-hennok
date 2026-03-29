import { useState, useEffect } from 'react';
import CarteFormation from '../components/CarteFormation';
import { formationAPI } from '../utils/api';

const TOUTES_FORMATIONS = [
  { _id: '1', titre: 'Ambulancier', categorie: 'Paramédical', description: 'Formation complète aux techniques de secourisme, transport médicalisé et prise en charge des patients en situation d\'urgence. Obtenez votre diplôme reconnu par le Ministère de l\'Emploi et de la Formation Professionnelle.', duree: '6 mois',inscription: 25000,mensualite: 50000,prix: 425000, tags: ['Secourisme', 'Urgences', 'Transport médical'], vedette: true },
  { _id: '2', titre: 'Brancardier', categorie: 'Paramédical', description: 'Apprenez les techniques de manutention sécurisée des patients, le déplacement en milieu hospitalier et la coordination avec les équipes soignantes. Formation certifiée et reconnue nationalement.', duree: '6 mois',inscription: 25000,mensualite: 50000,prix: 425000, tags: ['Hôpital', 'Manutention', 'Soins'], vedette: true },
  { _id: '3', titre: 'Agent de Santé Communautaire', categorie: 'Paramédical', description: 'Formez-vous à la promotion de la santé publique, à la prévention des maladies et à l\'éducation sanitaire au sein des communautés. Un rôle essentiel pour le développement de la santé en Afrique.', duree: '6 mois',inscription: 25000,mensualite: 50000,prix: 425000, tags: ['Santé publique', 'Prévention', 'Communauté'], vedette: true },
  { _id: '4', titre: 'Technicien de Surface en Milieu Hospitalier', categorie: 'Paramédical', description: 'Maîtrisez les protocoles de nettoyage et de désinfection en milieu hospitalier, la gestion des déchets biomédicaux et les normes d\'hygiène strictes du secteur de la santé.', duree: '6 mois',inscription: 25000,mensualite: 50000,prix: 425000, tags: ['Hygiène', 'Désinfection', 'Hôpital'], vedette: false },
  { _id: '5', titre: 'Délégué Médical', categorie: 'Paramédical', description: '', duree: '8 mois',  prix: 425000,   tags: ['Savon', 'Artisanat', 'Cosmétique'], vedette: true },
  { _id: '6', titre: 'Vendeur en Pharmacie', categorie: 'Paramédical', description: '', duree: '8 mois',  prix: 425000,   tags: ['Savon', 'Artisanat', 'Cosmétique'], vedette: true },
  { _id: '7', titre: 'Transformation des fruits et légumes', categorie: 'Transformation', description: "Formation pratique en transformation des fruits et légumes : jus, confitures, séchage et conservation. Apprenez à créer des produits agroalimentaires de qualité et à lancer votre propre activité rentable.", duree: 'Une semaine ',inscription: "",mensualite: "",prix: 75000, tags: ['Fruits', 'légumes', 'Transformation'], vedette: false },
];

const CATEGORIES = ['Toutes', 'Paramédical', 'Cosmétologie', 'Transformation'];

export default function Formations() {
  const [formations, setFormations] = useState(TOUTES_FORMATIONS);
  const [filtrees, setFiltrees] = useState(TOUTES_FORMATIONS);
  const [categorie, setCategorie] = useState('Toutes');
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    formationAPI.obtenirToutes()
      .then(r => r.data?.donnees?.length && setFormations(r.data.donnees))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let res = formations;
    if (categorie !== 'Toutes') res = res.filter(f => f.categorie === categorie);
    if (recherche) res = res.filter(f =>
      f.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      f.description.toLowerCase().includes(recherche.toLowerCase()) ||
      f.tags?.some(t => t.toLowerCase().includes(recherche.toLowerCase()))
    );
    setFiltrees(res);
  }, [formations, categorie, recherche]);

  const paramedicals = filtrees.filter(f => f.categorie === 'Paramédical');
  const cosmetologies = filtrees.filter(f => f.categorie === 'Cosmétologie');
  const Transformation = filtrees.filter(f => f.categorie === 'Transformation');

  return (
    <div className="entree-page min-h-screen bg-white pt-16">
      {/* En-tête */}
      <div className="fond-pattern py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 border border-yellow-500/10 rotate-45 translate-x-20 -translate-y-20"
          style={{borderColor:'rgba(212,160,23,0.1)'}}/>
        <div className="max-w-7xl mx-auto px-6">
          <p className="etiquette-section mb-3" style={{color:'#d4a017'}}>
            <span className="inline-block w-8 h-0.5 mr-3 align-middle" style={{backgroundColor:'#d4a017'}}/>
            Catalogue des Formations
          </p>
          <h1 className="font-titre text-5xl font-bold text-white mb-4">Nos Formations</h1>
          <p className="font-corps text-gray-400 max-w-xl text-base leading-relaxed">
            Trois domaines d'excellence reconnus par l'État sénégalais : le paramédical 
            ,la Saponification et la transformation agroalimentaire. Choisissez la formation qui correspond à votre ambition.
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-4">
          {/* Recherche */}
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              className="champ pl-9 py-2.5 text-sm"
            />
          </div>
          {/* Catégories */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategorie(cat)}
                className={`font-corps text-xs font-semibold uppercase tracking-wide px-4 py-2 border transition-all rounded-sm ${
                  categorie === cat
                    ? 'text-white'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
                style={categorie === cat ? {
                  backgroundColor: cat === 'Paramédical' ? '#1e3a5f' : cat === 'Cosmétologie' ? '#d97706' : '#1e3a5f',
                  borderColor: cat === 'Paramédical' ? '#1e3a5f' : cat === 'Cosmétologie' ? '#d97706' : '#1e3a5f'
                } : {}}>
                {cat === 'Paramédical' ? '🏥 ' : cat === 'Cosmétologie' ? '🧴 ' : ''}{cat}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-gray-400 ml-auto">
            {filtrees.length} formation{filtrees.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtrees.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-titre text-2xl font-bold mb-2" style={{color:'#1e3a5f'}}>Aucune formation trouvée</h3>
            <p className="font-corps text-gray-500 mb-6">Essayez d'autres mots-clés ou réinitialisez les filtres.</p>
            <button onClick={() => { setCategorie('Toutes'); setRecherche(''); }}
              className="btn-contour rounded-sm">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            {/* Section Paramédicale */}
            {paramedicals.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-3xl">🏥</span>
                  <div>
                    <h2 className="font-titre text-2xl font-bold" style={{color:'#1e3a5f'}}>Formations Paramédicales</h2>
                    <p className="font-corps text-sm text-gray-500">Agréées par le Ministère de l'Emploi et de la Formation Professionnelle et Technique</p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <span className="font-mono text-xs px-3 py-1 rounded-sm"
                      style={{backgroundColor:'rgba(30,58,95,0.08)', color:'#1e3a5f', border:'1px solid rgba(30,58,95,0.2)'}}>
                      {paramedicals.length} formation{paramedicals.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {paramedicals.map((f, i) => (
                    <CarteFormation key={f._id} formation={f} index={i}/>
                  ))}
                </div>
              </div>
            )}

            {/* Section Cosmétologie
            {cosmetologies.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-3xl">🧴</span>
                  <div>
                    <h2 className="font-titre text-2xl font-bold" style={{color:'#92400e'}}>Formations en Cosmétologie</h2>
                    <p className="font-corps text-sm text-gray-500">Savons, crèmes, shampooings et produits d'hygiène artisanaux</p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <span className="font-mono text-xs px-3 py-1 rounded-sm"
                      style={{backgroundColor:'rgba(217,119,6,0.08)', color:'#92400e', border:'1px solid rgba(217,119,6,0.2)'}}>
                      {cosmetologies.length} formation{cosmetologies.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {cosmetologies.map((f, i) => (
                    <CarteFormation key={f._id} formation={f} index={i}/>
                  ))}
                </div>
              </div>
            )} */}
            {/* Section Transformation */}
            {Transformation.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-3xl">🍍🥫</span>
                  <div>
                    <h2 className="font-titre text-2xl font-bold" style={{color:'#1e3a5f'}}>Transformation fruits et Légumes </h2>
                    <p className="font-corps text-sm text-gray-500">Fruits et légumes </p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <span className="font-mono text-xs px-3 py-1 rounded-sm"
                      style={{backgroundColor:'rgba(36, 201, 77, 0.08)', color:'#31920e', border:'1px solid rgba(6, 217, 24, 0.2)'}}>
                      {Transformation.length} formation{Transformation.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Transformation.map((f, i) => (
                    <CarteFormation key={f._id} formation={f} index={i}/>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        
      </div>

      {/* Bandeau agrément */}
      <div className="border-t border-gray-200 py-10" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="text-5xl flex-shrink-0">🏛️</div>
          <div>
            <h3 className="font-titre text-xl font-bold mb-1" style={{color:'#1e3a5f'}}>Formation Agréée par l'État</h3>
            <p className="font-corps text-sm text-gray-500 leading-relaxed">
              Institut Henok est agréé par le <strong>Ministère de l'Emploi et de la Formation Professionnelle et Technique</strong> du Sénégal. 
              Inspection de l'Éducation et de la Formation (IEF) de Diamniadio. 
              Nos diplômes sont reconnus sur le marché du travail sénégalais et de la sous-région.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
