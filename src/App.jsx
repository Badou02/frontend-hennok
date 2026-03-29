import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pied from './components/Pied';
import Accueil from './pages/Accueil';
import Formations from './pages/Formations';
import Inscription from './pages/Inscription';
import Temoignages from './pages/Temoignages';
import Contact from './pages/Contact';
import './styles/index.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"            element={<Accueil />} />
            <Route path="/formations"  element={<Formations />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/temoignages" element={<Temoignages />} />
            <Route path="/contact"     element={<Contact />} />
          </Routes>
        </main>
        <Pied />
      </div>
    </Router>
  );
}
