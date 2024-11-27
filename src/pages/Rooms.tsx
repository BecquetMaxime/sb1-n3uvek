import React from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { ArrowRight } from 'lucide-react';

export default function Rooms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif italic text-center mb-12">Nos Chambres d'Exception</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-80">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-serif italic mb-2">{room.name}</h2>
                <p className="mb-4">{room.description}</p>
                <p className="text-xl font-semibold mb-4">{room.price}€ / nuit</p>
                <Link
                  to={`/room/${room.id}`}
                  className="inline-flex items-center space-x-2 bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition"
                >
                  <span>Découvrir</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}