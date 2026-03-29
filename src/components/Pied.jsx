import { Link } from 'react-router-dom';
import logo from '../img/logo.jpeg'

export default function Pied() {
  const annee = new Date().getFullYear();

  return (
    <footer className="fond-pattern text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Marque */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
                 <Link to="/" className="flex items-center gap-3 flex-shrink-0">
                   <img src={logo} alt="Institut Henok" className="h-10 w-auto" />  
                   </Link>   
            <div>
              <span className="font-titre font-bold text-white text-xl block leading-tight">INSTITUT HENOK</span>
              <span className="font-corps text-xs uppercase tracking-wider block" style={{color:'#d4a017'}}>
                École de Formation Paramédicale
              </span>
            </div>
          </div>
          <p className="font-corps text-gray-400 text-sm leading-relaxed max-w-sm mb-5">
            Institut Henok — Plus fort, plus haut, plus performant. 
            Formation professionnelle agréée par le Ministère de l'Emploi et de la Formation 
            Professionnelle et Technique du Sénégal.
          </p>
          <div className="flex gap-3">
            {[
              { l: 'F', c: 'Facebook' },
              { l: 'WA', c: 'WhatsApp' },
              { l: 'YT', c: 'YouTube' }
            ].map(({ l, c }) => (
              <a key={c} href="#" aria-label={c}
                className="w-9 h-9 border border-white/20 flex items-center justify-center
                           text-gray-400 transition-colors duration-200 font-mono text-xs rounded-sm hover:text-yellow-400"
                style={{}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#d4a017'; e.currentTarget.style.color='#d4a017'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='#9ca3af'; }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="etiquette-section mb-4" style={{color:'#d4a017'}}>Navigation</p>
          <ul className="flex flex-col gap-2">
            {[
              ['/', 'Accueil'],
              ['/formations', 'Nos Formations'],
              ['/temoignages', 'Témoignages'],
              ['/inscription', 'S\'inscrire'],
              ['/contact', 'Nous Contacter'],
            ].map(([vers, etiquette]) => (
              <li key={vers}>
                <Link to={vers} className="font-corps text-sm text-gray-400 transition-colors flex items-center gap-2 group"
                  onMouseEnter={e => e.currentTarget.style.color='#d4a017'}
                  onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                    style={{backgroundColor:'rgba(212,160,23,0.4)'}}/>
                  {etiquette}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations de contact */}
        <div>
          <p className="etiquette-section mb-4" style={{color:'#d4a017'}}>Contact</p>
          <ul className="flex flex-col gap-3 text-sm text-gray-400 font-corps">
            <li className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">📍</span>
              <span>Cité des Fonctionnaires, Villa N° 178<br />En face Villa Américaine<br />Diamniadio, Sénégal</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-lg flex-shrink-0">📞</span>
              <div className="flex flex-col gap-0.5">
                <a href="tel:+221785720734" className="transition-colors hover:text-yellow-400">+221 78 720 73 44</a>
                <a href="tel:+221775314944" className="transition-colors hover:text-yellow-400">+221 77 531 49 44</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-lg flex-shrink-0">📱</span>
              <div className="flex flex-col gap-0.5">
                <a href="tel:+221775529997" className="transition-colors hover:text-yellow-400">77 552 99 97</a>
                <a href="tel:+221766658918" className="transition-colors hover:text-yellow-400">76 658 91 58</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Slogan */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-titre text-sm" style={{color:'#d4a017'}}>
            « L'Institut Henok : Plus Fort, Plus Haut, Plus Performant »
          </p>
          <p className="font-corps text-xs text-gray-600">
            © {annee} Institut Henok. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
