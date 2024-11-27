import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-serif italic">Les Spas de Galamé</span>
            </div>
            <p className="text-gray-400">
              Une expérience unique de bien-être et de sensualité
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-rose-500" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-rose-500" />
                <span>contact@spas-galame.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>123 rue du Spa, 75001 Paris</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rooms" className="hover:text-rose-400 transition">
                  Nos Chambres
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-rose-400 transition">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-rose-400 transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2">
              <li>Lundi - Vendredi: 10h - 23h</li>
              <li>Samedi: 10h - 00h</li>
              <li>Dimanche: 12h - 22h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Les Spas de Galamé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}