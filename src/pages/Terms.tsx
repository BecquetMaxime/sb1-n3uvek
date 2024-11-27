import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <Scale className="w-12 h-12 text-rose-500" />
        </div>
        
        <h1 className="text-4xl font-serif italic text-center mb-12">Conditions Générales de Vente</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif italic mb-4">1. Objet</h2>
            <p className="text-gray-600">
              Les présentes Conditions Générales de Vente déterminent les droits et obligations des parties dans le cadre de la réservation de chambres proposées par Les Spas de Galamé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">2. Prix et Paiement</h2>
            <div className="space-y-4 text-gray-600">
              <p>Les prix sont indiqués en euros, toutes taxes comprises.</p>
              <p>Le paiement s'effectue en ligne par carte bancaire au moment de la réservation.</p>
              <p>La réservation n'est définitive qu'après confirmation du paiement.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">3. Réservation</h2>
            <div className="space-y-4 text-gray-600">
              <p>La réservation devient ferme à réception d'un acompte représentant 100% du prix total.</p>
              <p>Un email de confirmation vous sera envoyé après validation du paiement.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">4. Annulation et Modification</h2>
            <div className="space-y-4 text-gray-600">
              <p>Toute annulation doit être notifiée par email à contact@spas-galame.fr</p>
              <p>Conditions de remboursement :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Plus de 7 jours avant l'arrivée : remboursement intégral</li>
                <li>Entre 7 et 3 jours : remboursement de 50%</li>
                <li>Moins de 3 jours : aucun remboursement</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">5. Responsabilité</h2>
            <div className="space-y-4 text-gray-600">
              <p>Les Spas de Galamé décline toute responsabilité en cas de vol ou de dommage aux effets personnels des clients.</p>
              <p>Les clients sont responsables de tout dommage causé aux installations.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">6. Protection des Données</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-rose-500" />
                <p className="font-semibold">Vos données sont protégées</p>
              </div>
              <p>Les données personnelles collectées sont utilisées uniquement dans le cadre de la réservation et conformément au RGPD.</p>
              <p>Vous disposez d'un droit d'accès, de modification et de suppression de vos données.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif italic mb-4">7. Droit Applicable</h2>
            <p className="text-gray-600">
              Les présentes conditions générales sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux français.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}