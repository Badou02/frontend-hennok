import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarteFormation from '../components/CarteFormation';
import CarteTemoignage from '../components/CarteTemoignage';
import { formationAPI, temoignageAPI } from '../utils/api';

const FORMATIONS_MOCK = [
  { _id: '1', titre: 'Ambulancier', categorie: 'Paramédical', description: 'Formation complète aux techniques de secourisme, transport médicalisé et prise en charge des patients en situation d\'urgence. Obtenez votre diplôme reconnu par le Ministère de l\'Emploi et de la Formation Professionnelle.', duree: '6 mois',inscription: 25000,mensualite: 50000,prix: 425000, tags: ['Secourisme', 'Urgences', 'Transport médical'], vedette: true },
  { _id: '5', titre: 'Délégué Médical', categorie: 'Paramédical', description: '', duree: '8 mois',  prix: 425000,   tags: ['Savon', 'Artisanat', 'Cosmétique'], vedette: true },
  { _id: '5', titre: 'Saponification à Chaud et à Froid', categorie: 'Cosmétologie', description: 'Apprenez les deux méthodes de fabrication artisanale du savon : à chaud et à froid. Devenez un expert de la saponification professionnelle.', duree: '2 mois', prix: 85000, formateur: 'Mme. Rokhaya Fall', places: 20, inscrits: 16, tags: ['Savon', 'Artisanat', 'Cosmétique'], vedette: true },
];
const TEMOIGNAGES_MOCK = [
  { _id: '1', nom: 'Aminata Diallo', role: 'Ambulancière, Hôpital de Diamniadio', formation: 'Ambulancier', note: 5, contenu: 'L\'Institut Henok a transformé ma vie. Les formateurs sont exceptionnels et la formation est très pratique. J\'ai trouvé un emploi à l\'hôpital deux mois après l\'obtention de mon diplôme !', approuve: true },
  { _id: '3', nom: 'Fatimata Koné', role: 'Agente de Santé Communautaire', formation: 'Agent de Santé Communautaire', note: 5, contenu: 'Grâce à Institut Henok, je contribue maintenant à la santé de ma communauté. La formation couvre exactement ce dont nous avons besoin sur le terrain. Je recommande vivement !', approuve: true },
  { _id: '4', nom: 'Seydou Bah', role: 'Entrepreneur en cosmétique', formation: 'Saponification', note: 5, contenu: 'La formation en saponification m\'a permis de lancer ma propre entreprise de savons artisanaux. Aujourd\'hui je vends mes produits dans tout Dakar. Merci Institut Henok !', approuve: true },
];

const AVANTAGES = [ 
  { icone: '🏛️', titre: 'Formation Agréée', description: 'Dossier d\'ouverture approuvé par le Ministère de l\'Emploi et de la Formation Professionnelle et Technique du Sénégal.' },
  { icone: '🩺', titre: 'Apprentissage Pratique', description: 'Chaque formation inclut des stages pratiques et des simulations cliniques pour vous préparer aux réalités du terrain.' },
  { icone: '💼', titre: 'Insertion Professionnelle', description: 'Notre réseau de partenaires hospitaliers et de santé vous aide à trouver un emploi rapidement après l\'obtention de votre diplôme.' },
  { icone: '👥', titre: 'Suivi Personnalisé', description: 'Des classes à effectif réduit pour un suivi individualisé et une pédagogie adaptée au rythme de chaque apprenant.' },
];
 
const CATEGORIES_FORMATION = [
  { icone: '🏥', titre: 'Formations Paramédicales', description: 'Ambulancier, Brancardier, Agent de Santé Communautaire, Technicien de Surface', couleur: '#1e3a5f' },
  { icone: '🧴', titre: 'Formations en Cosmétologie', description: 'Saponification, Savons, Crèmes Capillaires, Gels Douche, Shampoings', couleur: '#d97706' },
  { icone: '🍍', titre: 'Formations en Transformation fruits et Légumes', description: "Apprenez à valoriser les produits agricoles locaux grâce aux techniques modernes de transformation des fruits et légumes. ", couleur: '#d97706' },

];

