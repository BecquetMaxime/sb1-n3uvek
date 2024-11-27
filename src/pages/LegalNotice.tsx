import React from 'react';
import { Scale } from 'lucide-react';

export default function LegalNotice() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <Scale className="w-12 h-12 text-rose-500" />
        </div>
        
        <h1 className="text-4xl font-serif italic text-center mb-12">Mentions Légales</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif italic mb-4">1. Informations légales</h2>
            <p className="text-gray-600">
              Les Spas de Galamé est une société à responsabilité limitée (SARL) au capital de 50 000€,
              immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
            </p>
            <p className="text-gray-600 mt-2">
              Siège social : 123 rue du Spa, 75001 Paris, France<br />
              Numéro de TVA intracommunautaire : FR 12 345 678 901<br />
              Téléphone : 01 23 45 67 89<br />
              Email : contact@spas-galame.fr
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">2. Hébergement</h2>
            <p className="text-gray-600">
              Ce site est hébergé par OVH SAS<br />
              2 rue Kellermann<br />
              59100 Roubaix<br />
              France
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">3. Propriété intellectuelle</h2>
            <p className="text-gray-600">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour
              les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">4. Protection des données personnelles</h2>
            <p className="text-gray-600">
              Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement
              Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification,
              de suppression et d'opposition aux données personnelles vous concernant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">5. Cookies</h2>
            <p className="text-gray-600">
              Ce site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer
              sur ce site, vous acceptez leur utilisation. Vous pouvez désactiver les cookies dans les
              paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">6. Limitation de responsabilité</h2>
            <p className="text-gray-600">
              Les Spas de Galamé ne pourra être tenue responsable des dommages directs et indirects causés
              au matériel de l'utilisateur, lors de l'accès au site, et résultant de l'utilisation d'un
              matériel ne répondant pas aux spécifications techniques requises.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}