import { Link } from 'react-router-dom';

const ICONES_CATEGORIE = {
  'Paramédical':   '🏥',
  'Cosmétologie':  '🧴',
  'Transformation': '🥫',
};

export default function CarteFormation({ formation, index = 0 }) {
  const icone = ICONES_CATEGORIE[formation.categorie] || '📚';
  const estParamedical = formation.categorie === 'Paramédical';
  const prixFormate = formation.prix?.toLocaleString('fr-FR');

  return (
    <div className="carte group flex flex-col rounded-sm overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}>
      
      {/* Bandeau couleur en haut */}
      <div className="h-1.5"
        style={{backgroundColor: estParamedical ? '#1e3a5f' : '#d97706'}}/>

      <div className="p-5 flex flex-col flex-1">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-12 h-12 flex items-center justify-center text-2xl rounded-sm flex-shrink-0 ${
            estParamedical ? 'bg-blue-50 border border-blue-100' : 'bg-amber-50 border border-amber-100'
          }`}>
            {icone}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
              estParamedical ? 'badge-paramedical' : 'badge-cosmetologie'
            }`}>
              {formation.categorie}
            </span>
            {formation.vedette && (
              <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5"
                style={{backgroundColor:'rgba(212,160,23,0.15)', color:'#a16207', border:'1px solid rgba(212,160,23,0.3)'}}>
                ★ Vedette
              </span>
            )}
          </div>
        </div>

        {/* Titre */}
        <h3 className="font-titre text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors leading-tight"
          style={{color:'#1e3a5f'}}>
          {formation.titre}
        </h3>

        {/* Description */}
        <p className="font-corps text-sm text-gray-500 leading-relaxed flex-1 mb-4">
          {formation.description.length > 120
            ? formation.description.slice(0, 120) + '...'
            : formation.description}
        </p>

        {/* Tags */}
        {formation.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {formation.tags.slice(0, 3).map(tag => (
              <span key={tag} className="font-mono text-[9px] uppercase tracking-wide bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Méta */}
        <div className="text-sm font-corps text-gray-500 mb-4 pt-3 border-t border-gray-100 space-y-1">

  <div className="flex justify-between">
    <span>⏱ Durée</span>
    <span className="font-semibold">{formation.duree}</span>
  </div>

  <div className="flex justify-between">
    <span>📝 Inscription</span>
    <span className="font-semibold">
      {formation.inscription?.toLocaleString('fr-FR')} FCFA
    </span>
  </div>

  <div className="flex justify-between">
    <span>📅 Mensualité</span>
    <span className="font-semibold">
      {formation.mensualite?.toLocaleString('fr-FR')} FCFA
    </span>
  </div>

  <div className="flex justify-between text-orange-600 font-bold">
    <span>💰 Prix total</span>
    <span>
      {formation.prix?.toLocaleString('fr-FR')} FCFA
    </span>
  </div>

</div>
        {/* Prix + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-titre text-xl font-bold" style={{color:'#e8600a'}}>
              {prixFormate}
            </span>
            <span className="font-corps text-xs text-gray-400 ml-1">FCFA</span>
          </div>
         <Link
  to={`/inscription?formation=${encodeURIComponent(formation.titre)}`}
  className="btn-principal py-2 px-4 text-xs rounded-sm"
>
  S'inscrire →
</Link>
        </div>
      </div>
    </div>
  );
}