export default function Accueil() {
  const [formations, setFormations] = useState(FORMATIONS_MOCK);
  const [temoignages, setTemoignages] = useState(TEMOIGNAGES_MOCK);

  useEffect(() => {
    formationAPI.obtenirVedettes()
      .then(r => r.data?.donnees?.length && setFormations(r.data.donnees))
      .catch(() => {});
    temoignageAPI.obtenirTous()
      .then(r => r.data?.donnees?.length && setTemoignages(r.data.donnees.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="entree-page">

      {/* ══ HÉROS ══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden fond-pattern pt-16">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Grand cercle or */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-yellow-500/10"
            style={{borderColor:'rgba(212,160,23,0.1)'}}/>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-yellow-500/15"
            style={{borderColor:'rgba(212,160,23,0.15)'}}/>
          {/* Lignes diagonales */}
          <div className="absolute bottom-0 left-0 right-0 h-1 opacity-30"
            style={{background:'linear-gradient(90deg, transparent, #d4a017, transparent)'}}/>
          {/* Points décoratifs */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full opacity-30"
              style={{backgroundColor:'#d4a017', top:`${15 + i * 14}%`, right:`${8 + i * 4}%`}}/>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte gauche */}
          <div>
            {/* Badge ministère */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-6 border"
              style={{backgroundColor:'rgba(212,160,23,0.1)', borderColor:'rgba(212,160,23,0.25)'}}>
              <span className="text-sm">🏛️</span>
              <span className="font-corps text-xs uppercase tracking-widest"
                style={{color:'#d4a017'}}>
                Agréé – Ministère MFPT du Sénégal
              </span>
            </div>

            <h1 className="font-titre text-4xl md:text-6xl font-bold text-white leading-[1.08] mb-6">
              Votre Avenir<br />
              <span className="texte-or">Commence Ici</span>
            </h1>

            <p className="font-corps text-lg text-gray-300 leading-relaxed max-w-lg mb-4">
              Institut Henok est l'école de référence pour les formations paramédicales 
              et cosmétologiques à Diamniadio. Rejoignez nos apprenants et accédez 
              à des carrières porteuses.
            </p>

            {/* Slogan */}
            <p className="font-titre text-sm mb-8" style={{color:'#d4a017'}}>
              « Plus Fort, Plus Haut, Plus Performant »
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/formations" className="btn-or px-7 py-3 rounded-sm">
                Voir les Formations →
              </Link>
              <Link to="/inscription" className="btn-secondaire px-7 py-3 rounded-sm">
                S'inscrire Maintenant
              </Link>
            </div>

           
          </div> 

          {/* Carte droite */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 p-8 rounded-sm shadow-2xl border border-white/10"
              style={{backgroundColor:'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)'}}>
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <span className="text-3xl">📋</span>
                <div>
                  <p className="font-titre text-white font-bold">Prochaine Rentrée</p>
                  <p className="font-corps text-xs" style={{color:'#d4a017'}}>Places Limitées — Inscrivez-vous Vite !</p>
                </div>
              </div>

              

              {/* Catégories */}
              {CATEGORIES_FORMATION.map(cat => (
                <div key={cat.titre} className="mb-4 p-4 rounded-sm border border-white/10"
                  style={{backgroundColor:'rgba(255,255,255,0.03)'}}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{cat.icone}</span>
                    <span className="font-titre text-white text-sm font-bold">{cat.titre}</span>
                  </div>
                  <p className="font-corps text-xs text-gray-400">{cat.description}</p>
                </div>
              ))}

              <div className="mt-2 text-center">
                <p className="font-corps text-xs text-gray-400 mb-3">Adresse : Diamniadio, Cité des Fonctionnaires, Villa N° 178</p>
                <Link to="/contact" className="btn-or w-full block text-center py-3 rounded-sm text-sm">
                  Prendre Rendez-vous →
                </Link>
              </div>
            </div>
            {/* Ombre décorative */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-sm border border-yellow-500/30 z-0"
              style={{borderColor:'rgba(212,160,23,0.25)'}}/>
          </div>
        </div>

        
      </section>

      {/* À propos */}

<div className="mt-10 pt-8 border-t border-white/10 ">
  
  <div className="p-6 rounded-sm border border-white/10 shadow-lg"
       style={{backgroundColor:'rgba(255,255,255,0.05)', backdropFilter:'blur(6px)'}}>

    <h3 className="font-titre text-2xl font-bold mb-4 flex items-center gap-2"
        style={{color:'#d4a017'}}>
      <span className="text-2xl">🏫</span>
      À propos de l’Institut Henok
    </h3>

    <p className="font-corps font-bold text-lg leading-relaxed text-gray-300 mb-4  " style={{color:'#011247'}}>
      L’Institut Henok est un établissement de formation professionnelle situé à Diamniadio,
      spécialisé dans les métiers paramédicaux,cosmétologiques et la transformation des produits agricoles. Notre mission est de former
      des professionnels compétents capables de répondre aux besoins du marché du travail et
      de contribuer au développement du secteur de la santé et de la beauté au Sénégal.
    </p>

    <p className="font-corps font-bold  text-lg leading-relaxed text-gray-300 mb-6" style={{color:'#011247'}}>
      Grâce à une pédagogie basée sur la pratique, des formateurs expérimentés et un
      accompagnement personnalisé, nous aidons chaque apprenant à développer ses compétences
      et à construire une carrière solide.
    </p>

    {/* Points forts */}
    <div className="grid grid-cols-3 gap-4 text-center">
      
      <div>
        <div className="text-xl mb-1">🎓</div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">Formation Certifiée</p>
      </div>

      <div>
        <div className="text-xl mb-1">🏥</div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">Apprentissage Pratique</p>
      </div>

      <div>
        <div className="text-xl mb-1">💼</div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">Insertion Professionnelle</p>
      </div>

    </div>

  </div>

</div>
      {/* ══ NOS DOMAINES ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="etiquette-section mb-3">Nos Domaines d'Excellence</p>
            <h2 className="titre-section">Trois Filières,<br/>Un Seul Engagement : Votre Réussite</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Paramédical */}
            <div className="relative overflow-hidden rounded-sm p-8 text-white fond-pattern shadow-xl">
              <div className="relative z-10">
                <div className="text-5xl mb-4">🏥</div>
                <h3 className="font-titre text-2xl font-bold mb-3">Formation Paramédicale</h3>
                <p className="font-corps text-gray-300 mb-5 leading-relaxed">
                  Préparez-vous à intégrer le secteur de la santé avec des formations 
                  reconnues par le Ministère : Ambulancier, Brancardier,Délégué médical,Vendeur en pharmacie , Agent de Santé 
                  Communautaire et Technicien de Surface Hospitalier.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Ambulancier','Délégué Médical', 'Brancardier', 'Agent de Santé Communautaire', 'Technicien de Surface Hospitalier','Vendeur en pharmacie'].map(f => (
                    <li key={f} className="flex items-center gap-2 font-corps text-sm text-gray-300">
                      <span className="text-lg" style={{color:"#22c55e"}}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/formations" className="btn-or inline-block py-2.5 px-5 rounded-sm text-sm">
                  Voir les formations →
                </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 text-9xl opacity-5">🏥</div>
            </div>

            {/* Cosmétologie */}
            <div className="relative overflow-hidden rounded-sm p-8 shadow-xl border border-amber-100"
              style={{background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}}>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🧴</div>
                <h3 className="font-titre text-2xl font-bold mb-3" style={{color:'#1e3a5f'}}>Formation Cosmétologique</h3>
                <p className="font-corps text-gray-600 mb-5 leading-relaxed">
                  Maîtrisez la fabrication artisanale et professionnelle de produits cosmétiques : 
                  savons, crèmes. Créez votre propre entreprise ou intégrez 
                  l'industrie de la beauté.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Saponification à Chaud et à Froid', 'Savon Liquide & en Poudre', 'Savon de Toilette & Ordinaire'].map(f => (
                    <li key={f} className="flex items-center gap-2 font-corps text-sm text-gray-600">
                      <span className="text-lg" style={{color:"#d97706"}}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/formations" className="btn-principal inline-block py-2.5 px-5 rounded-sm text-sm">
                  Voir les formations →
                </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 text-9xl opacity-5">🧴</div>
            </div>
            
             {/*Transformation fruits et légumes*/}
           <div className="relative overflow-hidden rounded-sm p-8 shadow-xl border border-amber-100"
              style={{background:'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'}}>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🍍🥫</div>
                <h3 className="font-titre text-2xl font-bold mb-3" style={{color:'#1e3a5f'}}>Transformation des fruits et légumes,</h3>
                <p className="font-corps text-gray-600 mb-5 leading-relaxed">
                 Cette formation vous permet de maîtriser la production de jus naturels.
                 Idéale pour les entrepreneurs, elle offre des compétences pratiques pour lancer
                 une activité rentable dans l’agroalimentaire ou intégrer une unité de production.
                </p>
                <ul className="space-y-2 mb-6">
                  {['confitures', 'sirops', 'Bissap', 'gingembre '].map(f => (
                    <li key={f} className="flex items-center gap-2 font-corps text-sm text-gray-600">
                      <span className="text-lg" style={{color:"#d97706"}}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/formations" className="btn-principal inline-block py-2.5 px-5 rounded-sm text-sm">
                  Voir les formations →
                </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 text-9xl opacity-5">🧴</div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ FORMATIONS EN VEDETTE ══ */}
      <section className="py-20" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="etiquette-section mb-3">
                <span className="ligne-or"/>
                Formations Populaires
              </p>
              <h2 className="titre-section">Nos Programmes<br/>les Plus Demandés</h2>
            </div>
            <Link to="/formations" className="btn-contour self-start rounded-sm">
              Toutes les formations →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {formations.slice(0, 3).map((f, i) => (
              <CarteFormation key={f._id} formation={f} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POURQUOI CHOISIR HENOK ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="etiquette-section mb-3">Pourquoi Nous Choisir</p>
            <h2 className="titre-section">L'Excellence au Service<br/>de Votre Avenir</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {AVANTAGES.map(item => (
              <div key={item.titre}
                className="p-6 border border-gray-100 hover:border-yellow-300 transition-colors group rounded-sm shadow-sm hover:shadow-md">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icone}</div>
                <h3 className="font-titre font-bold text-lg mb-2" style={{color:'#1e3a5f'}}>{item.titre}</h3>
                <p className="font-corps text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TÉMOIGNAGES ══ */}
      <section className="py-20" style={{backgroundColor:'#f8f7f4'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="etiquette-section mb-3">
                <span className="ligne-or"/>
                Ce Que Disent Nos Apprenants
              </p>
              <h2 className="titre-section">Des Succès<br/>Qui Parlent d'Eux-Mêmes</h2>
            </div>
            <Link to="/temoignages" className="btn-contour self-start rounded-sm">
              Tous les témoignages →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {temoignages.slice(0, 3).map((t, i) => (
              <CarteTemoignage key={t._id} temoignage={t} index={i}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BANDEAU CTA ══ */}
      <section className="py-16 fond-pattern relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{background:'linear-gradient(90deg, transparent, #d4a017, transparent)'}}/>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{color:'#d4a017'}}>
            Prêt à Commencer ?
          </p>
          <h2 className="font-titre text-4xl md:text-5xl font-bold text-white mb-5">
            Votre transformation professionnelle commence par une inscription.
          </h2>
          <p className="font-corps text-gray-300 mb-8 text-lg">
            Rejoignez la prochaine promotion et bénéficiez d'un accompagnement personnalisé.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/inscription" className="btn-or px-8 py-3.5 rounded-sm">
              S'inscrire Maintenant →
            </Link>
            <Link to="/contact" className="btn-secondaire px-8 py-3.5 rounded-sm">
              Nous Contacter
            </Link>
          </div>
          {/* Coordonnées rapides */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-corps text-gray-400">
            <span className="flex items-center gap-2">
              <span>📍</span> Diamniadio, Cité des Fonctionnaires, Villa N° 178
            </span>
            <span className="flex items-center gap-2">
              <span>📞</span> +221 78 720 73 44 / 77 531 49 44
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
