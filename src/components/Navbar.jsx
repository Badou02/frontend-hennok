import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../img/logo.jpeg'

export default function Navbar() {
  const [defileVers, setDefileVers] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const emplacement = useLocation();

  useEffect(() => {
    const gererDefile = () => setDefileVers(window.scrollY > 30);
    window.addEventListener('scroll', gererDefile);
    return () => window.removeEventListener('scroll', gererDefile);
  }, []);

  useEffect(() => setMenuOuvert(false), [emplacement]);

  const liens = [
    { vers: '/',           etiquette: 'Accueil' },
    { vers: '/formations', etiquette: 'Formations' },
    { vers: '/temoignages', etiquette: 'Témoignages' },
    { vers: '/inscription', etiquette: 'Inscription' },
    { vers: '/contact',    etiquette: 'Contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#1e3a5f',
        backdropFilter: defileVers ? 'blur(8px)' : 'none',
        boxShadow: defileVers ? '0 4px 20px rgba(15,30,52,0.35)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
       <Link to="/" className="flex items-center gap-3 flex-shrink-0">
       <img src={logo} alt="Institut Henok" className="h-10 w-auto" />
       <span className="text-white font-bold">INSTITUT HENOK
        <span
      className="font-corps text-or-300 text-[9px] uppercase tracking-[0.2em] block"
      style={{ color: "#d4a017" }}>
      École de Formation Paramédicale
    </span>
       </span>
       
       </Link>   

        {/* Liens desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {liens.map(({ vers, etiquette }) => (
            <li key={vers}>
              <NavLink
                to={vers}
                end={vers === '/'}
                className={({ isActive }) =>
                  `lien-nav px-3 py-2 block rounded transition-colors ${
                    isActive
                      ? 'bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? '#d4a017' : undefined })}
              >
                {etiquette}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link to="/inscription" className="btn-or px-5 py-2 text-xs rounded-sm whitespace-nowrap">
            S'inscrire →
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 ml-2"
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label="Ouvrir le menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? 'opacity-0 w-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOuvert ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </nav>

      {/* Menu mobile */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
        menuOuvert ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`} style={{backgroundColor:'#162f50'}}>
        <ul className="px-6 py-4 flex flex-col gap-1">
          {liens.map(({ vers, etiquette }) => (
            <li key={vers}>
              <NavLink
                to={vers}
                end={vers === '/'}
                className={({ isActive }) =>
                  `font-corps font-semibold text-sm uppercase tracking-wider block py-2.5 px-3 rounded ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`
                }
                style={({ isActive }) => ({ color: isActive ? '#d4a017' : 'rgba(255,255,255,0.85)' })}
              >
                {etiquette}
              </NavLink>
            </li>
          ))}
          <li className="mt-3">
            <Link to="/inscription" className="btn-or w-full text-center block py-2.5 rounded-sm text-xs">
              S'inscrire maintenant →
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
