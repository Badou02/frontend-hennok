const COULEURS = [
  '#1e3a5f', '#e8600a', '#22c55e', '#7c3aed', '#0891b2'
];

export default function CarteTemoignage({ temoignage, index = 0 }) {
  const couleur = COULEURS[index % COULEURS.length];
  const initiales = temoignage.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="carte p-6 flex flex-col gap-4 rounded-sm">
      {/* Étoiles */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < temoignage.note ? 'text-amber-500' : 'text-gray-200'}`}>
            ★
          </span>
        ))}
        <span className="font-mono text-xs text-gray-400 ml-2 self-center">{temoignage.note}/5</span>
      </div>

      {/* Citation */}
      <div className="relative">
        <span className="absolute -top-3 -left-1 font-titre text-7xl leading-none select-none"
          style={{color:'rgba(212,160,23,0.15)'}}>
          "
        </span>
        <p className="font-corps text-sm text-gray-600 leading-relaxed pt-5 relative z-10 italic">
          {temoignage.contenu}
        </p>
      </div>

      {/* Badge formation */}
      {temoignage.formation && (
        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 self-start rounded-sm"
          style={{backgroundColor:'rgba(212,160,23,0.1)', color:'#92400e', border:'1px solid rgba(212,160,23,0.25)'}}>
          {temoignage.formation}
        </span>
      )}

      {/* Auteur */}
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{backgroundColor: couleur}}>
          <span className="font-titre font-bold text-white text-sm">{initiales}</span>
        </div>
        <div>
          <p className="font-corps font-bold text-gray-900 text-sm">{temoignage.nom}</p>
          {temoignage.role && (
            <p className="font-mono text-xs text-gray-400">{temoignage.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}
