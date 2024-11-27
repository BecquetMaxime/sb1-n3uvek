import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-rose-500" />
            <span className="text-xl font-serif italic">Les Spas de Galamé</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-rose-400 transition">Accueil</Link>
            <Link to="/rooms" className="hover:text-rose-400 transition">Nos Chambres</Link>
            <Link to="/contact" className="hover:text-rose-400 transition">Contact</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-rose-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-rose-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/rooms"
              className="block px-3 py-2 rounded-md hover:bg-rose-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Nos Chambres
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md hover:bg-rose-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}