export interface Room {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  amenities: string[];
  theme: string;
}

export const rooms: Room[] = [
  {
    id: 'amazone',
    name: "L'Amazone",
    description: "Plongez dans un univers tropical et sauvage, où la nature luxuriante éveille vos sens",
    longDescription: "L'Amazone vous transporte dans un paradis tropical où la nature règne en maître. Cette suite luxueuse combine l'exotisme de la jungle avec le raffinement d'un spa haut de gamme. Les murs végétalisés, les matériaux naturels et l'ambiance tamisée créent une atmosphère unique propice à l'évasion.",
    price: 250,
    images: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    ],
    amenities: [
      "Jacuzzi privatif",
      "Douche à effet pluie tropicale",
      "Sauna infrarouge",
      "Lit king-size",
      "Système audio haute-fidélité",
      "Mini-bar garni",
      "Service en chambre 24/7"
    ],
    theme: "Jungle luxuriante et bien-être tropical"
  },
  {
    id: 'aphrodite',
    name: "L'Aphrodite",
    description: "Laissez-vous tenter par une expérience sensuelle dans un cadre raffiné et mystérieux",
    longDescription: "L'Aphrodite est un sanctuaire dédié au plaisir des sens. Cette suite sophistiquée allie élégance et sensualité dans un cadre intimiste. Les tons pourpres, le mobilier exclusif et l'éclairage travaillé créent une ambiance propice aux moments les plus intimes.",
    price: 250,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    ],
    amenities: [
      "Jacuzzi privatif avec chromothérapie",
      "Lit rond king-size",
      "Équipement BDSM haut de gamme",
      "Croix de Saint-André",
      "Système audio haute-fidélité",
      "Mini-bar premium",
      "Service en chambre discret 24/7"
    ],
    theme: "Sensualité et raffinement"
  }
];