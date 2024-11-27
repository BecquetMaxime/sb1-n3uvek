import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { rooms } from '../data/rooms';
import { ArrowLeft, Check } from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return navigate('/rooms');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/rooms"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux chambres</span>
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <h1 className="text-4xl font-serif italic mb-4">{room.name}</h1>
            <p className="text-gray-600 mb-6">{room.longDescription}</p>
            
            <div className="mb-8">
              <h2 className="text-2xl font-serif italic mb-4">Équipements</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-rose-500" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-serif italic mb-4">Tarif</h2>
              <p className="text-3xl font-semibold">{room.price}€ <span className="text-lg text-gray-600">/ nuit</span></p>
            </div>

            <Link
              to={`/booking/${room.id}`}
              className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition"
            >
              Réserver maintenant
            </Link>
          </div>

          <div className="space-y-4">
            {room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${room.name} - Vue ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}