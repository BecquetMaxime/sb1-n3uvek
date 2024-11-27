import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Les Spas de Galamé</h1>
            <p className="text-xl md:text-2xl mb-8">Une expérience sensorielle unique</p>
            <Link 
              to="/rooms"
              className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition"
            >
              Découvrir nos chambres
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif italic mb-4">Une parenthèse enchantée</h2>
            <p className="text-gray-600">Découvrez nos espaces dédiés au bien-être et à la sensualité</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">L'Amazone</h3>
              <p className="text-gray-600">Plongez dans un univers tropical et sauvage, où la nature luxuriante éveille vos sens</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">L'Aphrodite</h3>
              <p className="text-gray-600">Laissez-vous tenter par une expérience sensuelle dans un cadre raffiné et mystérieux</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <img 
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Spa interior"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img 
          src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Relaxation area"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img 
          src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Massage room"
          className="w-full h-64 object-cover rounded-lg"
        />
        <img 
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Spa amenities"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}